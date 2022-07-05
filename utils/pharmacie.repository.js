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
      const okPacket = await conn.query(sql, [nom_pharmacie, numero_telephone, email]);
      conn.end();
      //console.log(okPacket);
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  async updateOrdonnancePh(quantiteDonner, idmedoc, id_ordo) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE contenir SET quantiteDonner = quantiteDonner + ? WHERE contenir.id_medic = ? AND contenir.id_ordo = ?;";
      const okPacket = await conn.query(sql, [quantiteDonner, idmedoc, id_ordo]);
      conn.end();
      //console.log(okPacket);
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  async ToutMedocDonner(id_ordo) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT COUNT(*) as nb_medocdonner, (SELECT COUNT(*) from contenir where id_ordo = ?) as nb_ordo FROM contenir where id_ordo = ? and quantité = quantiteDonner;";
      const rows = await conn.query(sql, [id_ordo, id_ordo])
      conn.end()
      return rows
    } catch (err) {
      throw err;
    }
  }






}