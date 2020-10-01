require('./services/dotenv')
const express= require('express')
const middleware = require('./services/middleware')
const app = express()
const cors = require('cors')
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

app.use(cors())
app.use(express.json());
// Notes Router

const noteRouter = require('./routes/noteRouter')
app.use('/api/notes',noteRouter)
app.use(middleware.unknownEndPoint)

app.listen(process.env.PORT)
console.log(`Server running on ${process.env.PORT}`)
