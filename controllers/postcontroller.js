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
    console.log(req.files.image)
    //title, content, gameid, userid, imagepath
    if (!req.files || req.files.length === 0) {
      const posts = await postmodel.createPost(req.body.title, req.body.content, req.body.game, req.body.user)
    }
    else{
      const posts = await postmodel.createPostWithImage(req.body.title, req.body.content, req.body.game, req.body.user, req.files.image)
    }

    res.render("createpost/", {
    });
  }
}

module.exports = new PostsController();
