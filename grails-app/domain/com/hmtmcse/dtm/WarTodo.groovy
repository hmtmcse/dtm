package com.hmtmcse.dtm

class WarTodo extends CommonTask {

    Long id

    User createdBy
    String uuid
    String possibleStatus
    WarPlan parent
    Todo todo

    Date start
    Date end

    Date dateCreated
    Date lastUpdated


    static constraints = {
        start(nullable: true)
        end(nullable: true)
    }

    static mapping = {}
}