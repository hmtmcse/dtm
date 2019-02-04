package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.dtm.definition.ComplexityDefinitionService
import com.hmtmcse.dtm.definition.StepsDefinitionService


class ComplexityService {

    TodoService todoService
    GsRestfulWrapperService gsRestfulWrapperService
    StepService stepService

    def getAllComplexityByTodoId(Long todoId) {
        Todo todo = todoService.getTodoById(todoId)
        return getAllComplexityByTodo(todo)
    }

    def cloneComplexity(Complexity complexity, Todo todo = null, Boolean isUpdateStatus = true) {
        if (complexity){
            Complexity cloned = new Complexity(complexity.properties)
            cloned.id = null
            if (todo){
                cloned.todo = todo
            }else{
                cloned.name = TMConstant.COPY_OF + cloned.name
            }
            cloned.status = TMConstant.DRAFT
            cloned.uuid = null
            cloned.steps = null
            cloned.save(flush: true)
            complexity.steps.each { Steps steps ->
                stepService.cloneStep(steps, cloned, false)
            }
            if (!cloned.hasErrors() && isUpdateStatus){
                todoService.updateTodoStatus(cloned.todo.id)
            }
        }
    }


    def getAllComplexityByTodo(Todo todo) {
        if (todo) {
            return Complexity.createCriteria().list {
                order("sortOrder", "asc")
                eq("todo", todo)
                eq("isDeleted", false)
            }
        }
        return []
    }

    GsApiResponseData cloneComplexityAPI(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def params = paramData.filteredGrailsParameterMap
        Complexity complexity = getComplexityById(params.id)
        if (complexity) {
            cloneComplexity(complexity)
        } else {
            return GsApiResponseData.failed("Invalid Complexity")
        }
        return GsApiResponseData.successMessage("Cloned")
    }

    GsApiResponseData changeStatus(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def params = paramData.filteredGrailsParameterMap
        if (!TMConstant.STATUS.containsKey(params.status)) {
            return GsApiResponseData.failed("Invalid Status")
        }
        Complexity complexity = getComplexityById(params.id)
        if (complexity) {
            if (complexity.steps){
                updateComplexityStatus(complexity)
            }else{
                complexity.status = params.status
                complexity.save(flush: true)
                if (complexity.hasErrors()) {
                    return GsApiResponseData.failed("Unable to Update")
                }
            }
            todoService.updateTodoStatus(complexity.todo.id)
        } else {
            return GsApiResponseData.failed("Invalid Complexity")
        }
        return GsApiResponseData.successMessage("Updated")
    }

    def softDeleteAllComplexityByTodo(Todo todo) {
        List<Complexity> complexityList = getAllComplexityByTodo(todo)
        complexityList.each { Complexity complexity ->
            complexity.isDeleted = true
            complexity.save(flush: true)
        }
    }


    def getComplexityById(Long id) {
        return Complexity.createCriteria().get {
            eq("id", id)
            eq("isDeleted", false)
        }
    }

    Map currentComplexityStatus(Complexity complexity, Map status = TMConstant.getStatusCalculatorMap()){
        if (complexity && complexity.steps){
            complexity.steps.each { Steps steps ->
                status = todoService.countStatus(steps, status)
            }
        }
        return status
    }

    def updateComplexityStatusById(Long id){
        Complexity complexity = getComplexityById(id)
        updateComplexityStatus(complexity)
    }

    def updateComplexityAndTodoStatus(Complexity complexity){
        updateComplexityStatus(complexity)
        todoService.updateTodoStatus(complexity.todo.id)
    }

    def updateComplexityStatus(Complexity complexity) {
        Map status = currentComplexityStatus(complexity)
        complexity.status = todoService.calculateStatus(status)
        complexity.save(flush: true)
    }

    def getAllComplexityAPIByTodoId(Long todoId) {
        Todo todo = todoService.getTodoById(todoId)
        return getComplexityListWithStepForAPIByTodo(todo)
    }

    def getAllComplexityAPIByTodoIdAndType(Long todoId, String type) {
        Todo todo = todoService.getTodoById(todoId)
        return getComplexityListWithStepForAPIByTodo(todo, type)
    }

    def getComplexityListWithStepForAPIByTodo(Todo todo, String type = null) {
        List<Complexity> complexityList = Complexity.createCriteria().list {
            order("sortOrder", "desc")
            eq("isDeleted", false)
            eq("todo", todo)
            if (type) {
                eq("type", type)
            }
        }

        List complexityAPIList = []
        if (complexityList) {
            GsApiActionDefinition complexityDefinition = ComplexityDefinitionService.detailsDefinition()
            GsApiActionDefinition stepDefinition = StepsDefinitionService.detailsDefinition()
            def processedResponse, stepQuery
            complexityList.each { Complexity complexity ->
                processedResponse = gsRestfulWrapperService.responseMapGenerator(complexityDefinition.getResponseProperties(), complexity)
                stepQuery = stepService.getAllStepByComplexity(complexity)
                if (stepQuery) {
                    processedResponse.steps = gsRestfulWrapperService.responseMapGenerator(stepDefinition.getResponseProperties(), stepQuery, [])
                } else {
                    processedResponse.steps = []
                }
                complexityAPIList.add(processedResponse)
            }
        }
        return complexityAPIList
    }

    GsApiResponseData saveSorting(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def map = paramData.filteredGrailsParameterMap.itemMap
        if (paramData.filteredGrailsParameterMap.itemMap){
            Complexity complexity
            map.each { data ->
                Long dbId = new Long(data.dbId)
                complexity = Complexity.get(dbId)
                if (complexity){
                complexity.sortOrder = data.index
                complexity.save(flush: true)
                }
            }
        }
        return GsApiResponseData.successMessage("Updated")
    }
}
