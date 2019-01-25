package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.CommonDefinitionService
import com.hmtmcse.dtm.definition.UserDefinitionService

class ApiCommonV1Controller extends GsRestProcessor {

    CommonDefinitionService commonDefinitionService
    UserDefinitionService userDefinitionService

    def getDropDownConstant() {
        return customProcessor(commonDefinitionService.dropDownConstant())
    }

    def getTodoFilterDropDownContent() {
        return customProcessor(commonDefinitionService.todoFilterDropDownContent())
    }

    def getAllUserDropDownContent() {
        return listOnly(userDefinitionService.userDropDown())
    }

}
