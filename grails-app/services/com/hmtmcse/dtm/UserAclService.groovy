package com.hmtmcse.dtm


class UserAclService {

    def navigationList() {
        return [
                "dashboard": true,
                "user"     : true,
                "todo"     : true,
                "note"     : true,
                "wing"     : true,
                "mySpace"  : true,
        ]
    }


    def getNavigation(String userRole) {
        def navigation = navigationList()
        switch (userRole) {
            case TMConstant.WARRIOR:
                navigation.user = false
                navigation.wing = false
                return navigation
            case TMConstant.COMMANDER:
                return navigation
        }
        return [:]
    }


}
