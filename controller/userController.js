const User = require('../models/User')
const bcrypt = require('bcrypt')
require('express-async-errors');


exports.getUsers = async(request, response) => {
    const users = await User.find({})
    response.json(users)
}
exports.createUser = async(request, response) => {
    let { username, name, password } = request.body;

    password = await bcrypt(password, 10)

    const user = new User({
        username,
        name,
        password
    })

    const savedUser = await user.save()
    response.json(savedUser)
}