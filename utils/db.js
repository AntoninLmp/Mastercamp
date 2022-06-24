const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

module.exports = {
  getConnection() {
    return new Promise(function (result, reject) {
      pool.getConnection()
        .then(function (conn) {
          result(conn);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
};