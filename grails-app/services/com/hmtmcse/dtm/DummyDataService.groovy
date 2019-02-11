package com.hmtmcse.dtm

import com.hmtmcse.httputil.HttpResponse
import com.hmtmcse.httputil.HttpUtil
import grails.converters.JSON


class DummyDataService {

    private String getURL(String url){
        return "http://localhost:1122/" + url
    }

    private String mapToJsonString(Map map, String removeKey = null) {
        Map response = [:] << map
        if (removeKey && response[removeKey]) {
            response.remove(removeKey)
        }
        return (response as JSON)
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
                        "name"    : "Writing Note",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "NOTE",
                        complexity: [
                                [
                                        name    : "Other Note",
                                        type    : "NOTE",
                                        taskType: "OTHERS",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Adjust User interface",
                                        type    : "NOTE",
                                        taskType: "UI",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Reviewing Code",
                                        type    : "NOTE",
                                        taskType: "CODE_REVIEW",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Waiting for Business Analysis",
                                        type    : "NOTE",
                                        taskType: "BA",
                                        todoId  : 0,
                                ]
                        ]
                ],
                [
                        "name"    : "There is Lot's of Task",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "TASK",
                        complexity: [
                                [
                                        name    : "Work With API",
                                        type    : "TASK",
                                        taskType: "API",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Find API End Point",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Authentication Mechanism",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Find The Data Type",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Don't Forgot About External App",
                                        type    : "TASK",
                                        taskType: "EXTERNAL_APP",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Installation Process",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Push Notification Available",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "App OS Version",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "UI Depending on Coding",
                                        type    : "TASK",
                                        taskType: "UI_AND_PROGRAMMING",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "After Coding Need to Call Designer",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Need to See The FRS",
                                        type    : "TASK",
                                        taskType: "FRSR",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Review Full FRS and Try to Understand",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Send Question To BA",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ]
                        ]
                ],
                [
                        "name"    : "Remind Me",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "REMINDER",
                        complexity: [
                                [
                                        name    : "Call Designer for Mock-up",
                                        type    : "REMINDER",
                                        taskType: "UI",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Review All Codes for new Release",
                                        type    : "REMINDER",
                                        taskType: "CODE_REVIEW",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Feed need to sent Developer",
                                        type    : "REMINDER",
                                        taskType: "CODE_REVIEW",
                                        todoId  : 0,
                                ],
                                [
                                        name    : "Today BA Will not Available",
                                        type    : "REMINDER",
                                        taskType: "BA",
                                        todoId  : 0,
                                ]
                        ]
                ],
                [
                        "name"    : "Weekend Plan",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "PLAN",
                ],
                [
                        "name"    : "Next Meeting Will be",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "MEETING",
                ],
                [
                        "name"    : "Others Type",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "OTHERS",
                ],
                [
                        "name"    : "Team Task Type",
                        "dueDate" : "2020-02-20",
                        "priority": "NA",
                        "todoType": "TEAM_TASK",
                        complexity: [
                                [
                                        name    : "Prepare FRS",
                                        type    : "MANAGEMENT",
                                        taskType: "FRSR",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Call BA for FRS",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Copy and Read the FRS",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Prepare Questions set for BA",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Prepare Step for Development Complexity",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Code Review",
                                        type    : "MANAGEMENT",
                                        taskType: "CODE_REVIEW",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Check the Coding Structure",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Check Naming Convention",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Check UI Guide lines",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Send Feedback to Developer",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Code Marge",
                                        type    : "MANAGEMENT",
                                        taskType: "CODE_REVIEW",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Check Code conflict",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Merge with master",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Read FRS and Find-out All Complexity",
                                        type    : "DEVELOPMENT",
                                        taskType: "ANALYSIS",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Note All Logical Complexity",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Prepare Flow Chart",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Find out Language Complexity",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Estimation Preparation",
                                        type    : "DEVELOPMENT",
                                        taskType: "ESTIMATION",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Check current implementation",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "UI Complexity",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "New and Complex Implementation",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Share Estimation With Team Lead",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Adjust Estimation",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Background",
                                        type    : "QA",
                                        taskType: "PREPARATION",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Read & Understand FRS",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Environment Preparation",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Check Development Note & Change log",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                        ]
                                ],
                                [
                                        name    : "White Box Test",
                                        type    : "QA",
                                        taskType: "TEST_SCENARIO",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Login with username and password",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Check the dashboard & navigation",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                                ,
                                                [
                                                        name        : "Logout",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ],
                                [
                                        name    : "Validation Testing",
                                        type    : "QA",
                                        taskType: "TEST_SCENARIO",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Invalid Email test",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Authentication Session test",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Password Complexity Testing",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "Uniq email testing",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ]
                                ,
                                [
                                        name    : "Integration Testing",
                                        type    : "QA",
                                        taskType: "TEST_SCENARIO",
                                        todoId  : 0,
                                        steps   : [
                                                [
                                                        name        : "Reset and Login test",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ],
                                                [
                                                        name        : "New User create and Login",
                                                        todoId      : 0,
                                                        complexityId: 0,
                                                ]
                                        ]
                                ]
                        ]
                ],
        ]

        Map responseMap = [:]
        Integer complexityId, todoId
        map.each { Map todo ->
            httpUtil.jsonPost(getURL("api/v1/todo/quickCreate"), mapToJsonString(todo, "complexity"))
            httpResponse = httpUtil.send()
            responseMap = JSON.parse(httpResponse.content)
            if (responseMap && responseMap.response && responseMap.response.id) {
                todoId = responseMap.response.id
            }
            println(responseMap)
            if (todo.complexity && todoId) {
                todo.complexity.each { Map complexity ->
                    complexity.todoId = todoId
                    httpUtil.jsonPost(getURL("api/v1/complexity/create"), mapToJsonString(complexity, "steps"))
                    httpResponse = httpUtil.send()
                    responseMap = JSON.parse(httpResponse.content)
                    println(responseMap)
                    if (responseMap && responseMap.response && responseMap.response.id) {
                        complexityId = responseMap.response.id
                        if (complexity.steps && complexityId) {
                            complexity.steps.each { Map step ->
                                step.todoId = todoId
                                step.complexityId = complexityId
                                httpUtil.jsonPost(getURL("api/v1/step/create"), mapToJsonString(step, "steps"))
                                httpResponse = httpUtil.send()
                                responseMap = JSON.parse(httpResponse.content)
                                println(responseMap)
                            }
                        }
                    }
                }
            }

        }

        map = [
                [firstName: "Dev", lastName: "One", email: "dev1@taskmanager.local", password: "123456"],
                [firstName: "Dev", lastName: "Tow", email: "dev2@taskmanager.local", password: "123456"],
                [firstName: "Dev", lastName: "Three", email: "dev3@taskmanager.local", password: "123456"],
                [firstName: "Dev", lastName: "Four", email: "dev4@taskmanager.local", password: "123456"],
                [firstName: "Dev", lastName: "Five", email: "dev5@taskmanager.local", password: "123456"],
                [firstName: "QA", lastName: "One", email: "qa1@taskmanager.local", password: "123456"],
                [firstName: "QA", lastName: "Tow", email: "qa2@taskmanager.local", password: "123456"],
                [firstName: "QA", lastName: "Three", email: "qa3@taskmanager.local", password: "123456"],
                [firstName: "QA", lastName: "Four", email: "qa4@taskmanager.local", password: "123456"],
                [firstName: "QA", lastName: "Five", email: "qa5@taskmanager.local", password: "123456"],
                [firstName: "Team", lastName: "Lead", email: "team-lead@taskmanager.local", password: "123456"],
                [firstName: "Scrum", lastName: "Master", email: "scrum-master@taskmanager.local", password: "123456"],
                [firstName: "Designer", lastName: "One", email: "designer1@taskmanager.local", password: "123456"],
                [firstName: "Designer", lastName: "Tow", email: "designer2@taskmanager.local", password: "123456"],
                [firstName: "BA", lastName: "One", email: "ba1@taskmanager.local", password: "123456"],
                [firstName: "BA", lastName: "Tow", email: "ba2@taskmanager.local", password: "123456"],
        ]

        map.each { Map user ->
            httpUtil.jsonPost(getURL("api/v1/user/create"), mapToJsonString(user))
            httpResponse = httpUtil.send()
            responseMap = JSON.parse(httpResponse.content)
            user.id = responseMap.response.id

        }

        def wing = [
                [wingLeadId: map[0]?.id, name: "Development", members: map[0..4]*.id],
                [wingLeadId: map[5]?.id, name: "Quality Assurance", members: map[5..9]*.id],
                [wingLeadId: map[12]?.id, name: "Designer", members: map[12..13]*.id],
                [wingLeadId: map[14]?.id, name: "Business Team", members: map[14..15]*.id],
                [wingLeadId: map[10]?.id, name: "Management", members: map[10..11]*.id],
        ]

        wing.each { Map wingEntry ->
            httpUtil.jsonPost(getURL("api/v1/wing/create"), mapToJsonString(wingEntry))
            httpResponse = httpUtil.send()
            responseMap = JSON.parse(httpResponse.content)

        }

    }
}
