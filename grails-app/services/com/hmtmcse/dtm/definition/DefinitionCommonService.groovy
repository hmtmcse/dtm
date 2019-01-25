package com.hmtmcse.dtm.definition


class DefinitionCommonService {

    public static List commonSkipFields() {
        return ["isDeleted", "dateCreated", "lastUpdated", "version"]
    }
}
