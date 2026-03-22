const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const QueryBuilder = require("node-querybuilder")
const outputDirectory = path.join(__dirname, "..", "assets", "uploads");

class CommentModel{
  async getCommentsOnPost(id) {
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "SELECT comments.comment_id, comments.content, comments.user_id, comments.post_id, comments.comment_date, users.username FROM `comments` INNER JOIN users on comments.user_id = users.user_id WHERE comments.post_id = ?";
        const [results, fields] = await connection.query(QUERY,[id]);
        return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async createComment(content, user_id, post_id){
    console.log("CREATING COMMENT")

    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO `comments`(`content`, `user_id`, `post_id`) VALUES (?, ?, ?)";
        await connection.query(QUERY,[content, user_id, post_id]);
      return;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }
}
module.exports = new CommentModel();
