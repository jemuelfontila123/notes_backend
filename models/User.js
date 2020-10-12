const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    password:{
        type: String,
        required: true
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, ret) => {
        ret.id = ret._id.toString();
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    }
})


module.exports = mongoose.model('User', userSchema)