package com.hmtmcse.dtm

class BugReport extends CommonTask {

    Long id
    String name
    String description
    String uuid
    Boolean isDeleted = false
    String status = TMConstant.PENDING
    String jsonData
    String otherInfo
    String bugType = TMConstant.HAPPY_TESTING
    Todo parentIssue
    Todo relatedIssue
    Steps step
    User reporter

    Date dateCreated
    Date lastUpdated


    static hasMany = [assignee: User, workLog: BugWorkLog]

    static constraints = {
        jsonData(nullable: true)
        description(nullable: true)
        otherInfo(nullable: true)
        bugType(nullable: true)
        relatedIssue(nullable: true)
        step(nullable: true)
    }

    static mapping = {
        description(type: "text")
        jsonData(type: "text")
        otherInfo(type: "text")
    }
}
