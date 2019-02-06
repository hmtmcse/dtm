package com.hmtmcse.dtm

class WarTodo extends CommonTask {

    Long id

    User createdBy
    String uuid
    String possibleStatus
    WarPlan parent
    Todo todo
    Boolean isDeleted = false

    Date start
    Date end

    Date dateCreated
    Date lastUpdated


    static hasMany = [milestone: WarPlan, event: WarPlan]

    static constraints = {
        start(nullable: true)
        end(nullable: true)
    }

    static mapping = {}
}