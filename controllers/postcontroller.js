const postmodel = require("../models/postmodel");
const gamesmodel = require("../models/gamesmodel");
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
    let relevantposts = [];
    let favGenreDetails = null;
    if (req.session.user && req.session.user.fav_genres) {
        const favId = req.session.user.fav_genres;
        relevantposts = await postmodel.getPostsByGameGenre(favId) || [];
        favGenreDetails = await gamesmodel.getGenreById(favId);
    }
    console.log("Recommended Posts:", relevantposts);
    res.render("home/", {
        popularPosts : allposts,
        genrePosts : relevantposts,
        genreInfo: favGenreDetails,
        user: req.session.user
    });
  }

  async createPostPage(req, res){
     res.render("createpost/", {
      errormessage: null
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
      res.redirect("/");
    }
    else{
      try{
        const posts = await postmodel.createPostWithImage(req.body.title, req.body.content, req.body.game, req.session.user.user_id, req.files.image)
        res.redirect("/");
      }
      catch(err){
        console.log("Image Uploading is Disabled on the College Server")
        res.render("createpost/", {
          errormessage: "Image uploading disabled on college server."
        });
      }
    }

    
  }
}

module.exports = new PostsController();
