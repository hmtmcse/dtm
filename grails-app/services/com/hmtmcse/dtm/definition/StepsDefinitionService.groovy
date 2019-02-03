package com.hmtmcse.dtm.definition

import com.hmtmcse.dtm.AppUtil
import com.hmtmcse.dtm.ComplexityService
import com.hmtmcse.dtm.TodoService
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsApiResponseProperty
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.data.GsResponsePostData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.gs.model.CustomResponseParamProcessor
import com.hmtmcse.gs.model.RequestPreProcessor
import com.hmtmcse.gs.model.ResponsePostProcessor
import com.hmtmcse.swagger.SwaggerHelper
import com.hmtmcse.swagger.definition.SwaggerConstant
import com.hmtmcse.dtm.StepService
import com.hmtmcse.dtm.Steps
import grails.web.servlet.mvc.GrailsParameterMap


class StepsDefinitionService {

    StepService stepService
    ComplexityService complexityService

    static GsApiActionDefinition detailsDefinition() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        gsApiActionDefinition.includeAllNotRelationalThenExcludeFromResponse(DefinitionCommonService.commonSkipFields())
        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("hour", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("estimation", SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("estimatedHour").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties()).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                Map response = [
                        hour: 0.0,
                        estimation: "",
                ]
                Double estimatedHour = domainRow[fieldName]
                if (estimatedHour){
                    response.hour = estimatedHour
                    response.estimation = AppUtil.hourToEstimation(estimatedHour)
                }
                return response
            }
        }
        return gsApiActionDefinition
    }

    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.includeAllPropertyToResponse()
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.includeAllPropertyToResponse()
        gsApiActionDefinition.addRelationalEntityResponse("complexity")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addRelationalEntityResponse("todo")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition create(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        gsApiActionDefinition.addRequestProperty("name").required().setErrorMessage("Please Enter Step Name.")
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("reference")
        gsApiActionDefinition.addRequestProperty("estimatedHour")
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("otherInfo")
        gsApiActionDefinition.addRequestProperty("complexity", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("complexityId").required()
                .enableTypeCast().setErrorMessage("Required Complexity Information Missing.")
        gsApiActionDefinition.addRequestProperty("todo", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("todoId").required()
                .enableTypeCast().setErrorMessage("Required Todo Information Missing.")
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                GrailsParameterMap filteredGrailsParameterMap = gsFilteredData.gsParamsPairData.filteredGrailsParameterMap
                gsFilteredData.gsParamsPairData.addToParams("sortOrder", stepService.getAllStepByComplexityId(filteredGrailsParameterMap.complexity).size())
                return gsFilteredData
            }
        }
        gsApiActionDefinition.responsePostProcessor = new ResponsePostProcessor() {
            @Override
            GsResponsePostData process(GsApiActionDefinition definition, GsResponsePostData gsResponsePostData) {
                if (gsResponsePostData.queryResult.complexity && gsResponsePostData.isSuccess){
                    complexityService.updateComplexityAndTodoStatus(gsResponsePostData.queryResult.complexity)
                }
                return gsResponsePostData
            }
        }
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition update(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        gsApiActionDefinition.addRequestProperty("name")
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("reference")
        gsApiActionDefinition.addRequestProperty("estimatedHour").setErrorMessage("Please Enter valid Estimation, in Hour format. (1 or 1.5)")
        gsApiActionDefinition.addRequestProperty("startedMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.allowedConditionOnlyEqual()
        gsApiActionDefinition.successResponseAsData()
        gsApiActionDefinition.responsePostProcessor = new ResponsePostProcessor() {
            @Override
            GsResponsePostData process(GsApiActionDefinition definition, GsResponsePostData gsResponsePostData) {
                if (gsResponsePostData.queryResult.complexity && gsResponsePostData.isSuccess){
                    complexityService.updateComplexityAndTodoStatus(gsResponsePostData.queryResult.complexity)
                }
                return gsResponsePostData
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition delete(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Deleted")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Delete")
        return gsApiActionDefinition
    }

    GsApiActionDefinition softDelete() {
        GsApiActionDefinition gsApiActionDefinition = delete()
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                definition.addRequestProperty("isDeleted")
                gsFilteredData.gsParamsPairData.addToParams("isDeleted", true)
                return gsFilteredData
            }
        }
        gsApiActionDefinition.responsePostProcessor = new ResponsePostProcessor() {
            @Override
            GsResponsePostData process(GsApiActionDefinition definition, GsResponsePostData gsResponsePostData) {
                if (gsResponsePostData.queryResult.complexity && gsResponsePostData.isSuccess){
                    complexityService.updateComplexityAndTodoStatus(gsResponsePostData.queryResult.complexity)
                }
                return gsResponsePostData
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition saveSort() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("dbId", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("index", SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addRequestProperty("itemMap", SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties())
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return stepService.saveSorting(actionDefinition, paramData, apiHelper)
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition changeStatus() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Steps>(Steps)
        gsApiActionDefinition.addRequestProperty("id", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.addRequestProperty("status", SwaggerConstant.SWAGGER_DT_STRING).required()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return stepService.changeStatus(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Update")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Update")
        return gsApiActionDefinition
    }
}
