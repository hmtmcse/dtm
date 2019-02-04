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

    def getStepById(Long id) {
        return Steps.createCriteria().get {
            eq("isDeleted", false)
            eq("id", id)
        }
    }

    def cloneStepById(Long id){
        Steps steps = getStepById(id)
        cloneStep(steps)
    }

    def cloneStep(Steps steps, Complexity complexity = null, Boolean isUpdateStatus = true) {
        if (steps){
            Steps cloned = new Steps(steps.properties)
            cloned.id = null
            cloned.uuid = null
            if (complexity){
                cloned.complexity = complexity
            }else{
                cloned.name = TMConstant.COPY_OF + cloned.name
            }
            cloned.status = TMConstant.DRAFT
            cloned.save(flush: true)
            if (!cloned.hasErrors() && isUpdateStatus){
                complexityService.updateComplexityStatusById(cloned.complexity.id)
            }
        }
    }

    GsApiResponseData cloneStepAPI(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def params = paramData.filteredGrailsParameterMap
        Steps steps = getStepById(params.id)
        if (steps) {
            cloneStep(steps)
        } else {
            return GsApiResponseData.failed("Invalid Step")
        }
        return GsApiResponseData.successMessage("Cloned")
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

    GsApiResponseData changeStatus(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        def params = paramData.filteredGrailsParameterMap
        if (!TMConstant.STATUS.containsKey(params.status)) {
            return GsApiResponseData.failed("Invalid Status")
        }
        Steps steps = getStepById(params.id)
        if (steps) {
            steps.status = params.status
            steps.save(flush: true)
            if (steps.hasErrors()) {
                return GsApiResponseData.failed("Unable to Update")
            }
            complexityService.updateComplexityAndTodoStatus(steps.complexity)
        } else {
            return GsApiResponseData.failed("Invalid Steps")
        }
        return GsApiResponseData.successMessage("Updated")
    }
}
