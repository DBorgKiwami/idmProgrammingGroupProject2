const usermodel = require("../models/usermodel");
const postmodel = require("../models/postmodel");
const gamesmodel = require("../models/gamesmodel");
const bcrypt = require("bcrypt");

const SALT = 10;

class UserController {
  async getUserById(req, res) {
    console.log(req.params.id);
    const user = await usermodel.getUserById(req.params.id);
    const posts = await postmodel.getPostsByUserId(req.params.id);

    console.log(user);

    //You can now send these records to your template
    res.render("user/index", {
        userInfo : user,
        userPosts : posts
    });
  }

  
  //login
  showLogin(req, res) {
    const successMessage = req.query.registered ? "Registration successful. Please log in." : null;
    res.render("user/login", { errorMessage: null, successMessage }); 
  }

  async login(req, res) {
    const { login, password } = req.body; // 'login' matches the name="login" in your EJS
    const user = await usermodel.findUserByUsername(login);

    if (user && (await bcrypt.compare(password, user.password))) {
        // Simple authentication: save user object to session
        req.session.user = user;
        //fav_genres
        if (!user.fav_genres) {
            console.log("New user, redirecting to selection page...");
            return res.redirect("/select-genre"); 
        }
        res.redirect("/"); 
    } else {
        res.render("user/login", { errorMessage: "Invalid username or password", successMessage: null });
    }
  }

  async userAuthentication(req, res){
    const username = req.session.user.username;
    const user = await usermodel.findUserByUsername(username);

    if (req.session.user.password === user.password) {
      return true;
    } else {
      return false;
    }
  }

  //register
  showRegister(req, res) {
    res.render("user/register", { error: null });
  }
  async register(req, res) {
    const { username, password } = req.body;
    try {
        const acpassword = await bcrypt.hash(password, SALT);
        await usermodel.registerUser(username, acpassword);
        res.redirect("/login?registered=1");
    } catch (err) {
        res.render("user/register", { error: "Registration failed or username taken" });
    }
  }

  // chose fav_genre
async showGenreSelection(req, res) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const allGenres = await gamesmodel.getAllGenres(); 
    res.render("user/select_genre", { genres: allGenres });
}

async saveFavoriteGenre(req, res) {
    const { genreId } = req.body; //genreID for ejs
    const userId = req.session.user.user_id;

    try {
        await usermodel.updateFavoriteGenre(userId, genreId);
        req.session.user.fav_genres = genreId;

        console.log(`User ${userId} selected favorite genre: ${genreId}`);
        res.redirect("/"); 
    } catch (err) {
        console.error(err);
        res.redirect("/select-genre");
    }
}

  //logout
  logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

module.exports = new UserController();
