package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.GsRequestParamException
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiRequestProperty
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.gs.model.CustomRequestParamProcessor
import com.hmtmcse.dtm.User
import com.hmtmcse.dtm.UserService
import com.hmtmcse.gs.model.RequestPreProcessor


class UserDefinitionService {

    UserService userService

    GsApiActionDefinition list(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.includeAllThenExcludeFromResponse(["password", "version"])
        gsApiActionDefinition.includeAllThenExcludeFromWhereFilter(["password", "version"])
        return gsApiActionDefinition
    }

    GsApiActionDefinition create(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("firstName").required()
        gsApiActionDefinition.addRequestProperty("lastName")
        gsApiActionDefinition.addRequestProperty("email").required().customRequestParamProcessor = new CustomRequestParamProcessor() {
            @Override
            Object process(String fieldName, GsParamsPairData gsParamsPairData, GsApiRequestProperty propertyDefinition) throws GsRequestParamException {
                String email = gsParamsPairData.params.email
                if (userService.isEmailExist(email)){
                    throw new GsRequestParamException(email + " Email already exists. Please try with other Email.")
                }
                return email
            }
        }
        gsApiActionDefinition.addRequestProperty("password").required()
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addResponseProperty("id")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }



    GsApiActionDefinition update(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("firstName").required()
        gsApiActionDefinition.addRequestProperty("lastName")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition resetPassword(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addRequestProperty("id").required().enableTypeCast()
        gsApiActionDefinition.addRequestProperty("password").required()
        gsApiActionDefinition.addRequestProperty("confirmPassword").required()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return userService.restPassword(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Password Reset.")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }



    GsApiActionDefinition delete(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition userDropDown(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<User>(User)
        gsApiActionDefinition.addResponseProperty("id")
        gsApiActionDefinition.addResponseProperty("firstName")
        gsApiActionDefinition.addResponseProperty("lastName")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.successResponseAsData([])
        return gsApiActionDefinition
    }
}
