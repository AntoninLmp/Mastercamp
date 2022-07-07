// utils/patient.repository.js

pool = require("../utils/db.js");

module.exports = {

  //GET Patient 
    async getOnePatient(email) {
      try {
        conn = await pool.getConnection()
        sql = "SELECT * FROM patients INNER JOIN utilisateur USING (email) WHERE email = ?;"
        const rows = await conn.query(sql,email)
        conn.end()
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

  async getOnePatientById(IdPatient) {
    try {
      conn = await pool.getConnection()
      sql = "SELECT * FROM patients INNER JOIN utilisateur USING (email) WHERE id_patient = ?;"
      const rows = await conn.query(sql,IdPatient)
      conn.end()
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

async getOnePatientByNumSecu(NumSecu) {
  try {
    conn = await pool.getConnection()
    sql = "SELECT * FROM patients INNER JOIN utilisateur USING (email) WHERE numero_sercurite = ?;"
    const rows = await conn.query(sql,NumSecu)
    conn.end()
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

// UPDATE Patient
async updatePatient( email, nom_pat, prenom_pat, adresse_pat, ville_pat, code_postal_pat, numero_tel) {
  try {
    conn = await pool.getConnection();
    sql = "UPDATE patients SET nom_pat=?, prenom_pat=?, adresse_pat=?, ville_pat=?, code_postal_pat= ?, numero_telephone_pat = ? WHERE email=?";
    const okPacket = await conn.query(sql, 
          [nom_pat, prenom_pat, adresse_pat, ville_pat, code_postal_pat, numero_tel, email]);
    conn.end();
    return okPacket.affectedRows; 
  } catch (err) {
    throw err;
  }
},

}
    