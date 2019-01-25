package com.hmtmcse.dtm

class User {


    Long id
    String firstName
    String lastName
    String email
    String password
    String uuid
    String userRole = TMConstant.WARRIOR
    Boolean isDeleted = false
    Boolean isActive = true

    Date dateCreated
    Date lastUpdated


    static constraints = {
        email(nullable: false, unique: true, blank: false)
        password(blank: false)
        firstName(blank: false)
        lastName(nullable: true, blank: true)
        uuid(nullable: true)
    }

    static mapping = {
        version(false)
    }



    def beforeInsert (){
        this.password = this.password.encodeAsMD5()
        this.uuid = AppUtil.uuid()
    }


    def beforeUpdate(){
        this.password = this.password.encodeAsMD5()
    }



}
