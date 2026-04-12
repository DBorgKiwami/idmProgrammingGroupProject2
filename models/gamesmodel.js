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

  async getGamesSearch(name) {
    console.log("DBCONFIG", DBCONFIG);
    const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
    let qb;
    try {
      qb = await pool.get_connection();
      const results = await qb.limit(10).select("*").like("game_name", "%" + name + "%").get("games"); //SELECT * FROM GAMES WHERE NAME LIKE %name% LIMIT 10
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    } finally {
      if (qb) qb.release();
    }
  }

  async getAllGenres() {
    console.log("DBCONFIG", DBCONFIG);
    const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
    let qb;
    try {
      qb = await pool.get_connection();
      const results = await qb.select("*").get("genre"); 
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    } finally {
      if (qb) qb.release();
    }
  }
  async getGenreById(genreId) {
    const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
    let qb;
    try {
      qb = await pool.get_connection();
      const result = await qb.select("*").where("genre_id", genreId).get("genre");
      return result[0];
    } catch (err) {
      console.error("Pool Query Error: " + err);
      return null;
    } finally {
      if (qb) qb.release();
    }
  }

  
}
module.exports = new GamesModel();
