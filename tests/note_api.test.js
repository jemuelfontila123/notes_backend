const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const baseUrl = '/api/notes/'

test('notes are returned as json', async () => {
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
test('there is only one note', async () => {
    const response = await api.get(baseUrl)
    expect(response.body).toHaveLength(1)
        
})
afterAll(() => {
    mongoose.connection.close()
})