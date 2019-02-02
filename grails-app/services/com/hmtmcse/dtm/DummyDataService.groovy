package com.hmtmcse.dtm

import com.hmtmcse.httputil.HttpResponse
import com.hmtmcse.httputil.HttpUtil
import grails.converters.JSON


class DummyDataService {

    private String getURL(String url){
        return "http://localhost:1122/" + url
    }

    private String mapToJsonString(Map map){
        return (map as JSON)
    }

    def init() {
        HttpUtil httpUtil = new HttpUtil()
        httpUtil.setEnableSession(true)
        def map = [
                "email": "admin@taskmanager.local",
                "password": "123456",
        ]
        httpUtil.jsonPost(getURL("api/v1/authentication/login"), mapToJsonString(map))
        HttpResponse httpResponse = httpUtil.send()


        map = [
                [
                        "name": "Note Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "NOTE",
                ],
                [
                        "name": "Task Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "TASK",
                ],
                [
                        "name": "Reminder Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "REMINDER",
                ],
                [
                        "name": "Plan Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "PLAN",
                ],
                [
                        "name": "Meeting Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "MEETING",
                ],
                [
                        "name": "Others Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "OTHERS",
                ],
                [
                        "name": "Team Task Type",
                        "dueDate": "2020-02-20",
                        "priority": "NA",
                        "todoType": "TEAM_TASK",
                ],
        ]
        map.each {
            httpUtil.jsonPost(getURL("api/v1/todo/quickCreate"), mapToJsonString(it))
            httpResponse = httpUtil.send()
        }
    }
}
