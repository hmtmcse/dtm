package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.swagger.SwaggerHelper
import com.hmtmcse.swagger.definition.SwaggerConstant
import com.hmtmcse.dtm.Assignee
import com.hmtmcse.dtm.AssigneeService


class AssigneeDefinitionService {

    AssigneeService assigneeService

    private static SwaggerHelper assigneeRequestMap(){
        SwaggerHelper swaggerHelper = new SwaggerHelper()
        swaggerHelper.initItem(SwaggerConstant.SWAGGER_DT_OBJECT, SwaggerConstant.IN_BODY)
        swaggerHelper.addProperties("todoId", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("assignToId", SwaggerConstant.SWAGGER_DT_INTEGER)
        swaggerHelper.addProperties("taskType", SwaggerConstant.SWAGGER_DT_STRING)
        return swaggerHelper
    }

    GsApiActionDefinition bulkAssign() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Assignee>(Assignee)
        SwaggerHelper swaggerHelper = assigneeRequestMap()
        gsApiActionDefinition.addRequestProperty("assignTo", SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties())
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return assigneeService.saveUpdateAssignee(actionDefinition, paramData, apiHelper)
            }
        }
        return gsApiActionDefinition
    }

    GsApiActionDefinition updateBulkAssign() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Assignee>(Assignee)
        SwaggerHelper swaggerHelper = assigneeRequestMap()
        swaggerHelper.addProperties("id", SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addRequestProperty("assignTo", SwaggerConstant.SWAGGER_DT_ARRAY_MAP).setPropertyMap(swaggerHelper.getAllProperties())
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return assigneeService.saveUpdateAssignee(actionDefinition, paramData, apiHelper)
            }
        }
        return gsApiActionDefinition
    }


    GsApiActionDefinition assignedListByTodoId() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Assignee>(Assignee)
        gsApiActionDefinition.addRequestProperty("todoId", SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addResponseProperty("assigneeId").setDataType(SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addResponseProperty("taskType").setDataType(SwaggerConstant.SWAGGER_DT_STRING)
        gsApiActionDefinition.addResponseProperty("todoId").setDataType(SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.addResponseProperty("id").setDataType(SwaggerConstant.SWAGGER_DT_INTEGER)
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return assigneeService.listAssignee(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.successResponseAsData([])
        return gsApiActionDefinition
    }
}
