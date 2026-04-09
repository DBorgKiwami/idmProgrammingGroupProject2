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

  async getPostsByGenre(req, res) {
    const posts = await postmodel.getPostsByGameGenre(req.session.genre)

    console.log(posts)

    res.render("home/", {
        popularPosts : posts
    });
  }

  async getHomepage(req, res){
    const allposts = await postmodel.getPosts();
    var relevantposts = null
    if(req.session.user){
      relevantposts = await postmodel.getPostsByGameGenre(req.session.genre)
    }

    console.log(relevantposts)

    //You can now send these records to your template
    res.render("home/", {
        popularPosts : allposts,
        genrePosts : relevantposts
    });
  }

  async createPostPage(req, res){
     res.render("createpost/", {

    });
  }

  async createPost(req, res){
    console.log("Big Beans 10")
    console.log(req.body)
    console.log(req.session.user)
    console.log(req.session.user.user_id)
    //title, content, gameid, userid, imagepath
    if (!req.files || req.files.length === 0) {
      const posts = await postmodel.createPost(req.body.title, req.body.content, req.body.game, req.session.user.user_id)
    }
    else{
      const posts = await postmodel.createPostWithImage(req.body.title, req.body.content, req.body.game, req.session.user.user_id, req.files.image)
    }

    res.redirect("/");
  }
}

module.exports = new PostsController();
