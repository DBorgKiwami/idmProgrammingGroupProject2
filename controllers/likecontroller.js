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
        toReturn = await likemodel.removeLike(req.params.id, req.session.user.user_id)
    }
    else{
        toReturn = await likemodel.addLike(req.params.id, req.session.user.user_id)
    }
  }
}

module.exports = new LikeController();
