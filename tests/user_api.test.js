const app = require ('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)
const User = require('../models/User')
const baseUrl = '/api/users/'
const bcrypt = require('bcrypt')
beforeEach(async () => {
    await User.deleteMany({})
    const password = await bcrypt.hash('secret', 10);
    const user = {
        username: 'root',
        name: 'jemuel',
        password
    }
    const newUser = new User(user)
    await newUser.save();
})

describe('to check the saved users', () => {
    test('getting the only user', async() => {
        const users = await api.get(baseUrl)
            .expect(200)
    })
})

describe('adding of user' , () => {
    test('a valid user should succeed', async() => {
        const password = bcrypt.hash('tite', 10)
        const user = {
            username: 'beer',
            name: 'jemuel',
            password
        }
        const response = await api.post(baseUrl).send(user).expect(200)
        expect(response.body.username).toBe('beer')
    })
})


afterAll(() => {
    mongoose.connection.close()
})