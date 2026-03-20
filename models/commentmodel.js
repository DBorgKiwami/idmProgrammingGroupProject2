const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const QueryBuilder = require("node-querybuilder")
const outputDirectory = path.join(__dirname, "..", "assets", "uploads");

class CommentModel{
  async getCommentsOnPost(id) {
    console.log("DBCONFIG", DBCONFIG);
    const pool = new QueryBuilder(DBCONFIG, "mysql", "pool");
    let qb;
    try {
      qb = await pool.get_connection();
      const results = await qb.select("*").where('post_id',id).get("comments");
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    } finally {
      if (qb) qb.release();
    }
  }

  async createComment(content, user_id, post_id){
    console.log("CREATING COMMENT")

    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO `comments`(`content`, `user_id`, `post_id`) VALUES ('" + content + "','" + user_id + "','" + post_id + "')";
        await connection.query(QUERY);
      return;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }
}
module.exports = new CommentModel();
