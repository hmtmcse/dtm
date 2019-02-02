package com.hmtmcse.dtm.controllers.app

import com.hmtmcse.dtm.DummyDataService
import grails.util.Environment

class TestingController {

    DummyDataService dummyDataService

    def iniDummy() {
        if (Environment.current == Environment.DEVELOPMENT){
            dummyDataService.init()
        }
        render("Nice")
    }
}
