package com.hmtmcse.dtm

import com.hmtmcse.jira.data.JiraUserData


class UserService {

    def isEmailExist(String email) {
        User user = User.findByEmail(email)
        if (user){
            return true
        }
        return false
    }

    def getUserById(Long id) {
        return User.createCriteria().get {
            eq("id", id)
            eq("isDeleted", false)
        }
    }



    def ifNotExistThenCreate(JiraUserData userData){
        User user = User.findByEmail(userData.email)
        if (user){
            return user
        }
        user = new User()
        user.email = userData.email
        user.password = AppUtil.uuid()
        user.firstName = userData.name
        user.save(flush: true)
        if (user.hasErrors()){
            return null
        }
        return user
    }
}
