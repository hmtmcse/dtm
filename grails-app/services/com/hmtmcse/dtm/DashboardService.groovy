package com.hmtmcse.dtm

import com.hmtmcse.dtm.definition.TodoDefinitionService
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData

class DashboardService {

    TodoDefinitionService todoDefinitionService
    TodoService todoService

    GsApiResponseData getDashboardTodoReport(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        List<Todo> assignedTodo = todoService.allAssignedTodoList()
        List<Todo> privateTodo = todoService.privateTodoList()
        List<Todo> otherTodo = todoService.publishTodoList()
        GsApiActionDefinition todoListDefinition = todoDefinitionService.list()
        Map response = [:]
        response.assignedTodo = apiHelper.help.responseMapGenerator(todoListDefinition.getResponseProperties(), assignedTodo, [])
        response.privateTodo = apiHelper.help.responseMapGenerator(todoListDefinition.getResponseProperties(), privateTodo, [])
        response.otherTodo = apiHelper.help.responseMapGenerator(todoListDefinition.getResponseProperties(), otherTodo, [])
        return GsApiResponseData.successResponse(response)
    }
}
