const express = require("express");
const bodyparser = require("body-parser");

const gamescontroller = require("../controllers/gamescontroller");
const postcontroller = require("../controllers/postcontroller");
const usercontroller = require("../controllers/usercontroller");
const commentcontroller = require("../controllers/commentcontroller");
const testcontroller = require("../controllers/testcontroller");
const likecontroller = require("../controllers/likecontroller");

const router = express.Router();

// router.get("/homepage", gamescontroller.getGames);

// router.get("/", postcontroller.getPosts);

// router.get("/user/:id", usercontroller.getUserById);

// router.get("/post", postcontroller.createPostPage);

// router.get("/sendpost", postcontroller.createPost);

// router.get("/test", (req, res) => {res.render("testpost/")})

// router.post("/test", testcontroller.getPostData);

// Only restricts access to specific actions like creating a post
function ensureAuthenticated(req, res, next) {
    console.log(req.session)
    if (req.session && req.session.user && usercontroller.userAuthentication(req, res)) {
        return next();
    }
    res.redirect("/login");
}

// --- ORIGINAL ROUTES (Keep them as they were) ---
router.get("/games", gamescontroller.getGames);

router.get("/", postcontroller.getPosts);

router.get("/user/:id", usercontroller.getUserById);

// Add Login & Signup
// Show Login/Register pages
router.get("/login", usercontroller.showLogin);
router.get("/register", usercontroller.showRegister);

// Handle Form Submissions
router.post("/login", usercontroller.login);
router.post("/register", usercontroller.register);
router.post("/logout", usercontroller.logout);

// Now users must be logged in to access these
router.get("/post", ensureAuthenticated, postcontroller.createPostPage);
router.post("/sendpost", ensureAuthenticated, postcontroller.createPost);
router.post("/comment/:id", ensureAuthenticated, commentcontroller.createComment);
router.get("/likepost/:id", ensureAuthenticated, likecontroller.toggleLike);

router.get("/gamesearchquery/:name", gamescontroller.getGamesSearch);
router.get("/postcomments/:id", commentcontroller.getCommentsByPostId);

router.get("/test", (req, res) => { res.render("testpost/") });

router.post("/test", testcontroller.getPostData);

module.exports = router;
