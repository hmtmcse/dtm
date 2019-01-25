package com.hmtmcse.dtm.system

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/**"(controller: "reactJs", action: "index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
