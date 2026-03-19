const express = require("express");
const bodyparser = require("body-parser");

const gamescontroller = require("../controllers/gamescontroller");
const postcontroller = require("../controllers/postcontroller");
const usercontroller = require("../controllers/usercontroller");
const testcontroller = require("../controllers/testcontroller");

const router = express.Router();

router.get("/homepage", gamescontroller.getGames);

router.get("/", postcontroller.getPosts);

router.get("/user/:id", usercontroller.getUserById);

router.get("/post", postcontroller.createPostPage);

router.get("/sendpost", postcontroller.createPost);

router.get("/test", (req, res) => {res.render("testpost/")})

router.post("/test", testcontroller.getPostData);

module.exports = router;