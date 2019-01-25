package com.hmtmcse.dtm

class Todo extends CommonTask {

    Long id

    String name
    User createdBy
    User privateFor
    Date dueDate
    Date executeDate
    String priority = TMConstant.NA
    String externalId = TMConstant.NA
    String todoType = TMConstant.NOTE
    Todo parentIssue


    String description
    String reference
    Date startedMoment
    Double estimatedHour
    String jsonData


    String uuid

    Boolean isLock = false
    Boolean isDeleted = false
    String status = TMConstant.DRAFT
    String externalInfo

    Date dateCreated
    Date lastUpdated

    static hasMany = [complexity: Complexity, assignee: Assignee, relatedIssues: Todo, bug: BugReport, changeLog: ChangeLog, note: Notes]
    static belongsTo = [privateFor: User, createdBy: User, parentIssue: Todo]

    static constraints = {
        description(nullable: true)
        privateFor(nullable: true)
        reference(nullable: true)
        startedMoment(nullable: true)
        estimatedHour(nullable: true)
        jsonData(nullable: true)


        priority(nullable: true)
        externalId(nullable: true)

        externalInfo(nullable: true)
        dueDate(nullable: true)
        executeDate(nullable: true)
        parentIssue(nullable: true)
    }

    static mapping = {
        reference(type: "text")
        description(type: "text")
        jsonData(type: "text")
        externalInfo(type: "text")

//        complexity(cascade: 'all-delete-orphan')
//        assignee(cascade: 'all-delete-orphan')
//        bug(cascade: 'all-delete-orphan')
//        changeLog(cascade: 'all-delete-orphan')
//        note(cascade: 'all-delete-orphan')
    }


}
