package com.hmtmcse.dtm

import com.hmtmcse.gs.GsConfigHolder
import com.hmtmcse.jira.JIRARestHelper

class BootStrap {

    AppInitService appInitService

    def init = { servletContext ->

        appInitService.initUser()

        // Config
        JIRARestHelper.JIRA_URL = AppUtil.taskManagerConfig("jiraURL")

        // WebSocket
//        ServerContainer serverContainer = servletContext.getAttribute("javax.websocket.server.ServerContainer")
//        serverContainer.addEndpoint(ChatEndpoint)

        // Swagger Config
        GsConfigHolder.hostnameWithPort = "${AppUtil.appBaseUrlHostWithPort()}"
        GsConfigHolder.swaggerDefinitionUrl = "${AppUtil.appBaseUrl()}swaggerUi/definition"

    }
    def destroy = {
    }
}
