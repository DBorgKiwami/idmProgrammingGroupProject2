const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");

const QueryBuilder = require("node-querybuilder")

class GamesModel{
  async getGames() {
    console.log("DBCONFIG", DBCONFIG);
    const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
    let qb;
    try {
      qb = await pool.get_connection();
      const results = await qb.select("*").get("games"); //SELECT * FROM GAMES
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    } finally {
      if (qb) qb.release();
    }
  }
}
module.exports = new GamesModel();
