package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.AssigneeDefinitionService

class ApiAssigneeV1Controller extends GsRestProcessor {

    AssigneeDefinitionService assigneeDefinitionService


    def postBulkAssign() {
        return customProcessor(assigneeDefinitionService.bulkAssign())
    }

    def postUpdateBulkAssign() {
        return customProcessor(assigneeDefinitionService.updateBulkAssign())
    }


    def getAssignedListByTodoId() {
        return customProcessor(assigneeDefinitionService.assignedListByTodoId())
    }

    def postAssignedListByTodoId() {
        return customProcessor(assigneeDefinitionService.assignedListByTodoId())
    }

}
