const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('postsDb', postSchema)