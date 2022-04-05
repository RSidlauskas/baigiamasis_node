const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true,
        default: 'https://gladstoneentertainment.com/wp-content/uploads/2018/05/avatar-placeholder.gif',
    },
    password: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('userDb', userSchema)