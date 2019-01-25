package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData


class AssigneeService {

    TodoService todoService
    UserService userService
    AuthenticationService authenticationService


    def getAssigneeById(Long id){
        return Assignee.createCriteria().get {
            eq("id", id)
        }
    }

    def getAllAssigneeByTodoId(Long id){
        Todo todo = todoService.getTodoById(id)
        return Assignee.createCriteria().list {
            eq("todo", todo)
        }
    }

    def saveUpdate(Map assigneeInfo){
        Todo todo = todoService.getTodoById(new Long(assigneeInfo.todoId))
        Long userId = new Long(assigneeInfo.assignToId)
        User assignTo = userService.getUserById(userId)
        if (!todo || !(assignTo || userId == 0) || !TMConstant.TODO_TASK_TYPE.containsKey(assigneeInfo.taskType)){
            return false
        }

        Assignee assignee = new Assignee()
        assignee.createdBy = authenticationService.userInfo
       if (assigneeInfo.id){
           assignee = getAssigneeById(new Long(assigneeInfo.id))
           if (!assignee){
               return false
           }
       }
        assignee.todo = todo
        assignee.assignTo = assignTo
        assignee.taskType = assigneeInfo.taskType
        assignee.save(flush: true)
        if (assignee.hasErrors()){
            return false
        }
        return true
    }

    GsApiResponseData saveUpdateAssignee(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        List assignTo = paramData.filteredGrailsParameterMap.assignTo
        Boolean isSuccess = false
        assignTo.each { data ->
            isSuccess = saveUpdate(data)
            if (!isSuccess){
                return false
            }
        }
        return isSuccess ? GsApiResponseData.successMessage("Successfully Associated!!") : GsApiResponseData.failed("Not able to assign warrior")
    }


    GsApiResponseData listAssignee(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        Long id = paramData.filteredGrailsParameterMap.long("todoId")
        def allAssignee = getAllAssigneeByTodoId(id)
        List list = []
        if (allAssignee){
            allAssignee.each { Assignee assignee ->
                list.add([
                     "assigneeId": assignee?.assignTo?.id,
                     "taskType": assignee.taskType,
                     "todoId": assignee.todo.id,
                     "id": assignee.id,
                ])
            }
        }
        return GsApiResponseData.successResponse(list)
    }
}
