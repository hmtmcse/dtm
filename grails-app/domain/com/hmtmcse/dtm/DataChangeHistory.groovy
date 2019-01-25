package com.hmtmcse.dtm

class DataChangeHistory extends CommonTask {

    Long id
    String domainName
    String uuid
    String rowUUID
    Long rowID
    String changedDataJson
    User changedBy


    Date dateCreated
    Date lastUpdated


    static constraints = {
        rowID(nullable: true)
        rowUUID(nullable: true)
        changedBy(nullable: true)
    }

    static mapping = {
        changedDataJson(type: "text")
    }
}
