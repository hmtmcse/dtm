package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.GsRequestParamException
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
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
        user.isExternalUser = true
        user.save(flush: true)
        if (user.hasErrors()){
            return null
        }
        return user
    }


    GsApiResponseData restPassword(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        String password = paramData.filteredGrailsParameterMap.password
        String confirmPassword = paramData.filteredGrailsParameterMap.confirmPassword
        if (!password || password.equals("") || !confirmPassword || confirmPassword.equals("") || !password.equals(confirmPassword)){
            return GsApiResponseData.failed("Password and Confirm Password not Matched")
        }
        User user = getUserById(paramData.filteredGrailsParameterMap.id)
        if (!user){
            return GsApiResponseData.failed("Invalid User")
        }else if (user.isExternalUser){
            return GsApiResponseData.failed("Sorry Not able to reset password, This is not Local User")
        }
        user.password = password
        user.save(flush:true)
        if (user.hasErrors()){
            return GsApiResponseData.failed("Unable to Reset password")
        }
        return GsApiResponseData.successMessage("Successfully Password Reset.")
    }


}
