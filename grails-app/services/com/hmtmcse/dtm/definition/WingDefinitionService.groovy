package com.hmtmcse.dtm.definition

import com.hmtmcse.dtm.AuthenticationService
import com.hmtmcse.dtm.Wing
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsApiResponseProperty
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.model.CustomResponseParamProcessor
import com.hmtmcse.gs.model.RequestPreProcessor
import com.hmtmcse.swagger.definition.SwaggerConstant


class WingDefinitionService {

    AuthenticationService authenticationService

    GsApiActionDefinition createUpdate() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Wing>(Wing)
        gsApiActionDefinition.addRequestProperty("wingLead").setAlias("wingLeadId").required()
        gsApiActionDefinition.addRequestProperty("name").required()
        gsApiActionDefinition.addRequestProperty("members", SwaggerConstant.SWAGGER_DT_ARRAY_LONG)
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
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Wing>(Wing)
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                definition.addToWhereFilterProperty("isDeleted")
                gsFilteredData.where.addEqual("isDeleted", false)
                definition.addToWhereFilterProperty("sortOrder")
                gsFilteredData.where.addOrderBy("sortOrder", "desc")
                return gsFilteredData
            }
        }
        gsApiActionDefinition.includeInWhereFilter(["name"])
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()

        gsApiActionDefinition.addRelationalEntityResponse("wingLead")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("updatedBy")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addRelationalEntityResponse("members")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")

        gsApiActionDefinition.addResponseProperty("name")
        gsApiActionDefinition.addResponseProperty("description")
        gsApiActionDefinition.addResponseProperty("sortOrder")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addResponseProperty("id")
        return gsApiActionDefinition
    }


    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = createUpdate()
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                gsFilteredData.gsParamsPairData.addToParams("createdBy", authenticationService.userInfo)
                gsFilteredData.gsParamsPairData.addToParams("updatedBy", authenticationService.userInfo)
                return gsFilteredData
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = read()
        gsApiActionDefinition.addResponseProperty("wingLead").setAlias("wingLeadId").customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                def id = domainRow["wingLead"]?.id
                return id
            }
        }
        gsApiActionDefinition.addResponseProperty("members").customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                def list = []
                domainRow["members"]?.each {
                    list.add(it.id)
                }
                return list
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition softDelete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Wing>(Wing)
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
