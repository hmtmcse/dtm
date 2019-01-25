package com.hmtmcse.dtm

class CommonTask {

    def beforeValidate () {
        if (this.uuid == null){
            this.uuid = AppUtil.uuid()
        }
    }
}
