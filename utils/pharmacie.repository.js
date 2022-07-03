// utils/pharmacie.repository.js

pool = require("../utils/db.js");

module.exports = {

  async getOnePharma(email) {
    try {
      conn = await pool.getConnection()
      sql = "SELECT * FROM Pharmacie INNER JOIN utilisateur USING (email) WHERE email = ?;"
      const rows = await conn.query(sql, email)
      conn.end()
      //console.log("ROWS FETCHED: " + rows.length)
      if (rows.length == 1) {
        return rows[0]
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  async updatePharmacie(email, nom_pharmacie, numero_telephone) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE Pharmacie SET nom_pharmacie=?, numero_telephone=? WHERE email=?;";
      const okPacket = await conn.query(sql,[nom_pharmacie, numero_telephone, email]);
      conn.end();
      //console.log(okPacket);
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  }

  

  
}