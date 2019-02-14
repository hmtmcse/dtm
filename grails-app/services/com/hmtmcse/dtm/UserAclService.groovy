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
                "activity"  : true,
        ]
    }


    def getNavigation(String userRole) {
        def navigation = navigationList()
        switch (userRole) {
            case TMConstant.WARRIOR:
                navigation.user = false
                navigation.wing = false
                navigation.activity = false
                return navigation
            case TMConstant.COMMANDER:
                return navigation
        }
        return [:]
    }


}
