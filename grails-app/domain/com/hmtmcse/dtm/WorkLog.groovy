package com.hmtmcse.dtm

class WorkLog extends CommonTask {

    Long id
    User workedBy
    Double workedHour
    String logType
    String description
    Todo todo
    Complexity complexity
    Steps Steps

    Date dateCreated
    Date lastUpdated



    static constraints = {
        description(nullable: true)
        todo(nullable: true)
        complexity(nullable: true)
        Steps(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
