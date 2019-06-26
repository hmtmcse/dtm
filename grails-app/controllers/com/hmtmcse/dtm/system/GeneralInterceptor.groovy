package com.hmtmcse.dtm.system

import com.hmtmcse.dtm.AppUtil


class GeneralInterceptor {

    public GeneralInterceptor(){
        matchAll()
    }

    boolean before() {
        response.setHeader("Access-Control-Allow-Methods",  "" + AppUtil.corsMethods())
        response.setHeader("Access-Control-Allow-Origin",  "" + AppUtil.corsOrigin())
        response.setHeader("Access-Control-Allow-Headers",   "" + AppUtil.corsHeaders())
        return true
    }

    boolean after() {
        return true
    }

    void afterView() {
        // no-op
    }
}
