package com.hmtmcse.dtm

import com.hmtmcse.datetimeutil.DateTimeUtil

class WorkLog extends CommonTask {

    Long id
    User workedBy
    User updatedBy
    Double workedHour
    String logType
    String description
    Boolean isDeleted = false
    Long searchId

    Complexity complexity
    Todo todo
    Steps steps
    BugReport bugReport

    String searchUuid
    String uuid

    Date dateCreated
    Date lastUpdated



    static constraints = {
        complexity(nullable: true)
        todo(nullable: true)
        steps(nullable: true)
        bugReport(nullable: true)
        description(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }

    def beforeUpdate () {
        lastUpdated = DateTimeUtil.dateLocalToUTC(new Date())
    }

    def beforeInsert () {
        lastUpdated = DateTimeUtil.dateLocalToUTC(new Date())
        println("ohh")
    }
}
