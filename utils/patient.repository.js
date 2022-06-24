// utils/patient.repository.js

pool = require("../utils/db.js");

module.exports = {

    async getOnePatient(email) {
      try {
        conn = await pool.getConnection()
        sql = "SELECT * FROM patients INNER JOIN utilisateur USING (email) WHERE email = ?;"
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

  async updatePatient( email, nom_pat, prenom_pat, adresse_pat, ville_pat, code_postal_pat, numero_tel) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE patients SET nom_pat=?, prenom_pat=?, adresse_pat=?, ville_pat=?, code_postal_pat= ?, numero_telephone_pat = ? WHERE email=?";
      const okPacket = await conn.query(sql, 
            [nom_pat, prenom_pat, adresse_pat, ville_pat, code_postal_pat, numero_tel, email]);
      conn.end();
      console.log(okPacket); 
      return okPacket.affectedRows; 
    } catch (err) {
      throw err;
    }
},

}
    