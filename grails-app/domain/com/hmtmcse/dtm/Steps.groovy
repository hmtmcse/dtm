package com.hmtmcse.dtm

class Steps extends CommonTask {

    Long id
    String name
    String description
    String reference
    String uuid
    Boolean isLock = false
    Date startedMoment
    Double estimatedHour = 0
    String status = TMConstant.DRAFT
    String jsonData
    String otherInfo
    Boolean isDeleted = false
    Complexity complexity
    Todo todo
    Integer sortOrder

    Date dateCreated
    Date lastUpdated


    static constraints = {
        jsonData(nullable: true)
        description(nullable: true)
        startedMoment(nullable: true)
        otherInfo(nullable: true)
        estimatedHour(nullable: true)
        reference(nullable: true)
        complexity(nullable: true)
        todo(nullable: true)
        sortOrder(nullable: true)
    }

    static mapping = {
        description(type: "text")
        jsonData(type: "text")
        reference(type: "text")
        otherInfo(type: "text")
    }
}
