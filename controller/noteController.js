const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('express-async-errors');

exports.getNotes= async (req, res) => {
    const savedNotes = await Note.find({})
      .populate('user',{ username:1, name:1 })
    res.json(savedNotes)
}
exports.getNoteById = async (req, res) => {
    const givenNote = await Note.findById(req.params.id)
      .populate('user', { username:1, name:1 })
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
    body('content').isLength({ min: 5})
    ,async (req, res, next) => {
    const errors = validationResult(req);
    const decodedToken = jwt.verify(res.token, process.env.SECRET)
    if (!errors.isEmpty()) { throw (errors)}
    if (!decodedToken) { throw Error('token missing or invalid')}

    const { content } = req.body;
    const user = await User.findById(decodedToken.id)
    const note = new Note({
      content,
      date: new Date(),
      important: false,
      user: decodedToken.id
    })
    let savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save();
    res.json(savedNote)

}]



