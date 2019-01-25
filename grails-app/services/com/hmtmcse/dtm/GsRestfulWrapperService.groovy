package com.hmtmcse.dtm

import com.hmtmcse.gs.GsRestfulService
import com.hmtmcse.gs.data.GsApiResponseProperty


class GsRestfulWrapperService {

    GsRestfulService gsRestfulService

    def responseMapGenerator(Map<String, GsApiResponseProperty> responseProperties, def queryResult, def defaultResponse = [:]) {
        return gsRestfulService.responseMapGenerator(responseProperties, queryResult, defaultResponse)
    }
}
