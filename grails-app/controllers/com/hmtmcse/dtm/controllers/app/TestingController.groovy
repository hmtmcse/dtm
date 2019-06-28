package com.hmtmcse.dtm.controllers.app

import com.hmtmcse.caa.jwt.JavaJWT
import com.hmtmcse.dtm.ComplexityService
import com.hmtmcse.dtm.DummyDataService
import com.hmtmcse.dtm.TodoService
import com.hmtmcse.gs.JwtAuthService
import grails.converters.JSON
import grails.util.Environment

class TestingController {

    DummyDataService dummyDataService
    ComplexityService complexityService
    TodoService todoService
    JwtAuthService jwtAuthService

    def iniDummy() {
        if (Environment.current == Environment.DEVELOPMENT){
            dummyDataService.init()
        }
        render("Nice")
    }

    def cors() {
        render(["name": "nai"] as JSON)
    }

    def jwt() {
        render(["token": jwtAuthService.getToken("Touhid MIa")] as JSON)
    }

    def jwtValidate() {
        render(["isValid": jwtAuthService.isAuthenticated(request)] as JSON)
    }

    def lala() {
        if (Environment.current == Environment.DEVELOPMENT){
        }
        render("Nice")
    }
}
