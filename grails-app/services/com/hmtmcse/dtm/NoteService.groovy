package com.hmtmcse.dtm

import com.hmtmcse.gs.GsApiActionDefinition
import com.hmtmcse.dtm.definition.NotesDefinitionService


class NoteService {

    TodoService todoService
    GsRestfulWrapperService gsRestfulWrapperService

    def getAllNoteByTodoId(Long todoId) {
        Todo todo = todoService.getTodoById(todoId)
        return getAllNoteByTodo(todo)
    }

    def getAllNoteByTodo(Todo todo) {
        if (todo){
            return Notes.createCriteria().list {
                order("id", "desc")
                eq("todo", todo)
                eq("isDeleted", false)
            }
        }
        return []
    }

    def getAllNoteByTodoForAPI(Todo todo) {
        def notes = getAllNoteByTodo(todo)
        if (!notes){
            return []
        }
        GsApiActionDefinition noteDefinition = NotesDefinitionService.detailsDefinition()
        return gsRestfulWrapperService.responseMapGenerator(noteDefinition.getResponseProperties(), notes)
    }
}
