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

describe('to test if there are saved notes', () => {
    test('all notes are returned', async() => {
        const response = await api.get(baseUrl)
    
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    test('a specific note is within the returned notes', async () => {
        const response = await api.get(baseUrl)
      
        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
          'Browser can execute only Javascript'
        )
      })
})
describe('viewing specific note', () => {
    test('a valid id should succeed', async() => {
        const response = await api.get(baseUrl)
        const firstBlog = response.body[0]

        const getFirstBlog = await api.get(`${baseUrl}${firstBlog.id}`).expect(200)
        expect(getFirstBlog.body.id).toBe(firstBlog.id)
    })
    test('an invalid id should fail', async () => {
        const invalidID = '241q512zcew'

        const getBlog = await api.get(`${baseUrl}${invalidID}`)
    })
})
describe('addition of new note', () => {
    test('a valid note can be added', async() => {
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
        expect(response.body).toHaveLength(helper.initialNotes.length+1)
        expect(contents).toContain('react is easy')
    })
    test('invalid note should fail', async() => {
        const newNote = {
            important: true
        }
        const addedNote = await api.post(baseUrl).send(newNote).expect(400)
    })
})
describe('deletion of note', () => {
    test('valid note should be deleted' , async () => {
        const response = await api.get(baseUrl)
        const initialNotes = response.body;
        const blogToBeDeleted = initialNotes[0];
    
        const deleteBlog = await api.delete(`${baseUrl}${blogToBeDeleted.id}`).expect(200)
    })
    test('invalid id should not succeed', async () => {
        await api.delete(`${baseUrl}f432f23f32532532`).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})