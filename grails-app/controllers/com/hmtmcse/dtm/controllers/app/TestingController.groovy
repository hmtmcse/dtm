package com.hmtmcse.dtm.controllers.app

import com.hmtmcse.dtm.Complexity
import com.hmtmcse.dtm.ComplexityService
import com.hmtmcse.dtm.DummyDataService
import com.hmtmcse.dtm.Todo
import com.hmtmcse.dtm.TodoService
import grails.util.Environment

class TestingController {

    DummyDataService dummyDataService
    ComplexityService complexityService
    TodoService todoService

    def iniDummy() {
        if (Environment.current == Environment.DEVELOPMENT){
            dummyDataService.init()
        }
        render("Nice")
    }

    def lala() {
        if (Environment.current == Environment.DEVELOPMENT){
        }
        render("Nice")
    }
}
