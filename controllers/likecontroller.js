const likemodel = require("../models/likemodel");

class LikeController {
  async toggleLike(req, res) {
    const like = await likemodel.checkForLike(req.params.id, req.session.user.user_id);
    console.log(req.params.id)
    console.log(req.session.user.user_id)
    console.log(like);
    console.log(like[0].liked)
    let toReturn

    if(like[0].liked == 'TRUE'){
        console.log("beans the whole way down")
        await likemodel.removeLike(req.params.id, req.session.user.user_id)
        toReturn = true
    }
    else{
      await likemodel.addLike(req.params.id, req.session.user.user_id)
      toReturn = false
    }

    res.send(
      {liked : toReturn}
    )    
  }
}

module.exports = new LikeController();
