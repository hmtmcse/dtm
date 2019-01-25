package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.dtm.definition.ChangeLogDefinitionService


class ChangeLogService {

    TodoService todoService
    GsRestfulWrapperService gsRestfulWrapperService

    def getAllChangeLogByTodoId(Long todoId) {
        Todo todo = todoService.getTodoById(todoId)
        return getAllChangeLogByTodo(todo)
    }

    def getAllChangeLogByTodo(Todo todo) {
        if (todo){
            return ChangeLog.createCriteria().list {
                order("id", "desc")
                eq("todo", todo)
                eq("isDeleted", false)
            }
        }
        return []
    }

    def getAllChangeLogByTodoForAPI(Todo todo) {
        def changeLogs = getAllChangeLogByTodo(todo)
        if (!changeLogs){
            return []
        }
        GsApiActionDefinition changeLogDefinition = ChangeLogDefinitionService.detailsDefinition()
        return gsRestfulWrapperService.responseMapGenerator(changeLogDefinition.getResponseProperties(), changeLogs)
    }
}
