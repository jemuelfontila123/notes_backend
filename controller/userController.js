const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('express-async-errors');


exports.getUsers = async(request, response) => {
    const users = await User.find({})
        .populate('notes')
    response.json(users)
}
exports.createUser = async(request, response) => {
    const { username, name, password } = request.body;

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        password: passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
}
exports.getUser = async(request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user)
}

exports.loginUser = async(request, response) => {
    const {username, password} = request.body;

    const user = await User.findOne({ username })
    const isPasswordCorrect = user === null ? false: await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) throw Error('invalid password or username')
    
    const userToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userToken, process.env.SECRET)
    response.status(200).send({token, username: user.username, name: user.name})
}