const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, ret) => {
        ret.id = ret._id.toString();
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    }
})


module.exports = mongoose.model('User', userSchema)