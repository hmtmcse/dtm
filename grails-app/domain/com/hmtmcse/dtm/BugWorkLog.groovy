package com.hmtmcse.dtm

class BugWorkLog extends CommonTask {

    Long id
    BugReport bugReport
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
