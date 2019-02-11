package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.dtm.definition.WingDefinitionService
import com.hmtmcse.gs.GsRestProcessor


class ApiWingV1Controller extends GsRestProcessor {


    WingDefinitionService wingDefinitionService

    def postCreate() {
        return create(wingDefinitionService.create())
    }

    def postDetails() {
        return details(wingDefinitionService.details())
    }

    def getDetails() {
        return details(wingDefinitionService.details())
    }

    def deleteSoftDelete() {
        return updateOnly(wingDefinitionService.softDelete())
    }

    def postUpdate() {
        return update(wingDefinitionService.update())
    }

    def postList() {
        return list(wingDefinitionService.list())
    }

    def getList() {
        return list(wingDefinitionService.list())
    }

}
