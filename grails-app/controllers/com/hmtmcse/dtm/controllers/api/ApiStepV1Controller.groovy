package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.StepsDefinitionService

class ApiStepV1Controller extends GsRestProcessor {

    StepsDefinitionService stepsDefinitionService

    def postCreate() {
        return create(stepsDefinitionService.create())
    }

    def postUpdate() {
        return update(stepsDefinitionService.update())
    }

    def getList() {
        return list(stepsDefinitionService.list())
    }

    def getDetails() {
        return details(stepsDefinitionService.details())
    }

    def postDetails() {
        return details(stepsDefinitionService.details())
    }


    def deleteDelete() {
        return delete(stepsDefinitionService.delete())
    }

    def deleteSoftDelete() {
        return update(stepsDefinitionService.softDelete())
    }

    def postSaveSort() {
        return customProcessor(stepsDefinitionService.saveSort())
    }

    def getChangeStatus() {
        return customProcessor(stepsDefinitionService.changeStatus())
    }

    def postChangeStatus() {
        return customProcessor(stepsDefinitionService.changeStatus())
    }

}
