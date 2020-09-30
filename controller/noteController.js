const index = require('../index')
const notes = index.notes;
exports.getNotes= (req, res) => {
    res.json(notes)
}
exports.getNoteById = (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === parseInt(id))
    res.json(note)
}


