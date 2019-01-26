package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.dtm.definition.DashboardDefinitionService
import com.hmtmcse.gs.GsRestProcessor


class ApiDashboardV1Controller extends GsRestProcessor {

    DashboardDefinitionService dashboardDefinitionService

    def getDashboardTodoReport() {
        return customProcessor(dashboardDefinitionService.getDashboardTodoReport())
    }

    def postDashboardTodoReport() {
        return customProcessor(dashboardDefinitionService.getDashboardTodoReport())
    }


}
