const validator = require('email-validator');
const bcrypt = require('bcrypt');
const userDb = require('../models/userSchema');


module.exports = {
    validateRegistrationData: async (req, res, next) => {
        const {username, password_one, password_two} = req.body
        if (username.length < 5 || username.length > 20) {
            return res.send({error: true, message: "Username must be 5 to 20 characters long"})
        }
        if (password_one.length < 5 || password_one.length > 20) {
            return res.send({error: true, message: "Password must be 5 to 20 characters long"})
        }
        if (password_one !== password_two) {
            return res.send({error: true, message: "Both passwords must match"})
        }

        const user = await userDb.findOne({ username : username })
        if (user) {
            return res.send({error: true, message: "This username already exists"})
        }

        next()
    },
    isLoggedIn: async (req, res, next) => {
        console.log(req.session.username)
        if(!req.session.username) {
            res.send({error: true, message: "Please log in or refresh the page"})
        } else {
            next();
        }
    },
    validateLogin: async (req, res, next) => {
        const {username} = req.body
        if(await userDb.findOne({username: username})){
            next();
        }
    }
}