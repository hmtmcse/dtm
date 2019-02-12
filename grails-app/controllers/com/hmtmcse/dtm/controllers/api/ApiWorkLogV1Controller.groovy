package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.dtm.definition.WorkLogDefinitionService
import com.hmtmcse.gs.GsRestProcessor


class ApiWorkLogV1Controller extends GsRestProcessor {


    WorkLogDefinitionService workLogDefinitionService

    def postCreate() {
        return create(workLogDefinitionService.create())
    }

    def deleteSoftDelete() {
        return updateOnly(workLogDefinitionService.softDelete())
    }

    def postUpdate() {
        return update(workLogDefinitionService.update())
    }

    def postList() {
        return list(workLogDefinitionService.list())
    }

    def getList() {
        return list(workLogDefinitionService.list())
    }

}
