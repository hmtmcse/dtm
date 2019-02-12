package com.hmtmcse.dtm

class WorkLog extends CommonTask {

    Long id
    User workedBy
    User updatedBy
    Double workedHour
    String logType
    Boolean isDeleted = false
    String description
    Todo todo
    Complexity complexity
    Steps steps

    Date dateCreated
    Date lastUpdated



    static constraints = {
        description(nullable: true)
        todo(nullable: true)
        complexity(nullable: true)
        steps(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
