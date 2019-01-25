package com.hmtmcse.dtm.controllers.app

import com.hmtmcse.dtm.ComplexityService

class TestingController {

    ComplexityService complexityService

    def index() {
        complexityService.getComplexityListWithStepForAPI()
        render("Nice")
    }
}
