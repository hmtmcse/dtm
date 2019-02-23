package com.hmtmcse.dtm


class WorkLogService {

    AuthenticationService authenticationService

    private def workedHourByType(String filedName, def object, User workedBy) {
        return WorkLog.createCriteria().get {
            eq(filedName, object)
            eq("isDeleted", false)
            sum("workedHour")
            if (workedBy){
                eq("workedBy", workedBy)
            }
        }
    }

    def workedHourByComplexity(Complexity complexity, User workedBy) {
       return workedHourByType("complexity", complexity, workedBy)
    }

    def workedHourByStep(Steps steps, User workedBy) {
        return workedHourByType("steps", steps, workedBy)
    }

    def workedHourByBugReport(BugReport bugReport, User workedBy) {
        return workedHourByType("bugReport", bugReport, workedBy)
    }


    def workLogByUserAndDateSpan(Date start, Date end, User workedBy) {
        List<WorkLog> workLogList = WorkLog.createCriteria().list {
            if (workedBy){
                eq("workedBy", workedBy)
            }
            eq("isDeleted", false)
//            between("lastUpdated", start, end)
        }
        return workLogList
    }

    def getWorkLogData(Date start, Date end, User workedBy){
        List<WorkLog> workLogList = workLogByUserAndDateSpan(start, end, workedBy)
        def workerLogInfo = [
                "firstName": workedBy.firstName,
                "lastName": workedBy.lastName,
                "id": workedBy.id,
                "start": "",
                "end": "",
                "log": []
        ]
        def log
        workLogList.each {WorkLog workLog->
            log = workLogPropertiesProcessor(workLog)
            if (log){
                workerLogInfo.log.add(log)
            }
        }
        return workerLogInfo
    }

    def workLogPropertiesProcessor(WorkLog workLog){
        Map workLogStatus  = [
                "name": "",
                "estimation":  0.0,
                "worked":  0.0,
                "totalWorkedHour": 0.0,
                "remaining":  0.0,
                "extraWork":  0.0,
                "status": "",
                "type": "",
        ]
        workLogStatus.worked = workLog.workedHour
        if (workLog.complexity){
            if (workLog.complexity.steps){
                return null
            }
            workLogStatus.name = workLog.complexity.name
            workLogStatus.estimation = workLog.complexity.estimatedHour
            workLogStatus.status = workLog.complexity.status
            workLogStatus.totalWorkedHour = workedHourByComplexity(workLog.complexity, workLog.workedBy)
            workLogStatus.type = TMConstant.WORK_LOG_TYPE.COMPLEXITY
        }else if (workLog.steps){
            workLogStatus.type = TMConstant.WORK_LOG_TYPE.STEP
            workLogStatus.name = workLog.steps.name
            workLogStatus.estimation = workLog.steps.estimatedHour
            workLogStatus.status = workLog.steps.status
            workLogStatus.totalWorkedHour = workedHourByStep(workLog.steps, workLog.workedBy)
        }else if (workLog.bugReport){
            workLogStatus.type = TMConstant.WORK_LOG_TYPE.BUG_TASK
            workLogStatus.name = workLog.bugReport.name
            workLogStatus.status = workLog.bugReport.status
            workLogStatus.totalWorkedHour = workedHourByBugReport(workLog.steps, workLog.workedBy)
        }else if (workLog.todo){
            workLogStatus.type = TMConstant.WORK_LOG_TYPE.TODO
        }else{
            workLogStatus.type = TMConstant.WORK_LOG_TYPE.OTHER
            workLogStatus.name = workLog.description
            workLogStatus.worked = workLog.workedHour
            workLogStatus.status = TMConstant.OTHER
            return workLogStatus
        }

        if (workLogStatus.estimation){
            workLogStatus.remaining = workLogStatus.estimation - workLogStatus.totalWorkedHour
            if (workLogStatus.remaining < 0){
                workLogStatus.extraWork = Math.abs(workLogStatus.remaining)
                workLogStatus.remaining = "--"
            }
        }
    }


    def myWorkLog(Date start, Date end) {
        return getWorkLogData(start, end, authenticationService.userInfo)
    }


}
