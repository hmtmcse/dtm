package com.hmtmcse.dtm

class Wing extends CommonTask {

    Long id
    String name
    User wingLead
    String description
    Boolean isDeleted = false
    Integer sortOrder = 0

    User createdBy
    User updatedBy
    String uuid

    Date dateCreated
    Date lastUpdated

    Collection<User> members = []

    static hasMany = [members: User]

    static constraints = {
        description(nullable: true)
    }

    static mapping = {
        description(type: "text")
    }
}
