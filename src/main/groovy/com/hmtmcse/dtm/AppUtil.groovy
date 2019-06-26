package com.hmtmcse.dtm

import grails.util.Holders
import org.grails.web.util.WebUtils

class AppUtil {


    static saveResponse(Boolean isSuccess, def model) {
        return [isSuccess: isSuccess, model: model]
    }

    static getAppSession() {
        return WebUtils.retrieveGrailsWebRequest().session
    }

    static invalidateSession() {
        return appSession.invalidate()
    }

    static uuid(){
        return UUID.randomUUID().toString().toUpperCase()
    }

    static appBaseUrl(){
        return taskManagerConfig("baseURL", "http://localhost:1122/")
    }

    static corsOrigin(){
        return taskManagerConfig("corsOrigin", "*")
    }

    static corsMethods(){
        return taskManagerConfig("corsMethods", "POST, GET, OPTIONS")
    }

    static corsHeaders(){
        return taskManagerConfig("corsHeaders", "Origin, Content-Type, application/json")
    }

    static Boolean enableAuthenticationCheck(){
        return taskManagerConfig("enableAuthenticationCheck", true)
    }

    static appBaseUrlHostWithPort(){
        String urlString = appBaseUrl()
        URL url = new URL(urlString)
        String port = ""
        if (url.getPort() > 0){
            port = ":${url.getPort()}"
        }
        return "${url.getHost()}${port}"
    }

    static taskManagerConfig(String key, Object defaultValue = null){
        Object object = Holders.config.taskManager[key]
        if (object != null){
            return object
        }
        return defaultValue
    }

    static String hourToEstimation(Double estimatedHour){
        Integer day = 0
        Double hour = 0
        if (estimatedHour){
            day = (estimatedHour / 8)
            hour = (estimatedHour % 8)
        }
        String estimation = ""
        if (day){
            estimation = "${day}d "
        }

        if (hour){
            estimation += "${hour}h"
        }
        return (!estimation.equals("") ? estimation : "0.0")
    }

}
