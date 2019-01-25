package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData


class StepService {

    ComplexityService complexityService

    def getAllStepByComplexityId(Long todoId) {
        Complexity complexity = complexityService.getComplexityById(todoId)
        return getAllStepByComplexity(complexity)
    }

    def getAllStepByComplexity(Complexity complexity) {
        if (complexity){
            return Steps.createCriteria().list {
                order("sortOrder", "desc")
                eq("complexity", complexity)
                eq("isDeleted", false)
            }
        }
        return []
    }

    GsApiResponseData saveSorting(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def map = paramData.filteredGrailsParameterMap.itemMap
        if (paramData.filteredGrailsParameterMap.itemMap){
            Steps steps
            map.each { data ->
                Long dbId = new Long(data.dbId)
                steps = Steps.get(dbId)
                if (steps){
                    steps.sortOrder = data.index
                    steps.save(flush: true)
                }
            }
        }
        return GsApiResponseData.successMessage("Updated")
    }
}
