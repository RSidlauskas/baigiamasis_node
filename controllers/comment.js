const commentDb = require('../models/commentSchema');
const postsDb = require("../models/postSchema");
const rowsCountPerPage = 10;

module.exports = {
    createComment: async (req, res) => {
        const {username} = req.session;
        const {description, post_id, post_owner} = req.body;

        const comment = new commentDb;
        comment.commentOwner = username;
        comment.description = description;
        comment.post_id = post_id
        comment.timeCreated = new Date().toLocaleString('lt-LT');


        try{
            comment.save();
            console.log(post_owner === username)
            if(post_owner === username){
            } else {
                const isntRead = await postsDb.findOneAndUpdate({_id: post_id}, {
                    isRead: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    },
    getPostComments: async (req, res) => {
        const {id, pageIndex} = req.params;
        let skipIndex = 0;
        if (pageIndex > 1) {
            skipIndex = (Number(pageIndex) - 1) * rowsCountPerPage;
        }

        try{
            const comments = await commentDb.find({post_id: id}).skip(skipIndex).limit(rowsCountPerPage)
            const commentsCount = await commentDb.count({post_id: id});

            return res.send({
                error: false,
                postComments: comments,
                postCommentCount: commentsCount,
            });

        } catch (e) {
            console.log(e)
        }
    },
    getPostCommentCount: async (req, res) => {
        const {id} = req.params;
        try {
            const count = await commentDb.count({post_id: id})
            res.send({count})

        } catch (e) {
            console.log(e)
        }
    },
    getUserComments: async (req, res) => {
        const {username} = req.session;
        try {
            const comments = await commentDb.find({commentOwner: username})
            res.send(comments)
        } catch (e) {
            console.log(e)
        }
    }
}