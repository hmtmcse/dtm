package com.hmtmcse.dtm.controllers.api

import com.hmtmcse.gs.GsRestProcessor
import com.hmtmcse.dtm.definition.NotesDefinitionService

class ApiNoteV1Controller extends GsRestProcessor {

    NotesDefinitionService notesDefinitionService

    def postCreate() {
        return create(notesDefinitionService.create())
    }

    def postUpdate() {
        return update(notesDefinitionService.update())
    }

    def getList() {
        return list(notesDefinitionService.list())
    }

    def getDetails() {
        return details(notesDefinitionService.details())
    }

    def postDetails() {
        return details(notesDefinitionService.details())
    }

    def deleteDelete() {
        return delete(notesDefinitionService.delete())
    }

    def getDetailsByTodo() {
        return customProcessor(notesDefinitionService.getDetailsByTodo())
    }

}
