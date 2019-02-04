package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData


class TodoService {

    GsRestfulWrapperService gsRestfulWrapperService
    ComplexityService complexityService
    ChangeLogService changeLogService
    NoteService noteService
    BugReportService bugReportService
    AuthenticationService authenticationService

    def getTodoById(Long id) {
        return Todo.createCriteria().get {
            eq("id", id)
            eq("isDeleted", false)
            or{
                isNull("privateFor")
                eq("privateFor", authenticationService.userInfo)
            }
        }
    }

    def cloneTodo(Todo todo, Boolean isUpdateStatus = true) {
        if (todo){
            Todo cloned = new Todo(todo.properties)
            cloned.id = null
            cloned.name = TMConstant.COPY_OF + cloned.name
            cloned.status = TMConstant.DRAFT
            cloned.uuid = null
            cloned.privateFor = authenticationService.userInfo
            cloned.createdBy = authenticationService.userInfo
            cloned.complexity = null
            cloned.assignee = null
            cloned.relatedIssues = null
            cloned.bug = null
            cloned.note = null
            cloned.changeLog = null
            cloned.save(flush: true)
            todo.complexity.each { Complexity complexity ->
                complexityService.cloneComplexity(complexity, cloned, false)
            }
            if (!cloned.hasErrors() && isUpdateStatus){
                updateTodoStatus(todo.id)
            }
        }
    }

    GsApiResponseData cloneTodoAPI(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def params = paramData.filteredGrailsParameterMap
        Todo todo = getTodoById(params.id)
        if (todo) {
            cloneTodo(todo)
        } else {
            return GsApiResponseData.failed("Invalid ToDo")
        }
        return GsApiResponseData.successMessage("Cloned")
    }


    def updateTodoStatus(Long id) {
        Todo todo = getTodoById(id)
        if (todo) {
            Map status = TMConstant.getStatusCalculatorMap()
            Map complexityStatus = [:]
            todo.complexity.each { Complexity complexity ->
                if (complexity.isDeleted) {
                    return
                }
                complexityStatus = complexityService.currentComplexityStatus(complexity)
                status.processing += complexityStatus.processing
                status.done += complexityStatus.done
                status.other += complexityStatus.other
                status.total += complexityStatus.total
                status.todo += complexityStatus.todo
            }
            String calculatedStatus = calculateStatus(status)
            if (!calculatedStatus.equals(todo.status)) {
                todo.status = calculatedStatus
                todo.save(flush: true)
            }
        }
    }

    GsApiResponseData publishUnpublish(GsParamsPairData paramData, User currentUser, String message){
        Todo todo = getTodoById(paramData.filteredGrailsParameterMap.todoId)
        if (todo){
            if (todo.createdBy.id != authenticationService.userInfo.id){
                return GsApiResponseData.failed("You are not Authorized for ${message} this Todo")
            }
            todo.privateFor = currentUser
            todo.save(flush: true)
            if (!todo.hasErrors()){
                return GsApiResponseData.successMessage("Successfully ${message}!!")
            }
            return GsApiResponseData.failed("Unable to ${message} Todo")
        }else{
            return GsApiResponseData.failed("Invalid Todo")
        }
    }


    GsApiResponseData publish(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        return publishUnpublish(paramData, null, "Published")
    }


    GsApiResponseData unpublish(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        return publishUnpublish(paramData, authenticationService.userInfo, "Unpublished")
    }

    GsApiResponseData getTodoDetails(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        Todo todo = getTodoById(paramData.filteredGrailsParameterMap.id)
        def processedResponse = [:]
        if (!todo) {
            return GsApiResponseData.failed("Invalid Todo Request")
        } else {
            String complexityType = paramData.filteredGrailsParameterMap.type ?: null
            processedResponse = gsRestfulWrapperService.responseMapGenerator(actionDefinition.getResponseProperties(), todo)
            processedResponse.complexity = complexityService.getComplexityListWithStepForAPIByTodo(todo, complexityType)
            processedResponse.changeLog = changeLogService.getAllChangeLogByTodoForAPI(todo)
            processedResponse.note = noteService.getAllNoteByTodoForAPI(todo)
            processedResponse.bug = bugReportService.getAllBugReportByTodoAPI(todo)
            processedResponse.summery = processTodoSummery(todo, complexityType)
        }
        return GsApiResponseData.successResponse(processedResponse)
    }

    String calculateDepth(Todo todo){
        Map summery = processTodoSummery(todo)
        return "${summery.totalComplexity}-${summery.totalStep}"
    }

    Integer calculateDue(Todo todo){
        Integer due  = new Date() - todo.dueDate
        if (due > 0){
            return due
        }
        return 0
    }

    String calculateEstimation(Todo todo, String type = null){
        Map summary = processTodoSummery(todo, type)
        return summary.estimation
    }


    Map processTodoComplexity(Complexity complexity){
        def summery = [
                totalStep : 0,
                estimatedHour : 0.0,
                estimation : ""
        ]
        if (complexity){
            complexity.steps.each { Steps estimationStep ->
                if (estimationStep.isDeleted){
                    return
                }
                summery.totalStep += 1
                if (estimationStep.estimatedHour){
                    summery.estimatedHour += estimationStep.estimatedHour
                }
            }
            summery.estimation = AppUtil.hourToEstimation(summery.estimatedHour)
        }
        return summery
    }

    Map processTodoSummery(Todo todo, String type = null){
        def summery = [
                totalComplexity : 0,
                totalStep : 0,
                estimatedHour : 0.0,
                estimation : ""
        ]
        if (todo){
            Map complexitySummery = [:]
            todo.complexity.each { Complexity complexity ->
                if (type && !type.equals(complexity.type)){
                    return
                }
                if (complexity.isDeleted){
                    return
                }

                summery.totalComplexity += 1
                complexitySummery = processTodoComplexity(complexity)
                summery.estimatedHour += complexitySummery.estimatedHour
                summery.totalStep += complexitySummery.totalStep
            }
        }
        summery.estimation = AppUtil.hourToEstimation(summery.estimatedHour)
        return summery
    }


    List<Todo> allAssignedTodoList(Integer offset = 0, Integer max = 5) {
        return Todo.createCriteria().list([max: max, offset: offset]) {
            eq("isDeleted", false)
            isNull("privateFor")
            assignee {
                eq("assignTo", authenticationService.userInfo)
                order("lastUpdated", "desc")
            }
        }
    }

    List<Todo> privateTodoList(Integer offset = 0, Integer max = 5) {
        return Todo.createCriteria().list([max: max, offset: offset]) {
            eq("isDeleted", false)
            eq("privateFor", authenticationService.userInfo)
            order("id", "desc")
        }
    }

    List<Todo> publishTodoList(Integer offset = 0, Integer max = 5) {
        return Todo.createCriteria().list([max: max, offset: offset]) {
            eq("isDeleted", false)
            isNull("privateFor")
            order("lastUpdated", "desc")
        }
    }


    GsApiResponseData softDelete(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        Todo todo = getTodoById(paramData.filteredGrailsParameterMap.id)
        if (!todo){
            return GsApiResponseData.failed("Invalid Todo")
        }
        complexityService.softDeleteAllComplexityByTodo(todo)
        todo.isDeleted = true
        todo.save(flush: true)
        if (todo.hasErrors()){
            return GsApiResponseData.failed("Unable to Delete Todo")
        }
        return GsApiResponseData.successMessage("Successfully Deleted")
    }

    String calculateStatus(Map status) {
        if (status.total == 0) {
            return TMConstant.DRAFT
        } else if (status.total == status.done) {
            return TMConstant.DONE
        } else if (status.processing) {
            return TMConstant.PROCESSING
        }else if (status.todo) {
            return TMConstant.TODO
        } else {
            return TMConstant.DRAFT
        }
    }

}
