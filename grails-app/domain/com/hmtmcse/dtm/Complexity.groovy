package com.hmtmcse.dtm

class Complexity extends CommonTask {

    Long id
    String name
    String description
    String reference
    String uuid
    Boolean isLock = false
    Boolean isDeleted = false
    Date startedMoment
    Double estimatedHour = 0.0
    String status = TMConstant.DRAFT
    String jsonData
    String otherInfo
    String type = TMConstant.OTHERS
    String taskType = TMConstant.DEVELOPMENT
    Todo todo
    Integer sortOrder

    Date dateCreated
    Date lastUpdated


    static hasMany = [steps: Steps]

    static constraints = {
        jsonData(nullable: true)
        description(nullable: true)
        startedMoment(nullable: true)
        otherInfo(nullable: true)
        estimatedHour(nullable: true)
        reference(nullable: true)
        type(nullable: true)
        sortOrder(nullable: true)
    }

    static mapping = {
        description(type: "text")
        jsonData(type: "text")
        reference(type: "text")
        otherInfo(type: "text")
//        steps(cascade: 'all-delete-orphan')
    }
}
