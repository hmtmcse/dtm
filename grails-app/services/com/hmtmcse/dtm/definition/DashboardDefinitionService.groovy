package com.hmtmcse.dtm.definition

import com.hmtmcse.dtm.DashboardService
import com.hmtmcse.dtm.Todo
import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.gs.model.CustomProcessor
import com.hmtmcse.swagger.definition.SwaggerConstant


class DashboardDefinitionService {

    DashboardService dashboardService

    GsApiActionDefinition getDashboardTodoReport() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<Todo>(Todo)
        gsApiActionDefinition.customProcessor = new CustomProcessor() {
            @Override
            GsApiResponseData process(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
                return dashboardService.getDashboardTodoReport(actionDefinition, paramData, apiHelper)
            }
        }
        gsApiActionDefinition.addResponseProperty("assignedTodo").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP)
        gsApiActionDefinition.addResponseProperty("privateTodo").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP)
        gsApiActionDefinition.addResponseProperty("otherTodo").setDataType(SwaggerConstant.SWAGGER_DT_ARRAY_MAP)
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }
}
