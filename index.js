require('./services/dotenv')
const http = require('http')
const express= require('express')
const app = express()

exports.notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

// Notes Router
const noteRouter = require('./routes/noteRouter')
app.use('/',noteRouter)

app.listen(process.env.PORT)
console.log(`Server running on ${process.env.PORT}`)
