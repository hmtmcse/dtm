package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsApiResponseProperty
import com.hmtmcse.gs.data.GsFilteredData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.gs.model.CustomResponseParamProcessor
import com.hmtmcse.gs.model.RequestPreProcessor
import com.hmtmcse.swagger.SwaggerHelper
import com.hmtmcse.swagger.definition.SwaggerConstant
import com.hmtmcse.dtm.AuthenticationService
import com.hmtmcse.dtm.TMConstant
import com.hmtmcse.dtm.Todo
import com.hmtmcse.dtm.TodoService
import grails.web.servlet.mvc.GrailsParameterMap


class TodoDefinitionService {

    AuthenticationService authenticationService
    TodoService todoService

    GsApiActionDefinition todoReadGeneralDefinition() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.includeAllNotRelationalThenExcludeFromResponse(DefinitionCommonService.commonSkipFields())

        gsApiActionDefinition.addRelationalEntityResponse("parentIssue")
        gsApiActionDefinition.reResponseData().addResponseProperty("uuid")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")

        gsApiActionDefinition.addRelationalEntityResponse("createdBy")
        gsApiActionDefinition.reResponseData().addResponseProperty("uuid")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")

        SwaggerHelper swaggerHelper = new SwaggerHelper()
        gsApiActionDefinition.addResponseProperty("publishInfo").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                def publishInfo = ["isPublished": false, "isShow": false]
                if (domainRow.privateFor){
                    publishInfo.isPublished = false
                }else{
                    publishInfo.isPublished = true
                }
                if (domainRow.createdBy.id == authenticationService.userInfo.id){
                    publishInfo.isShow = true
                }
                return publishInfo
            }
        }

        gsApiActionDefinition.addResponseProperty("depth").setDataType(SwaggerConstant.SWAGGER_DT_STRING).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                return todoService.calculateDepth(domainRow)
            }
        }

        swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("totalComplexity", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("totalStep", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("estimatedHour", SwaggerConstant.SWAGGER_DT_DOUBLE)
        swaggerHelper.addProperties("estimation", SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("summery").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties()).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                return todoService.processTodoSummery(domainRow)
            }
        }


        gsApiActionDefinition.addResponseProperty("due").setDataType(SwaggerConstant.SWAGGER_DT_INTEGER).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                return todoService.calculateDue(domainRow)
            }
        }

        gsApiActionDefinition.addResponseProperty("estimation").setDataType(SwaggerConstant.SWAGGER_DT_STRING).customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                return todoService.calculateEstimation(domainRow)
            }
        }

        gsApiActionDefinition.addResponseProperty("dueDate").customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                Date date = domainRow[fieldName]
                return date.format("dd MMM yyyy")
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition createUpdateDefinition() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.addRequestProperty("name").required() setErrorMessage("Please Enter Valid Name.")
        gsApiActionDefinition.addRequestProperty("dueDate").required().setErrorMessage("Need to specify Due Date.").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("priority")
        gsApiActionDefinition.addRequestProperty("externalId")
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("reference")
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("externalInfo")
        gsApiActionDefinition.addRequestProperty("parentIssue", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("parentIssueId")
                .enableTypeCast()

        gsApiActionDefinition.addResponseProperty("uuid")
        gsApiActionDefinition.addResponseProperty("id")
        return gsApiActionDefinition
    }

    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = createUpdateDefinition()
        gsApiActionDefinition.addRequestProperty("todoType").required()
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                gsFilteredData.gsParamsPairData.addToParams("createdBy", authenticationService.userInfo)
                gsFilteredData.gsParamsPairData.addToParams("privateFor", authenticationService.userInfo)
                return gsFilteredData
            }
        }
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition publish() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.addRequestProperty("todoId", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return todoService.publish(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Published!!")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Publish Todo.")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition unpublish() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.addRequestProperty("todoId", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return todoService.unpublish(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully unpublished!!")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Unpublished Todo.")
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition update() {
        GsApiActionDefinition gsApiActionDefinition = createUpdateDefinition()
        gsApiActionDefinition.addRequestProperty("status").required() setErrorMessage("Please Enter Valid Status.")
        gsApiActionDefinition.addRequestProperty("assignee", SwaggerConstant.SWAGGER_DT_ARRAY_LONG)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }


    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = todoReadGeneralDefinition()
        gsApiActionDefinition.addRequestProperty("issueFilterBy", SwaggerConstant.SWAGGER_DT_STRING)

        gsApiActionDefinition.includeInWhereFilter(["name", "priority", "todoType", "status"])
        gsApiActionDefinition.requestPreProcessor = new RequestPreProcessor() {
            @Override
            GsFilteredData process(GsApiActionDefinition definition, GsFilteredData gsFilteredData) {
                GrailsParameterMap filteredGrailsParameterMap = gsFilteredData.gsParamsPairData.filteredGrailsParameterMap
                if (filteredGrailsParameterMap && filteredGrailsParameterMap.issueFilterBy) {
                    String issueFilterValue = filteredGrailsParameterMap.issueFilterBy
                    switch (TMConstant.ISSUE_FILTER_BY[issueFilterValue]) {
                        case TMConstant.ISSUE_FILTER_BY.MY_TODO:
                            definition.addToWhereFilterProperty("createdBy")
                            gsFilteredData.where.addEqual("createdBy", authenticationService.userInfo)
                            break
                        case TMConstant.ISSUE_FILTER_BY.ALL_TODO:
                            break
                        case TMConstant.ISSUE_FILTER_BY.ASSIGNED_TO_ME:
                            gsFilteredData.additionalWhereClosure = {
                                return {
                                    assignee {
                                        eq("assignTo", authenticationService.userInfo)
                                    }
                                }
                            }
                            break
                    }
                }
                definition.addToWhereFilterProperty("privateFor")
                definition.addToWhereFilterProperty("isDeleted")
                gsFilteredData.where.addEqual("isDeleted", false)
                gsFilteredData.where.addOr()
                        .addIsNull("privateFor")
                        .addEqual("privateFor", authenticationService.userInfo)
                return gsFilteredData
            }
        }
        return gsApiActionDefinition
    }

    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = todoReadGeneralDefinition()
        gsApiActionDefinition.addResponseProperty("dueDate").customResponseParamProcessor = new CustomResponseParamProcessor() {
            @Override
            Object process(String fieldName, Object domainRow, GsApiResponseProperty propertyDefinition) {
                Date date = domainRow[fieldName]
                return date.format("yyyy-MM-dd")
            }
        }
        gsApiActionDefinition.addToWhereFilterProperty('id').enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition allDetails() {
        GsApiActionDefinition gsApiActionDefinition = details()
        gsApiActionDefinition.copyToRelationalRequestResponse("complexity", ComplexityDefinitionService.detailsDefinition())
        gsApiActionDefinition.copyToRelationalRequestResponse("changeLog", ChangeLogDefinitionService.detailsDefinition())
        gsApiActionDefinition.copyToRelationalRequestResponse("note", NotesDefinitionService.detailsDefinition())
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return todoService.getTodoDetails(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.allowedConditionOnlyEqual()

        gsApiActionDefinition.addRelationalEntityResponse("assignee")
        gsApiActionDefinition.reResponseData().addResponseProperty("uuid")
        gsApiActionDefinition.reResponseData().addResponseProperty("firstName")
        gsApiActionDefinition.reResponseData().addResponseProperty("lastName")

        gsApiActionDefinition.addRelationalEntityResponse("bug")
        gsApiActionDefinition.reResponseData().addResponseProperty("uuid")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")


        gsApiActionDefinition.successResponseAsData()

        return gsApiActionDefinition
    }


    GsApiActionDefinition allDetailsByCondition() {
        GsApiActionDefinition gsApiActionDefinition = allDetails()
        gsApiActionDefinition.disableQueryFilter()
        gsApiActionDefinition.disableCondition()
        gsApiActionDefinition.addRequestProperty("id", SwaggerConstant.SWAGGER_DT_LONG).required().enableTypeCast()
        gsApiActionDefinition.addRequestProperty("type", SwaggerConstant.SWAGGER_DT_STRING).required()
        return gsApiActionDefinition
    }


    GsApiActionDefinition delete(){
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Deleted")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Delete")
        return gsApiActionDefinition
    }


    GsApiActionDefinition softDelete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.addRequestProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseFormat = GsApiResponseData.successMessage("Successfully Deleted")
        gsApiActionDefinition.failedResponseFormat = GsApiResponseData.failed("Unable to Delete")
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return todoService.softDelete(actionDefinition, paramData, apiHelper)
            }
        }
        return gsApiActionDefinition
    }

}
