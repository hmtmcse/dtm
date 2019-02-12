package com.hmtmcse.dtm.definition

import com.hmtmcse.dtm.AuthenticationService
import com.hmtmcse.dtm.WorkLog
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.model.RequestPreProcessor


class WorkLogDefinitionService {

    AuthenticationService authenticationService

    GsApiActionDefinition createUpdate() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<WorkLog>(WorkLog)
        gsApiActionDefinition.addRequestProperty("complexity").setAlias("complexityId")
        gsApiActionDefinition.addRequestProperty("todo").setAlias("todoId")
        gsApiActionDefinition.addRequestProperty("steps").setAlias("stepId")
        gsApiActionDefinition.addRequestProperty("logType").required()
        gsApiActionDefinition.addRequestProperty("workedHour").required()
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                gsFilteredData.gsParamsPairData.addToParams("updatedBy", authenticationService.userInfo)
                return gsFilteredData
            }
        }
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addResponseProperty("id")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition read() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<WorkLog>(WorkLog)
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                definition.addToWhereFilterProperty("isDeleted")
                gsFilteredData.where.addEqual("isDeleted", false)
                return gsFilteredData
            }
        }
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.addRelationalEntityResponse("workedBy")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("updatedBy")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("complexity")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("steps")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("todo")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")


        gsApiActionDefinition.addResponseProperty("workedHour")
        gsApiActionDefinition.addResponseProperty("description")
        gsApiActionDefinition.addResponseProperty("logType")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addResponseProperty("id")
        return gsApiActionDefinition
    }


    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = createUpdate()
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                gsFilteredData.gsParamsPairData.addToParams("workedBy", authenticationService.userInfo)
                gsFilteredData.gsParamsPairData.addToParams("updatedBy", authenticationService.userInfo)
                return gsFilteredData
            }
        }
        return gsApiActionDefinition
    }



    GsApiActionDefinition softDelete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<WorkLog>(WorkLog)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Deleted")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Delete")
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                gsFilteredData.gsParamsPairData.addToParams("isDeleted", true)
                return gsFilteredData
            }
        }
        gsApiActionDefinition.allowedConditionOnlyEqual()
        gsApiActionDefinition.disablePaginationAndSorting()
        gsApiActionDefinition.enableQueryFilter()
        return gsApiActionDefinition
    }


    GsApiActionDefinition update() {
        GsApiActionDefinition gsApiActionDefinition = createUpdate()
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }


    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = read()
        return gsApiActionDefinition
    }

}
