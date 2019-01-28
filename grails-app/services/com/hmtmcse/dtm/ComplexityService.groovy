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
