// utils/medecin.repository.js

pool = require("../utils/db.js");

module.exports = {

  async getOneMedecin(email) {
    try {
      conn = await pool.getConnection()
      sql = "SELECT * FROM ProfessionnelDeSante INNER JOIN utilisateur USING (email) WHERE email = ?;"
      const rows = await conn.query(sql, email)
      conn.end()
      console.log("ROWS FETCHED: " + rows.length)
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

  async updateMedecin(email, nom_pro, prenom_pro, profession) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE ProfessionnelDeSante SET nom_pro=?, prenom_pro=?, proffession=? WHERE email=?";
      const okPacket = await conn.query(sql,
        [nom_pro, prenom_pro, profession, email]);
      conn.end();
      console.log(okPacket);
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },

  async updateEtab(idMedecin, idEtab) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO exercer values (?, ?)";
      const okPacket = await conn.query(sql,
        [idMedecin, idEtab]);
      conn.end();
      console.log(okPacket);
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  async getEtablissementDuMedecin(IdMedecin) {
    try {
      conn = await pool.getConnection()
      sql = "SELECT * FROM exercer inner join etablissement USING(id_etablissement) where id_professionneldesante = ?;"
      const rows = await conn.query(sql, IdMedecin)
      conn.end()
      console.log("ROWS FETCHED : " + rows.length)
      return rows
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  async getALLEtablissementSansCeuxQuiADeja(IdMedecin) {
    try {
      conn = await pool.getConnection()
      sql = "SELECT * FROM etablissement left join exercer USING(id_etablissement) where id_etablissement not in (SELECT id_etablissement FROM etablissement left join exercer USING(id_etablissement) WHERE id_professionneldesante = ?);"
      const rows = await conn.query(sql, IdMedecin)
      conn.end()
      console.log("ROWS FETCHED : " + rows.length)
      return rows
    } catch (err) {
      console.log(err)
      throw err
    }
  }

}
