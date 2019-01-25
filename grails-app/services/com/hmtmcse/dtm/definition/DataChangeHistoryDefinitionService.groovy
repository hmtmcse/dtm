package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.dtm.DataChangeHistory

class DataChangeHistoryDefinitionService {

    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<DataChangeHistory>(DataChangeHistory)
        gsApiActionDefinition.includeAllPropertyToResponse()
        return gsApiActionDefinition
    }

    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<DataChangeHistory>(DataChangeHistory)
        gsApiActionDefinition.includeAllPropertyToResponse()
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<DataChangeHistory>(DataChangeHistory)
        gsApiActionDefinition.addRequestProperty("domainName").required()
        gsApiActionDefinition.addRequestProperty("uuid").required()
        gsApiActionDefinition.addRequestProperty("rowUUID")
        gsApiActionDefinition.addRequestProperty("rowID").enableTypeCast()
        gsApiActionDefinition.addRequestProperty("changedDataJson").required()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition update() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<DataChangeHistory>(DataChangeHistory)
        gsApiActionDefinition.addRequestProperty("domainName")
        gsApiActionDefinition.addRequestProperty("uuid")
        gsApiActionDefinition.addRequestProperty("rowUUID")
        gsApiActionDefinition.addRequestProperty("rowID").enableTypeCast()
        gsApiActionDefinition.addRequestProperty("changedDataJson")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }


    GsApiActionDefinition delete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<DataChangeHistory>(DataChangeHistory)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }
}
