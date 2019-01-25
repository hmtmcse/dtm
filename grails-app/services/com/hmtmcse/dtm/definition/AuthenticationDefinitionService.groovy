package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.dtm.AppUtil
import com.hmtmcse.dtm.AuthenticationService
import com.hmtmcse.dtm.User


class AuthenticationDefinitionService {

    AuthenticationService authenticationService

    GsApiActionDefinition login() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("email").required()
        gsApiActionDefinition.addRequestProperty("password").required()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return authenticationService.loginToWithSession(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.includeAllThenExcludeFromResponse(["password", "dateCreated", "lastUpdated", "version"])
        gsApiActionDefinition.successResponseAsData()
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Invalid email or password !!")
        return gsApiActionDefinition
    }


    GsApiActionDefinition logout() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                AppUtil.invalidateSession()
                return apiHelper.help.responseMessageToApi(actionDefinition, true)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Logout Success!!")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Logout Failed!!")
        return gsApiActionDefinition
    }

    GsApiActionDefinition isSessionExist() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return GsApiResponseData.successMessage("Session Exists")
            }
        }
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Session Expired!!")
        return gsApiActionDefinition
    }

}
