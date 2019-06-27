package com.hmtmcse.dtm.controllers.app

import com.hmtmcse.caa.jwt.JavaJWT
import com.hmtmcse.dtm.ComplexityService
import com.hmtmcse.dtm.DummyDataService
import com.hmtmcse.dtm.TodoService
import grails.converters.JSON
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

    def cors() {
        render(["name": "nai"] as JSON)
    }

    def jwt() {
        JavaJWT javaJWT = JavaJWT.hmackInstance(JavaJWT.ALGORITHM.HMAC256, "miavai").tokenValidUntilUTCMinutes(2);
        String token = javaJWT.token("JWT Token Test")
        render(["token": token] as JSON)
    }

    def lala() {
        if (Environment.current == Environment.DEVELOPMENT){
        }
        render("Nice")
    }
}
