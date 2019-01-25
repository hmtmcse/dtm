package com.hmtmcse.dtm.definition

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.swagger.definition.SwaggerConstant
import com.hmtmcse.dtm.BugWorkLog

class BugWorkLogDefinitionService {

    GsApiActionDefinition list() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<BugWorkLog>(BugWorkLog)
        gsApiActionDefinition.includeAllPropertyToResponse()
        gsApiActionDefinition.addRelationalEntityResponse("bugReport")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addRelationalEntityResponse("taskOwner")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        return gsApiActionDefinition
    }

    GsApiActionDefinition details() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<BugWorkLog>(BugWorkLog)
        gsApiActionDefinition.includeAllPropertyToResponse()
        gsApiActionDefinition.addRelationalEntityResponse("bugReport")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addRelationalEntityResponse("taskOwner")
        gsApiActionDefinition.reResponseData().addResponseProperty("id")
        gsApiActionDefinition.reResponseData().addResponseProperty("name")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        return gsApiActionDefinition
    }

    GsApiActionDefinition create() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<BugWorkLog>(BugWorkLog)
        gsApiActionDefinition.addRequestProperty("startedMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("endMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("logType").required()
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("uuid").required()
        gsApiActionDefinition.addRequestProperty("status")
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("otherInfo")
        gsApiActionDefinition.addRequestProperty("bugType")
        gsApiActionDefinition.addRequestProperty("bugReport", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("bugReportId").required()
                .enableTypeCast()
        gsApiActionDefinition.addRequestProperty("taskOwner", SwaggerConstant.SWAGGER_DT_LONG)
                .setAlias("taskOwnerId").required()
                .enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

    GsApiActionDefinition update() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<BugWorkLog>(BugWorkLog)
        gsApiActionDefinition.addRequestProperty("startedMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("endMoment").enableTypeCast().setDateFormat("yyyy-MM-dd")
        gsApiActionDefinition.addRequestProperty("logType")
        gsApiActionDefinition.addRequestProperty("description")
        gsApiActionDefinition.addRequestProperty("uuid")
        gsApiActionDefinition.addRequestProperty("status")
        gsApiActionDefinition.addRequestProperty("jsonData")
        gsApiActionDefinition.addRequestProperty("otherInfo")
        gsApiActionDefinition.addRequestProperty("bugType")
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }


    GsApiActionDefinition delete() {
        GsApiActionDefinition gsApiActionDefinition = new GsApiActionDefinition<BugWorkLog>(BugWorkLog)
        gsApiActionDefinition.addToWhereFilterProperty("id").enableTypeCast()
        gsApiActionDefinition.successResponseAsData()
        return gsApiActionDefinition
    }

}
