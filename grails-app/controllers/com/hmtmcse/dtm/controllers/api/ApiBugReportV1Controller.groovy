package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.BugReportDefinitionService

class ApiBugReportV1Controller extends GsRestProcessor {

    BugReportDefinitionService bugReportDefinitionService

    def postCreate() {
        return create(bugReportDefinitionService.create())
    }

    def postUpdate() {
        return update(bugReportDefinitionService.update())
    }

    def getList() {
        return list(bugReportDefinitionService.list())
    }

    def postList() {
        return list(bugReportDefinitionService.list())
    }

    def getDetails() {
        return details(bugReportDefinitionService.details())
    }

    def postDetails() {
        return details(bugReportDefinitionService.details())
    }

    def deleteDelete() {
        return delete(bugReportDefinitionService.delete())
    }

    def getDetailsByTodo() {
        return customProcessor(bugReportDefinitionService.getDetailsByTodo())
    }

}
