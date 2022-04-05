const express = require("express");
const router = express.Router();

const userMid = require("../middleware/userMid")
const postsMid = require("../middleware/postsMid")
const commentMid = require("../middleware/commentMid")

const user = require("../controllers/user")
const posts = require("../controllers/posts")
const comment = require("../controllers/comment")

router.get("/autoLogIn", userMid.isLoggedIn , user.autoLogIn)
router.get("/getUserPosts", userMid.isLoggedIn ,posts.getUserPosts)
router.get("/getAllPosts", posts.getAllPosts)
router.get("/postToRead/:id", posts.postToRead)
router.get("/getPagePosts/:pageIndex", posts.getPagePosts)
router.get("/getSinglePost/:id", posts.getSinglePost)
router.get("/getPostComments/:id/:pageIndex", comment.getPostComments)
router.get("/getUserComments", userMid.isLoggedIn, comment.getUserComments)
router.get("/getPostCommentCount/:id", comment.getPostCommentCount)


router.post("/register", userMid.validateRegistrationData, user.register)
router.post("/login", userMid.validateLogin ,user.login)
router.post("/updatePicture", userMid.isLoggedIn, user.changePhoto)
router.post("/getUserByUsername", user.getUserByUsername)
router.post("/createPost", userMid.isLoggedIn, postsMid.postValidation ,posts.createPost)
router.post("/createComment", userMid.isLoggedIn, commentMid.commentValidate , comment.createComment)

module.exports = router;
