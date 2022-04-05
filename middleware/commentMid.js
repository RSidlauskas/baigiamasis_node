
module.exports = {
    commentValidate: async (req, res, next) => {
        const {description} = req.body
        if (description.length === 0) {
            return res.send({error: true, message: "You can't send empty comments"})
        }
        if (description.length < 10) {
            return res.send({error: true, message: "Your comment is too short"})
        }
        if (description.length > 1000) {
            return res.send({error: true, message: "Your comment is too long"})
        }
        next()
    },
}