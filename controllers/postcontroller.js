const postmodel = require("../models/postmodel");
const qs = require("querystring");

class PostsController {
  async getPosts(req, res) {
    const posts = await postmodel.getPosts();

    console.log(posts)

    //You can now send these records to your template
    res.render("home/", {
        popularPosts : posts
    });
  }

  async createPostPage(req, res){
     res.render("createpost/", {

    });
  }

  async createPost(req, res){
    console.log("Big Beans 10")
    console.log(req.body.title)
    //title, content, gameid, userid, imagepath

    const posts = await postmodel.createPost(req.body.title, req.body.content, req.body.game, req.body.user, null)
    res.render("createpost/", {
    });
  }
}

module.exports = new PostsController();
