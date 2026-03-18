const express = require("express");

const gamescontroller = require("../controllers/gamescontroller");
const postcontroller = require("../controllers/postcontroller");
const usercontroller = require("../controllers/usercontroller");

const router = express.Router();

router.get("/homepage", gamescontroller.getGames);

router.get("/", postcontroller.getPosts);

router.get("/user/:id", usercontroller.getUserById);

router.get("/post", postcontroller.createPostPage);

router.get("/sendpost", postcontroller.createPost);

module.exports = router;