const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const QueryBuilder = require("node-querybuilder")
const outputDirectory = path.join(__dirname, "..", "assets", "uploads");

class PostModel{
  async getPosts() {
    console.log("DBCONFIG", DBCONFIG);
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "SELECT posts.post_id, posts.post_title, posts.post_body, posts.game_id, posts.user_id, posts.post_date, posts.image_path, games.game_name, users.username, COALESCE(x.cnt,0) as like_count FROM posts INNER JOIN games ON posts.game_id = games.game_id INNER JOIN users ON posts.user_id = users.user_id LEFT OUTER JOIN (SELECT post_id, count(*) cnt FROM likes GROUP BY post_id) x ON posts.post_id = x.post_id ORDER BY posts.post_date DESC"
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
        const QUERY = "SELECT posts.post_id, posts.post_title, posts.post_body, posts.game_id, posts.user_id, posts.post_date, games.game_name, users.username FROM posts INNER JOIN games ON posts.game_id = games.game_id INNER JOIN users ON posts.user_id = users.user_id WHERE posts.user_id = ? ORDER BY posts.post_date DESC";
        const [results, fields] = await connection.query(QUERY, [id]);
      return results;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async createPost(title, content, gameid, userid){
    console.log("CREATING POST")

    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO `posts`(`post_title`, `post_body`, `game_id`, `user_id`) VALUES (?, ?, ?, ?)";
        await connection.query(QUERY,[title, content, gameid, userid]);
      return;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }

  async createPostWithImage(title, content, gameid, userid, image){
    console.log("CREATING POST WITH IMAGE")

    const filename = crypto.randomUUID() + ".webp";
    const outputPath = path.join(outputDirectory, filename);

    console.log(image.data)

    await sharp(image.data)
		.rotate()
		.resize({
			width: 1600,
			height: 1600,
			fit: "inside",
			withoutEnlargement: true,
		})
		.webp({ quality: 78 })
		.toFile(outputPath);
    console.log(title, content, gameid, userid, image, filename)
    const connection =  await mysql.createConnection(DBCONFIG);
    try {
        const QUERY = "INSERT INTO `posts`(`post_title`, `post_body`, `game_id`, `user_id`, `image_path`) VALUES (?, ?, ?, ?, ?)";
        await connection.query(QUERY, [title, content, gameid, userid, filename]);
      return;
    } catch (err) {
      return console.error("Pool Query Error: " + err);
    }
  }
}
module.exports = new PostModel();
