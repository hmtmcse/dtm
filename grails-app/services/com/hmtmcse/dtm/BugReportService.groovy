package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.dtm.definition.BugReportDefinitionService


class BugReportService {

    TodoService todoService
    GsRestfulWrapperService gsRestfulWrapperService

    def getAllBugReportByTodoId(Long todoId) {
        Todo todo = todoService.getTodoById(todoId)
        return getAllBugReportByTodo(todo)
    }

    def getAllBugReportByTodo(Todo todo) {
        if (todo) {
            return BugReport.createCriteria().list {
                order("id", "desc")
                eq("parentIssue", todo)
                eq("isDeleted", false)
            }
        }
        return []
    }


    def getAllBugReportByTodoAPI(Todo todo) {
        def bugReports = getAllBugReportByTodo(todo)
        if (!bugReports){
            return []
        }
        GsApiActionDefinition bugReportDefinition = BugReportDefinitionService.detailsDefinition()
        return gsRestfulWrapperService.responseMapGenerator(bugReportDefinition.getResponseProperties(), bugReports)
    }


}
