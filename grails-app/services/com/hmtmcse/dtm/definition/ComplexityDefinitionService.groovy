package com.hmtmcse.dtm.definition

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
import com.hmtmcse.dtm.Complexity
import com.hmtmcse.dtm.ComplexityService
import grails.web.servlet.mvc.GrailsParameterMap

class ComplexityDefinitionService {

    ComplexityService complexityService
    TodoService todoService

    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.addRelationalEntityResponse("todo")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        return gsApiActionDefinition
    }

    static GsApiActionDefinition detailsDefinition() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        gsApiActionDefinition.includeAllNotRelationalThenExcludeFromResponse(DefinitionCommonService.commonSkipFields())
        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("totalStep", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("estimatedHour", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("estimation", SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("stepSummery").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties()).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                TodoService todoService = new TodoService()
                return todoService.processTodoComplexity(domainRow)
            }
        }
        return gsApiActionDefinition
    }

    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.addRelationalEntityResponse("todo")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition saveSort() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("dbId", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("index", SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addRequestProperty("itemMap", SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties())
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return complexityService.saveSorting(actionDefinition, paramData, apiHelper)
            }
        }
        return gsApiActionDefinition
    }



    GsApiActionDefinition getDetailsByTodo() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.addRequestProperty("todoId", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                def complexity = complexityService.getAllComplexityAPIByTodoId(paramData.filteredGrailsParameterMap.todoId)
                return GsApiResponseData.successResponse(complexity)
            }
        }
        gsApiActionDefinition.successResponseAsData([])
        return gsApiActionDefinition
    }

    GsApiActionDefinition changeStatus() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        gsApiActionDefinition.addRequestProperty("id", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.addRequestProperty("status", SwaggerConstant.SWAGGER_DT_STRING).required()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return complexityService.changeStatus(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Update")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Update")
        return gsApiActionDefinition
    }


    GsApiActionDefinition getDetailsByTodoAndType() {
        GsApiActionDefinition gsApiActionDefinition = detailsDefinition()
        gsApiActionDefinition.addRequestProperty("todoId", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.addRequestProperty("type", SwaggerConstant.SWAGGER_DT_STRING).required()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                def complexity = complexityService.getAllComplexityAPIByTodoIdAndType(paramData.filteredGrailsParameterMap.todoId, paramData.filteredGrailsParameterMap.type)
                return GsApiResponseData.successResponse(complexity)
            }
        }
        gsApiActionDefinition.successResponseAsData([])
        return gsApiActionDefinition
    }


    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        gsApiActionDefinition.addRequestProperty("name").required()
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("reference")
        gsApiActionDefinition.addRequestProperty("startedMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("estimatedHour").enableTypeCast()
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("otherInfo")
        gsApiActionDefinition.addRequestProperty("type")
        gsApiActionDefinition.addRequestProperty("taskType")
        gsApiActionDefinition.addRequestProperty("todo", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("todoId").required()
                .enableTypeCast()
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                GrailsParameterMap filteredGrailsParameterMap = gsFilteredData.gsParamsPairData.filteredGrailsParameterMap
                gsFilteredData.gsParamsPairData.addToParams("sortOrder", complexityService.getAllComplexityAPIByTodoId(filteredGrailsParameterMap.todo).size())
                return gsFilteredData
            }
        }
        gsApiActionDefinition.responsePostProcessor = new ResponsePostProcessor() {
            @Override
            GsResponsePostData process(GsApiActionDefinition definition, GsResponsePostData gsResponsePostData) {
                if (gsResponsePostData.isSuccess && gsResponsePostData.queryResult?.todo?.id){
                    todoService.updateTodoStatus(gsResponsePostData.queryResult.todo.id)
                }
                return gsResponsePostData
            }
        }
        gsApiActionDefinition.addResponseProperty("id")
        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition update() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        gsApiActionDefinition.addRequestProperty("name")
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("reference")
        gsApiActionDefinition.addRequestProperty("uuid").required()
        gsApiActionDefinition.addRequestProperty("startedMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("estimatedHour").enableTypeCast()
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("otherInfo")
        gsApiActionDefinition.addRequestProperty("type")
        gsApiActionDefinition.addRequestProperty("taskType")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.responsePostProcessor = new ResponsePostProcessor() {
            @Override
            GsResponsePostData process(GsApiActionDefinition definition, GsResponsePostData gsResponsePostData) {
                if (gsResponsePostData.isSuccess && gsResponsePostData.queryResult.todo.id){
                    todoService.updateTodoStatus(gsResponsePostData.queryResult.todo.id)
                }
                return gsResponsePostData
            }
        }
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }


    GsApiActionDefinition delete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
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
                if (gsResponsePostData.isSuccess && gsResponsePostData.queryResult.todo.id){
                    todoService.updateTodoStatus(gsResponsePostData.queryResult.todo.id)
                }
                return gsResponsePostData
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition getCloneComplexity() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Complexity>(Complexity)
        gsApiActionDefinition.addRequestProperty("id", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return complexityService.cloneComplexityAPI(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Cloned")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Clone")
        return gsApiActionDefinition
    }
}
