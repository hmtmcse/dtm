package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.ChangeLogDefinitionService

class ApiChangeLogV1Controller extends GsRestProcessor {

    ChangeLogDefinitionService changeLogDefinitionService

    def postCreate() {
        return create(changeLogDefinitionService.create())
    }

    def postUpdate() {
        return update(changeLogDefinitionService.update())
    }

    def getList() {
        return list(changeLogDefinitionService.list())
    }

    def getDetails() {
        return details(changeLogDefinitionService.details())
    }

    def postDetails() {
        return details(changeLogDefinitionService.details())
    }

    def getDetailsByTodo() {
        return customProcessor(changeLogDefinitionService.getDetailsByTodo())
    }


    def deleteDelete() {
        return delete(changeLogDefinitionService.delete())
    }


}
