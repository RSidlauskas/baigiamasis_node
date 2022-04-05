const bcrypt = require('bcrypt');
const userDb = require('../models/userSchema')

module.exports = {
    register: async (req, res) => {
        const {username, password_one} = req.body

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password_one, salt);

        const user = new userDb;
        user.username = username;
        user.password = hashedPassword;
        user.memberSince = new Date().toLocaleString('lt-LT');

        try{
            user.save();
            return res.send({error: false, message: "User registered successfully"})
        } catch (e) {
            console.log(e)
        }

    },
    login: async (req, res) => {
        const {username, password} = req.body
        const currentUser = await userDb.findOne({username: username})
        const passValidation = await bcrypt.compare(password, currentUser.password);
        if(passValidation){
            req.session.username = username
            const user = await userDb.findOne({username: username}).select("-password")
            return res.send({user, error: false})
        } else {
            return res.send({error: true, message: "Incorrect credentials"})
        }
    },
    autoLogIn: async(req, res) => {
        const {username} = req.session
        try{
            const user = await userDb.findOne({username: username}).select("-passwoord")
            res.send(user)
        } catch (e) {
            console.log(e)
        }
    },
    getUserByUsername: async (req, res) => {
        const {username} = req.body
        const user = await userDb.findOne({username: username}).select("-password")
        res.send(user)
    },
    changePhoto: async (req, res) => {
        const {imageUrl} = req.body
        const {username} = req.session

        if(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)){
            try {
                const update = await userDb.findOneAndUpdate({username: username}, {profileImage: imageUrl})
                const updated = await userDb.findOne({username: username})
                return res.send({error: false, message: "Picture updated succesefully", updated})
            } catch (e) {
                console.log(e)
            }
        } else{
            return res.send({error: true, message: "Please try another picture link"})
        }

    }
}