const gamesmodel = require("../models/gamesmodel");

class GamesController {
  async getGames(req, res) {
    const games = await gamesmodel.getGames();
    console.log("games", games);

    //You can now send these records to your template
    res.render("games/", {
        popularPosts : games,
        userPosts : games
    });
  }
}

module.exports = new GamesController();
