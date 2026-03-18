const usermodel = require("../models/usermodel");
const postmodel = require("../models/postmodel");

class UserController {
  async getUserById(req, res) {
    console.log(req.params.id);
    const user = await usermodel.getUserById(req.params.id);
    const posts = await postmodel.getPostsByUserId(req.params.id);

    console.log(user[0].username);

    //You can now send these records to your template
    res.render("user/", {
        userInfo : user,
        userPosts : posts
    });
  }
}

module.exports = new UserController();
