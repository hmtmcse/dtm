package com.hmtmcse.dtm

class Wing extends CommonTask {

    Long id
    String name
    User wingLead
    String description
    Boolean isDeleted = false
    Integer sortOrder

    User createdBy
    String uuid

    Date dateCreated
    Date lastUpdated

    static hasMany = [members: User]

    static constraints = {
        description(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
