const DBCONFIG = require("../config/dbconfig");
const mysql = require("mysql2/promise");

const QueryBuilder = require("node-querybuilder")

class UsersModel{
    async getUserById(id) {
        console.log("DBCONFIG", DBCONFIG);
        const connection =  await mysql.createConnection(DBCONFIG);
        try {
            const QUERY = "SELECT * FROM users WHERE user_id = " + id;
            const [results, fields] = await connection.query(QUERY);
          return results;
        } catch (err) {
          return console.error("Pool Query Error: " + err);
        }
      }
  }
module.exports = new UsersModel();
