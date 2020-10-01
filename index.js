require('./services/dotenv')
const mongoose = require('mongoose')
const express= require('express')
const middleware = require('./services/middleware')
const cors = require('cors')
const app = express()

// connectDB.connect()
mongoose.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

app.use(cors())
app.use(express.json());
// Notes Router

const noteRouter = require('./routes/noteRouter')
app.use('/api/notes',noteRouter)
app.use(middleware.unknownEndPoint)


app.listen(process.env.PORT)
console.log(`Server running on ${process.env.PORT}`)
