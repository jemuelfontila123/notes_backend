const express = require('express')
const router = express.Router()
const noteController = require('../controller/noteController')


router.route('/')
    .get(noteController.getNotes)
    .post(noteController.addNote)


router.route('/:id')
    .get(noteController.getNoteById)
//     .delete(noteController.deleteNoteById)





module.exports = router;