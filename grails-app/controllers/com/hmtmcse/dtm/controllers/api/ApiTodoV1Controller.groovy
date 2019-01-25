package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.TodoDefinitionService

class ApiTodoV1Controller extends GsRestProcessor {

    TodoDefinitionService todoDefinitionService

    def postQuickCreate() {
        return create(todoDefinitionService.create())
    }

    def postUpdate() {
        return update(todoDefinitionService.update())
    }

    def postList() {
        return list(todoDefinitionService.list())
    }

    def getList() {
        return list(todoDefinitionService.list())
    }

    def postDetails() {
        return details(todoDefinitionService.details())
    }

    def getDetails() {
        return details(todoDefinitionService.details())
    }

    def postAllDetails() {
        return customProcessor(todoDefinitionService.allDetails())
    }


    def postAllDetailsByCondition() {
        return customProcessor(todoDefinitionService.allDetailsByCondition())
    }

    def getPublish() {
        return customProcessor(todoDefinitionService.publish())
    }

    def getUnpublish() {
        return customProcessor(todoDefinitionService.unpublish())
    }
}
