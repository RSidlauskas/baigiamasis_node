const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentOwner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('commentDb', commentSchema)