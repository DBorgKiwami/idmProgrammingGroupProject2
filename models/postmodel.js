const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");

const QueryBuilder = require("node-querybuilder")

class PostModel{
  async getPosts() {
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "SELECT posts.post_id, posts.post_title, posts.post_body, posts.game_id, posts.user_id, posts.post_date, games.game_name, users.username FROM posts INNER JOIN games ON posts.game_id = games.game_id INNER JOIN users ON posts.user_id = users.user_id"
        const [results, fields] = await connection.query(QUERY);
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async getPostsByUserId(id) {
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "SELECT posts.post_id, posts.post_title, posts.post_body, posts.game_id, posts.user_id, posts.post_date, games.game_name, users.username FROM posts INNER JOIN games ON posts.game_id = games.game_id INNER JOIN users ON posts.user_id = users.user_id WHERE posts.user_id = " + id;
        const [results, fields] = await connection.query(QUERY);
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async createPost(title, content, gameid, userid, imagepath){
    console.log("CREATING POST")

    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO `posts`(`post_title`, `post_body`, `game_id`, `user_id`, `image_path`) VALUES ('" + title + "','" + content + "','" + gameid + "','" + userid + "','" + imagepath + "')";
        await connection.query(QUERY);
      return;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }
}
module.exports = new PostModel();
