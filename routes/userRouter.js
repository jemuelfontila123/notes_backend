const express= require('express')
const router = express.Router()
const userController = require('../controller/userController')
router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers)

// router.route('/:id')
//     .delete()
//     .get()
module.exports = router;