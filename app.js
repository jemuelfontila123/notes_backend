const config = require('./services/config')
const mongoose = require('mongoose')
const express= require('express')
const middleware = require('./services/middleware')
const cors = require('cors')
const app = express()
const noteRouter = require('./routes/noteRouter')
// connectDB.connect()
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log(`error connecting to mongodb: ${error.message}`)
    })
app.use(cors())
app.use(express.json());

app.use('/api/notes',noteRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app;