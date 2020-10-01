const { body, validationResult } = require('express-validator');

const Note = require('../models/Note')

exports.getNotes= (req, res) => {
    Note.find({})
      .then(result => res.json(result))
}
exports.getNoteById = (req, res) => {
    Note.findById(req.params.id)
    .then(result => res.json(result))
    // res.status(400).end()
}
// exports.deleteNoteById = (req, res) => {
//   const id = Number(req.params.id)
//   notes = notes.filter(note => note.id !== id)
//   res.json(notes)
//   //res.status(204).end()
// }


exports.addNote = [
    // must not be empty
    body('content').isLength({ min: 1})
    ,(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {content} = req.body;
    const note = new Note({
      content: content,
      date: new Date(),
      important: false
    })
   note.save()
   .then( result => {
     res.json(result)
   })
   
  
}]



