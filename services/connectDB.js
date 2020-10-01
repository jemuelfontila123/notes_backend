require('./dotenv')
const mongoose = require('mongoose')


exports.connect = () => {mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.zq5cl.mongodb.net/fullstack.notes?retryWrites=true&w=majority
`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
}