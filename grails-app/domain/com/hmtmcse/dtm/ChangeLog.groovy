package com.hmtmcse.dtm

class ChangeLog extends CommonTask {

    Long id
    String name
    String description
    String uuid
    String jsonData
    String otherInfo
    Boolean isDeleted = false
    Todo todo

    Date dateCreated
    Date lastUpdated


    static constraints = {
        jsonData(nullable: true)
        description(nullable: true)
        otherInfo(nullable: true)
    }

    static mapping = {
        description(type: "text")
        jsonData(type: "text")
        otherInfo(type: "text")
    }
}
