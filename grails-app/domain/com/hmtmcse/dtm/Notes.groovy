package com.hmtmcse.dtm

class Notes extends CommonTask {

    Long id
    String name
    String description
    String uuid
    String jsonData
    Boolean isDeleted = false
    Todo todo
    User user

    Date dateCreated
    Date lastUpdated


    static constraints = {
        jsonData(nullable: true)
        description(nullable: true)
        user(nullable: true)
        todo(nullable: true)
    }

    static mapping = {
        description(type: "text")
        jsonData(type: "text")
    }
}
