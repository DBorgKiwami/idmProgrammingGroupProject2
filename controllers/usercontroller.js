const usermodel = require("../models/usermodel");
const postmodel = require("../models/postmodel");

class UserController {
  async getUserById(req, res) {
    console.log(req.params.id);
    const user = await usermodel.getUserById(req.params.id);
    const posts = await postmodel.getPostsByUserId(req.params.id);

    console.log(user[0].username);

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

    if (user && user.password === password) {
        // Simple authentication: save user object to session
        req.session.user = user;
        console.log(user);
        res.redirect("/");
    } else {
        res.render("user/login", { error: "Invalid username or password" });
    }
  }

  //register
  showRegister(req, res) {
    res.render("user/register", { error: null });
  }
  async register(req, res) {
    const { username, password } = req.body;
    try {
        await usermodel.registerUser(username, password);
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
