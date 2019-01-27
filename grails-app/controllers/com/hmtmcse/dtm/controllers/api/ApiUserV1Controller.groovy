package com.hmtmcse.dtm.controllers.api


import com.hmtmcse.dtm.definition.UserDefinitionService
import com.hmtmcse.gs.GsRestProcessor

class ApiUserV1Controller extends GsRestProcessor {

    UserDefinitionService userDefinitionService

    def getList() {
        return list(userDefinitionService.list())
    }

    def postList() {
        return list(userDefinitionService.list())
    }

    def getDetails() {
        return details(userDefinitionService.list())
    }

    def postCreate() {
        return create(userDefinitionService.create())
    }

    def postUpdate() {
        return update(userDefinitionService.update())
    }

    def deleteDelete() {
        return delete(userDefinitionService.delete())
    }

    def postResetPassword() {
        return customProcessor(userDefinitionService.resetPassword())
    }


}
