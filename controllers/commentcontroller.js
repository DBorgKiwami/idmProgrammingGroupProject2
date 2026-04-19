const commentmodel = require("../models/commentmodel");

class CommentController {
  async getCommentsByPostId(req, res){
    console.log("Comment Controller Called to Retrieve comments on a post")
    console.log(req.params.id)
    const comments = await commentmodel.getCommentsOnPost(req.params.id)

    res.send(comments);
  }

  async createComment(req, res){
    console.log("Comment Controller Called to Create Comment")
    console.log(req.params.id)
    console.log(req.body.content)
    console.log(req.session.user)
    console.log(req.session.user.user_id)
    await commentmodel.createComment(req.body.content, req.session.user.user_id, req.params.id);
    const acceptsJson = req.get("accept") && req.get("accept").includes("application/json");
    const requestedWith = req.get("x-requested-with") === "XMLHttpRequest";

    if (acceptsJson || requestedWith) {
      return res.status(201).send({ success: true });
    }

    res.redirect("/");
  }
}

module.exports = new CommentController();
