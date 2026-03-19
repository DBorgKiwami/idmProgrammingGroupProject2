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
  
  async getGamesSearch(req, res) {
    console.log(req.params.name)
    const games = await gamesmodel.getGamesSearch(req.params.name);

    res.send(games)
  }
}

module.exports = new GamesController();
