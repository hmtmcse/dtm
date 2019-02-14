package com.hmtmcse.dtm

class WorkLog extends CommonTask {

    Long id
    User workedBy
    User updatedBy
    Double workedHour
    String logType
    String description
    Boolean isDeleted = false
    Long searchId

    String searchUuid
    String uuid

    Date dateCreated
    Date lastUpdated



    static constraints = {
        description(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
