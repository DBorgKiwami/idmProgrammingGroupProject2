const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const QueryBuilder = require("node-querybuilder")
const outputDirectory = path.join(__dirname, "..", "assets", "uploads");

class LikeModel{
  async checkForLike(post_id, user_id) {
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "SELECT CASE WHEN EXISTS (SELECT * FROM likes WHERE post_id = ? AND user_id = ?) THEN 'TRUE' ELSE 'FALSE' END as liked"
        const [results, fields] = await connection.query(QUERY, [post_id, user_id]);
        return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async removeLike(post_id, user_id){
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "DELETE FROM likes WHERE post_id = ? AND user_id = ?"
        const [results, fields] = await connection.query(QUERY, [post_id, user_id]);
        return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async addLike(post_id, user_id){
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)"
        const [results, fields] = await connection.query(QUERY, [user_id, post_id]);
        return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }
}
module.exports = new LikeModel();
