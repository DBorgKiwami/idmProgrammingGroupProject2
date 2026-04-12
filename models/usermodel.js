const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");

const QueryBuilder = require("node-querybuilder")

class UsersModel{
    async getUserById(id) {
        console.log("DBCONFIG", DBCONFIG);
        const connection =  await mysql.createConnection(DBCONFIG);
        try {
            const QUERY = "SELECT * FROM users WHERE user_id = ?";
            const [results, fields] = await connection.query(QUERY, [id]);
          return results;
        } catch (err) {
          return console.error("Pool Query Error: " + err);
        }
      }

      // This finds a user by their username to check their password later
    async findUserByUsername(username) {
        const connection = await mysql.createConnection(DBCONFIG);
        try {
            const QUERY = "SELECT * FROM users WHERE username = ?";
            const [results] = await connection.query(QUERY, [username]);
            return results[0]; // Return the first user found (or undefined)
        } catch (err) {
            return console.error("findUserByUsername Error:" + err);
        } finally {
            await connection.end();
        }
    }
    // This inserts a new user into the database
    async registerUser(username, password) {
        const connection = await mysql.createConnection(DBCONFIG);
        try {
            const QUERY = "INSERT INTO users (username, password) VALUES (?, ?)";
            const [results] = await connection.query(QUERY, [username, password]);
            return results;
        } catch (err) {
            console.error("Register Query Error: " + err);
            throw err;
        } finally {
            await connection.end();
        }
    }
    async updateFavoriteGenre(userId, genreId) {
        const connection = await mysql.createConnection(DBCONFIG);
        try {
            const QUERY = "UPDATE users SET fav_genres = ? WHERE user_id = ?";
            const [results] = await connection.query(QUERY, [genreId, userId]);
            
            console.log(`User ${userId} preference updated to genre ${genreId}`);
            return results;
        } catch (err) {
            return console.error("Update Favorite Genre Error: " + err);
        } finally {
            await connection.end();
        }
    }
}
module.exports = new UsersModel();
