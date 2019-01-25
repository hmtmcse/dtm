package com.hmtmcse.dtm

class WorkLog extends CommonTask {

    Long id
    User taskOwner
    Date startedMoment
    Date endMoment
    String logType
    String description

    Date dateCreated
    Date lastUpdated


    static constraints = {
        description(nullable: true)
        startedMoment(nullable: true)
        endMoment(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
