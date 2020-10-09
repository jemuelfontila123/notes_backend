const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const baseUrl = '/api/notes/'
const Note = require ('../models/Note')
const helper = require ('./notesHelper')
beforeEach(async () => {
    await Note.deleteMany({})
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
    
})


test('all notes are returned', async() => {
    const response = await api.get(baseUrl)

    expect(response.body).toHaveLength(initialNotes.length)
})
test('a specific note is within the returned notes', async () => {
    const response = await api.get(baseUrl)
  
    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
test.only('a valid note can be added', async() => {
    const newNote = {
        content: 'react is easy',
        important: true
    }
    const addedNote = await api.post(baseUrl)
                        .send(newNote)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    const response = await api.get(baseUrl)
    const contents = response.body.map(note => note.content)
    expect(response.body).toHaveLength(initialNotes.length+1)
    expect(contents).toContain('react is easy')
})
afterAll(() => {
    mongoose.connection.close()
})