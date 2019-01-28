package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.ComplexityDefinitionService

class ApiComplexityV1Controller extends GsRestProcessor {

    ComplexityDefinitionService complexityDefinitionService

    def postCreate() {
        return create(complexityDefinitionService.create())
    }

    def postUpdate() {
        return update(complexityDefinitionService.update())
    }

    def getList() {
        return list(complexityDefinitionService.list())
    }

    def getDetails() {
        return details(complexityDefinitionService.details())
    }

    def getDetailsByTodo() {
        return customProcessor(complexityDefinitionService.getDetailsByTodo())
    }

    def getDetailsByTodoAndType() {
        return customProcessor(complexityDefinitionService.getDetailsByTodoAndType())
    }

    def postDetails() {
        return details(complexityDefinitionService.details())
    }

    def deleteDelete() {
        return delete(complexityDefinitionService.delete())
    }

    def deleteSoftDelete() {
        return update(complexityDefinitionService.softDelete())
    }

    def postSaveSort() {
        return customProcessor(complexityDefinitionService.saveSort())
    }

}
