const commentmodel = require("../models/commentmodel");
const qs = require("querystring");

class CommentController {
  async createComment(req, res){
    console.log("Big Beans 10")
    console.log(req.params.id)
    console.log(req.body.content)
    console.log(req.session.user)
    console.log(req.session.user.user_id)
    const comment = await commentmodel.createComment(req.body.content,req.session.user.user_id,req.params.id)

    res.redirect("/");
  }
}

module.exports = new CommentController();
