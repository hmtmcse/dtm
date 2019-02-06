package com.hmtmcse.dtm

class WarPlan extends CommonTask {

    Long id
    String name
    String description

    User createdBy
    String uuid
    String status
    String type
    WarPlan parent
    Boolean isDeleted = false

    Date start
    Date end

    Date dateCreated
    Date lastUpdated


    static hasMany = [milestone: WarPlan, event: WarPlan, warTodo: WarTodo]

    static constraints = {
        description(nullable: true)
        parent(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
