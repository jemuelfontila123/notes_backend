const { body, validationResult } = require('express-validator');

const Note = require('../models/Note')

exports.getNotes= async (req, res) => {
  try{
    const savedNotes = await Note.find({})
    res.json(savedNotes)
  }catch(erorr){
    next(error)
  }
}
exports.getNoteById = async (req, res, next) => {
  try{
    const givenNote = await Note.findById(req.params.id)
    res.json(givenNote)
  }catch(error){
    next(error)
  }
}
exports.deleteNoteById = async (req, res) => {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    res.status(200).end()
  }catch(error){
    next(error)
  }
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
    try{
      let savedNote = await note.save()
      res.json(savedNote)
    }catch(error){
      next(error)
    }
}]



