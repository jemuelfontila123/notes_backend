const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
require('express-async-errors');

exports.getNotes= async (req, res) => {
    const savedNotes = await Note.find({})
    res.json(savedNotes)
}
exports.getNoteById = async (req, res) => {
    const givenNote = await Note.findById(req.params.id)
    if(!givenNote) throw Error('invalid id')
    res.json(givenNote)
}
exports.deleteNoteById = async (req, res) => {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) throw Error('invalid id')
    res.status(200).end()
}

exports.addNote = [
    // must not be empty
    body('content').isLength({ min: 1})
    ,async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {content} = req.body;
    const note = new Note({
      content,
      date: new Date(),
      important: false
    })
    let savedNote = await note.save()
    res.json(savedNote)
}]



