package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.BugWorkLogDefinitionService

class ApiBugWorkLogV1Controller extends GsRestProcessor {

    BugWorkLogDefinitionService bugWorkLogDefinitionService

    def postCreate() {
        return create(bugWorkLogDefinitionService.create())
    }

    def postUpdate() {
        return update(bugWorkLogDefinitionService.update())
    }

    def getList() {
        return list(bugWorkLogDefinitionService.list())
    }

    def getDetails() {
        return details(bugWorkLogDefinitionService.details())
    }

    def deleteDelete() {
        return delete(bugWorkLogDefinitionService.delete())
    }

}
