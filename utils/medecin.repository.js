// utils/medecin.repository.js

pool = require("../utils/db.js");

module.exports = {

    async getOneMedecin(email) {
      try {
        conn = await pool.getConnection()
        sql = "SELECT * FROM ProfessionnelDeSante INNER JOIN utilisateur USING (email) WHERE email = ?;"
        const rows = await conn.query(sql,email)
        conn.end()
        console.log("ROWS FETCHED: " + rows.length)
        if (rows.length == 1){
          return rows[0]
        }else{
          return false
        }
    } catch (err) {
        console.log(err)
        throw err
    }
  },

  async updateMedecin( email, nom_pro, prenom_pro,profession) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE ProfessionnelDeSante SET nom_pro=?, prenom_pro=?, proffession=? WHERE email=?";
      const okPacket = await conn.query(sql, 
            [nom_pro, prenom_pro,profession, email]);
      conn.end();
      console.log(okPacket); 
      return okPacket.affectedRows; 
    } catch (err) {
      throw err;
    }
},

}
    