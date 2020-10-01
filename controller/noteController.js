const index = require('../index')
const { body, validationResult } = require('express-validator');

let notes = index.notes;
exports.getNotes= (req, res) => {
    res.json(notes)
}
exports.getNoteById = (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === parseInt(id))
    if(note)
        res.json(note)
    res.status(404).end()
}
exports.deleteNoteById = (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.json(notes)
  //res.status(204).end()
}
// exports.addNote = (req, res) => {
//     const note = req.body;
//     if(!note.content){
//         return res.status(400).json({error: 'content missing'})
//     }
//     note.id = notes.length === 0 ? 0 : notes.length + 1;
//     notes = notes.concat(note)
//     res.json(notes)
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
    const note = req.body;
    note.id = notes.length === 0 ? 0 : notes.length + 1;
    notes = notes.concat(note)
    res.json(notes)
  
}]



