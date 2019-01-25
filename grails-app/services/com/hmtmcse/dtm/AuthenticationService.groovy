package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.gs.data.ApiHelper
import com.hmtmcse.gs.data.GsApiResponseData
import com.hmtmcse.gs.data.GsParamsPairData
import com.hmtmcse.jira.JIRARestHelper
import com.hmtmcse.jira.data.JiraUserData
import grails.web.servlet.mvc.GrailsParameterMap


class AuthenticationService {

    UserService userService
    UserAclService userAclService

    Boolean isAuthenticated(){
        def authorization = AppUtil.getAppSession()[TMConstant.AUTHORIZED]
        if (authorization && authorization.isLoggedIn){
            return true
        }
        return false
    }

    def doLogin(String email, String password){
        password = password.encodeAsMD5()
        User user = User.findByEmailAndPassword(email, password)
        if (user){
            setUserAuthorization(user)
            return user
        }
        return null
    }


    def setUserAuthorization(User user) {
        def authorization = [isLoggedIn: true, user: user]
        AppUtil.getAppSession()[TMConstant.AUTHORIZED] = authorization
    }

    def getUserInfo(){
        def authorization = AppUtil.getAppSession()[TMConstant.AUTHORIZED]
        if (authorization && authorization.user){
            return authorization.user
        }
        return null
    }


    def jiraLogin(String email, String password){
        String username = email
        if (email.indexOf("@") != -1){
            username =  email.substring(0, email.indexOf("@"))
        }
        JIRARestHelper jiraRestHelper = new JIRARestHelper()
        JiraUserData userData = jiraRestHelper.login(username, password)
        if (!userData.isLoginSuccess){
            return null
        }
        return userService.ifNotExistThenCreate(userData)
    }

    def loginToWithSession(GsApiActionDefinition actionDefinition, GsParamsPairData paramData, ApiHelper apiHelper) {
        GrailsParameterMap filteredGrailsParameterMap = paramData.filteredGrailsParameterMap
        def login = loginTo(filteredGrailsParameterMap.email, filteredGrailsParameterMap.password)
        if (login) {
            Map userInfo = [:]
            setUserAuthorization(login)
            userInfo.user = apiHelper.help.responseMapGenerator(actionDefinition.getResponseProperties(), login)
            def navigation = userAclService.getNavigation(login.userRole)
            userInfo.navigation = navigation
            userInfo.preference = [:]
            return GsApiResponseData.successResponse(userInfo)
        }
        return apiHelper.help.responseToApi(actionDefinition, login)
    }


    def loginTo(String email, String password){
        if (email == null || email.equals("") || password == null || password.equals("")){
            return null
        }
        String loginConfig = AppUtil.taskManagerConfig("loginType")
        if (loginConfig == null || loginConfig.equals(TMConstant.LOGIN_TYPE.LOCAL)){
            return doLogin(email, password)
        }else if (loginConfig.equals(TMConstant.LOGIN_TYPE.JIRA)){
            return jiraLogin(email, password)
        }else if (loginConfig.equals(TMConstant.LOGIN_TYPE.JIRA_LOCAL)){
            def data =  jiraLogin(email, password)
            if (data){
                return data
            }
            data = doLogin(email, password)
            return data
        }
        return null
    }

}
