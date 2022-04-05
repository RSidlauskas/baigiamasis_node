const validator = require('email-validator');
const bcrypt = require('bcrypt');
const userDb = require('../models/userSchema');


module.exports = {
    postValidation: async (req, res, next) => {
        const {title, description} = req.body
        if (title.length < 10 || title.length > 50) {
            return res.send({error: true, message: "Title must be 10 to 50 characters long"})
        }
        if (description.length < 10) {
            return res.send({error: true, message: "Please add additional information to your post description"})
        }
        next()
    },
}