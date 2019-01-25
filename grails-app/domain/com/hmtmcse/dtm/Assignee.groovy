package com.hmtmcse.dtm

class Assignee extends CommonTask {

    Long id
    Todo todo
    User assignTo
    String taskType
    User createdBy
    String uuid

    Date dateCreated
    Date lastUpdated


    static constraints = {
        assignTo(nullable: true)
    }
}
