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
        }
        return GsApiResponseData.successResponse(processedResponse)
    }

    String calculateDepth(Todo todo){
        Integer complexity = 0
        Integer steps = 0
        if (todo){
            complexity = todo.complexity.size()
            todo.complexity.each {
                steps += it.steps.size()
            }
        }
        return "${complexity}-${steps}"
    }

    Integer calculateDue(Todo todo){
        Integer due  = new Date() - todo.dueDate
        if (due > 0){
            return due
        }
        return 0
    }

    String calculateEstimation(Todo todo){
        Map summary = processTodoSummery(todo)
        return summary.estimation
    }


    Map processTodoComplexity(Complexity complexity){
        def summery = [
                totalStep : 0,
                estimatedHour : 0.0,
                estimation : ""
        ]
        if (complexity){
            summery.totalStep += complexity.steps.size()
            complexity.steps.each { Steps estimationStep ->
                if (estimationStep.estimatedHour){
                    summery.estimatedHour += estimationStep.estimatedHour
                }
            }
            summery.estimation = AppUtil.hourToEstimation(summery.estimatedHour)
        }
        return summery
    }

    Map processTodoSummery(Todo todo){
        def summery = [
                totalComplexity : 0,
                totalStep : 0,
                estimatedHour : 0.0,
                estimation : ""
        ]
        if (todo){
            summery.totalComplexity = todo.complexity.size()
            Map complexitySummery = [:]
            todo.complexity.each { Complexity complexity ->
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

}
