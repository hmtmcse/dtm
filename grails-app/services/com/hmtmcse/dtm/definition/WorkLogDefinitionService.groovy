package com.hmtmcse.dtm.definition

import com.hmtmcse.dtm.AuthenticationService
import com.hmtmcse.dtm.WorkLog
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.model.RequestPreProcessor
import com.hmtmcse.swagger.SwaggerHelper
import com.hmtmcse.swagger.definition.SwaggerConstant


class WorkLogDefinitionService {

    AuthenticationService authenticationService

    GsApiActionDefinition createUpdate() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<WorkLog>(WorkLog)
        gsApiActionDefinition.addRequestProperty("logType").required()
        gsApiActionDefinition.addRequestProperty("searchId").enableTypeCast().required()
        gsApiActionDefinition.addRequestProperty("searchUuid").required()
        gsApiActionDefinition.addRequestProperty("workedHour").required()
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("complexity").setAlias("complexityId")
        gsApiActionDefinition.addRequestProperty("todo").setAlias("todoId")
        gsApiActionDefinition.addRequestProperty("steps").setAlias("stepsId")
        gsApiActionDefinition.addRequestProperty("bugReport").setAlias("bugReportId")
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



        gsApiActionDefinition.addResponseProperty("searchUuid")
        gsApiActionDefinition.addResponseProperty("searchId")
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

    GsApiActionDefinition myWorkLog() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<WorkLog>(WorkLog)
        gsApiActionDefinition.addRequestProperty("start", SwaggerConstant.SWAGGER_DT_STRING_DATE)
        gsApiActionDefinition.addRequestProperty("end", SwaggerConstant.SWAGGER_DT_STRING_DATE)


        gsApiActionDefinition.addResponseProperty("firstName").setDataType(SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("lastName").setDataType(SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("id").setDataType(SwaggerConstant.SWAGGER_DT_LONG)
        gsApiActionDefinition.addResponseProperty("start").setDataType(SwaggerConstant.SWAGGER_DT_STRING_DATE)
        gsApiActionDefinition.addResponseProperty("end").setDataType(SwaggerConstant.SWAGGER_DT_STRING_DATE)


        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("name", SwaggerConstant.SWAGGER_DT_STRING)
        swaggerHelper.addProperties("remaining", SwaggerConstant.SWAGGER_DT_STRING)
        swaggerHelper.addProperties("status", SwaggerConstant.SWAGGER_DT_STRING)
        swaggerHelper.addProperties("estimation", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("worked", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("totalWorkedHour", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("extraWork", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("type", SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("log").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties())


        return gsApiActionDefinition
    }

}
