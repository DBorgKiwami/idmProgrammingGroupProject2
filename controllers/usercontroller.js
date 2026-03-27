const usermodel = require("../models/usermodel");
const postmodel = require("../models/postmodel");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

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
    res.render("user/login", { error: null }); 
  }
  async login(req, res) {
    const { login, password } = req.body; // 'login' matches the name="login" in your EJS
    const user = await usermodel.findUserByUsername(login);

    let isValidPassword = false;
    if (user) {
        if (typeof user.password === "string" && user.password.startsWith("$2")) {
            isValidPassword = await bcrypt.compare(password, user.password);
        } else {
            // Backward compatibility for legacy plaintext records.
            isValidPassword = user.password === password;
        }
    }

    if (user && isValidPassword) {
        // Simple authentication: save user object to session
        req.session.user = user;
        console.log(user);
        res.redirect("/");
    } else {
        res.render("user/login", { error: "Invalid username or password", errorMessage: "Invalid username or password" });
    }
  }

  //register
  showRegister(req, res) {
    res.render("user/register", { error: null });
  }
  async register(req, res) {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await usermodel.registerUser(username, hashedPassword);
        res.redirect("/login");
    } catch (err) {
        res.render("user/register", { error: "Registration failed or username taken" });
    }
  }

  //logout
  logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

module.exports = new UserController();
