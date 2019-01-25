package com.hmtmcse.dtm


class DataChangeHistoryService {


    static def add(String domainName, String changedDataJson, Long rowID, String rowUUID) {
        DataChangeHistory dataChangeHistory = new DataChangeHistory()
        dataChangeHistory.domainName = domainName
        dataChangeHistory.changedDataJson = changedDataJson
        dataChangeHistory.rowID = rowID
        dataChangeHistory.rowUUID = rowUUID
        def authorization = AppUtil.getAppSession()[TMConstant.AUTHORIZED]
        if (authorization){
            dataChangeHistory.changedBy = authorization?.user
        }
        dataChangeHistory.save(flush: true)
    }
}
