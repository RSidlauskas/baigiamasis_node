const postsDb = require("../models/postSchema")
const rowsCountPerPage = 10;


module.exports = {
    createPost: async (req, res) => {
        const {title, description} = req.body;
        const {username} = req.session;

        const post = new postsDb;
        post.title = title;
        post.description = description;
        post.owner = username;
        post.timeCreated = new Date().toLocaleString('lt-LT');
        post.isRead = true;

        try {
            post.save()
            res.send({error: false, message: "Your topic was created"})
        } catch (e) {
            console.log(e)
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const allPosts = await postsDb.find({})
            res.send(allPosts)
        } catch (e) {
            console.log(e)
        }
    },
    getPagePosts: async (req, res) => {
        const {pageIndex} = req.params;
        let skipIndex = 0;
        if (pageIndex > 1) {
            skipIndex = (Number(pageIndex) - 1) * rowsCountPerPage;
        }

        try {
            const posts = await postsDb.find({}).skip(skipIndex).limit(rowsCountPerPage);
            const allPostsCount = await postsDb.count({});


            return res.send({
                success: true,
                allPosts: posts,
                allPostsCount: allPostsCount,
            });

        } catch (e) {
            console.log(e)
        }
    },
    getSinglePost: async (req, res) => {
        const {id} = req.params
        try {
            const post = await postsDb.findOne({_id: id})
            res.send(post)
        } catch (e) {
            console.log(e)
        }
    },
    getUserPosts: async (req, res) => {
        console.log("get user Posts")
        const {username} = req.session
        try {
            const userPosts = await postsDb.find({owner: username})
            res.send(userPosts)
        } catch (e) {
            console.log(e)
        }
    },
    postToRead: async (req, res) => {
        const {id} = req.params

        try {
            await postsDb.findOneAndUpdate({_id: id}, {
                isRead: true
            })
        } catch (e) {
            console.log(e)
        }

    }
}