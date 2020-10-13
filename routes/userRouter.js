const express= require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)

router.post('/login',userController.loginUser)   

router.route('/:id')
    .get(userController.getUser)
module.exports = router;