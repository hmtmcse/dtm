package com.hmtmcse.dtm

class TMConstant {

    public static final String AUTHORIZED = "AUTHORIZED"

    public static final PENDING = "PENDING"
    public static final NOTE = "NOTE"
    public static final OTHERS = "PENDING"
    public static final NA = "NA"
    public static final DEVELOPMENT = "DEVELOPMENT"
    public static final HAPPY_TESTING = "HAPPY_TESTING"
    public static final DRAFT = "DRAFT"

    public static final WARRIOR = "WARRIOR"
    public static final COMMANDER = "COMMANDER"


    public static final STATUS = [
            DRAFT     : "Draft",
            DONE      : "Done",
            PROCESSING: "Processing",
            PENDING   : "Pending",
            TODO      : "Todo",
            FAILED    : "Failed",
    ]


    public static final PRIORITY = [
            NA     : "N/A",
            HIGHEST: "Highest",
            HIGH   : "High",
            LOWEST : "Lowest",
            LOW    : "Low"
    ]


    public static final COMPLEXITY_TYPE = [
            DEVELOPMENT: "DEVELOPMENT",
            QA         : "QA",
            MANAGEMENT : "MANAGEMENT",
            NOTE       : "NOTE",
            REMINDER  : "REMINDER",
            PLAN       : "PLAN",
            MEETING    : "MEETING",
            OTHER      : "OTHER",
    ]


    public static final COMPLEXITY_TASK_TYPE = [
            UI                : "User interface",
            PROGRAMMING       : "Programming",
            UI_AND_PROGRAMMING: "UI & Programming",
            API               : "API",
            EXTERNAL_APP      : "External App",
            CODE_REVIEW       : "Code Review",
            FRSR              : "FRS Review",
            BA                : "Business Analysis",
            OTHERS            : "Others",
    ]


    public static final WORK_LOG_TYPE = [
            TESTING    : "Testing",
            DEVELOPMENT: "Development",
            ANALYSIS   : "Analysis",
            OTHERS     : "Others",
    ]


    public static final BUG_REPORT_TYPE = [
            PARALLEL_TESTING   : "Parallel Testing",
            QA_TESTING         : "QA Testing",
            INTEGEATION_TESTING: "Integration Testing",
            STAGING_TESTING    : "Staging Testing",
            AUTOMATION_TESTING : "Automation Testing",
            LOAD_TESTING       : "Load Testing",
            HAPPY_TESTING      : "Happy Testing",
    ]


    public static final LOGIN_TYPE = [
            JIRA      : "JIRA",
            LOCAL     : "LOCAL",
            JIRA_LOCAL: "JIRA_LOCAL",
    ]


    public static final TODO_TYPE = [
            NOTE     : "Note",
            TEAM_TASK: "Team Task",
            TASK     : "Task",
            REMINDER: "Reminder",
            PLAN     : "Plan",
            MEETING  : "Meeting",
            OTHERS   : "Others",
    ]

    public static final TODO_TASK_TYPE = [
            DEVELOPMENT: "Development",
            QA         : "Quality Assurance",
            MANAGEMENT : "Management",
            BA         : "Business Analysis",
            DEV_OPS    : "DevOps",
            AQA        : "Automation Testing",
            OTHERS     : "Others",
    ]


    public static final ISSUE_FILTER_BY = [
            ASSIGNED_TO_ME: "Assigned Me",
            MY_TODO      : "My Todo",
            ALL_TODO    : "All Todo",
    ]

}
