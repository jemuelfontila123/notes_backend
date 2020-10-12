const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const notesUrl = '/api/notes/'
const usersUrl = '/api/users/'
const Note = require ('../models/Note')
const User = require('../models/User')
const helper = require ('./notesHelper')
let testId;

beforeEach(async () => {
    await Note.deleteMany({})
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
    await User.deleteMany({})
    const password = await bcrypt.hash('secret', 10);
    const user = {
        username: 'root',
        name: 'jemuel',
        password
    }
    const newUser = new User(user)
    const savedUser = await newUser.save();
    testId = savedUser._id;
})

describe('to test if there are saved notes', () => {
    test('all notes are returned', async() => {
        const response = await api.get(notesUrl)
    
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    test('a specific note is within the returned notes', async () => {
        const response = await api.get(notesUrl)
      
        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
          'Browser can execute only Javascript'
        )
      })
})
describe('viewing specific note', () => {
    test('a valid id should succeed', async() => {
        const response = await api.get(notesUrl)
        const firstBlog = response.body[0]

        const getFirstBlog = await api.get(`${notesUrl}${firstBlog.id}`).expect(200)
        expect(getFirstBlog.body.id).toBe(firstBlog.id)
    })
    test('an invalid id should fail', async () => {
        const invalidID = '241q512zcew'

        const getBlog = await api.get(`${notesUrl}${invalidID}`)
    })
})
describe('addition of new note', () => {
    test.only('a valid note can be added with valid user', async() => {
        const newNote = {
            content: 'react is easy',
            userId: testId
        }
        const addedNote = await api.post(notesUrl).send(newNote)
        const user = await api.get(`${usersUrl}${testId}`)
        const note = await api.get(`${notesUrl}${addedNote.body.id}`)
        expect(user.body.username).toBe(note.body.user.username)
    })
    test('invalid note should fail', async() => {
        const newNote = {
            important: true
        }
        const addedNote = await api.post(notesUrl).send(newNote).expect(400)
    })
})
describe('deletion of note', () => {
    
    test('valid note should be deleted' , async () => {
        const response = await api.get(notesUrl)
        const initialNotes = response.body;
        const noteToBeDeleted = initialNotes[0];
        await api.delete(`${notesUrl}${noteToBeDeleted.id}`).expect(200)
    })
    test('invalid id should not succeed', async () => {
        await api.delete(`${notesUrl}f432f23f32532532`).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})