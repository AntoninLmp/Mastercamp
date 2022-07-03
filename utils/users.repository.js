// utils/users.repository.js

pool = require("../utils/db.js");

module.exports = {

  async getOneUser(userpseudo) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM utilisateur WHERE email=?";
      const rows = await conn.query(sql, userpseudo);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
  // For the login
  async areValidCredentials(userpseudo, password) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM utilisateur WHERE email = ? AND mdp = sha2(concat(date_creation, ?), 224) ";
      const rows = await conn.query(sql, [userpseudo, password]);
      conn.end();
      //console.log(rows);
      if (rows.length == 1 && rows[0].email === userpseudo) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
  //Ajouter un medecin
  async addOneMedecin(email, mdp, nom, prenom, RPPS, adeli, proffession) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO utilisateur (email, mdp, date_creation, Role) VALUES (?, sha2(concat(now(), ?), 224), now() , 'MEDECIN');  ";
      const okPacket1 = await conn.query(sql, [email, mdp]);
      sql = "INSERT INTO professionneldesante (id_professionneldesante, nom_pro, prenom_pro, RPPS, adeli, proffession, email) VALUES (NULL, ?, ?, ?, ?, ?, ?)";
      const okPacket2 = await conn.query(sql, [nom, prenom, RPPS, adeli, proffession, email]);
      conn.end();
      //console.log(okPacket1);
      //console.log(okPacket2);
      return okPacket2.insertId;
    }
    catch (error) {
      throw error;
    }
  },

  //Ajouter un patient
  async addOnePatient(email, mdp, nom, prenom, dateNaissance, adresse, codePostal, ville, numeroTelephone, numeroSecurite) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO utilisateur (email, mdp, date_creation, Role) VALUES (?, sha2(concat(now(), ?), 224), now() , 'PATIENT');  ";
      const okPacket1 = await conn.query(sql, [email, mdp]);
      sql = "INSERT INTO patients (id_patient, nom_pat, prenom_pat, date_naissance, adresse_pat, code_postal_pat, ville_pat, numero_telephone_pat, numero_sercurite, email) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const okPacket2 = await conn.query(sql, [nom, prenom, dateNaissance, adresse, codePostal, ville, numeroTelephone, numeroSecurite, email]);
      conn.end();
      //console.log(okPacket1);
      //console.log(okPacket2);
      return okPacket2.insertId;
    }
    catch (error) {
      throw error;
    }
  },

  //Ajouter un organisme de santé
  async addOneOrganismeSante(email, mdp, nomPharmacie, telPharmacie) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO utilisateur (email, mdp, date_creation, Role) VALUES (?, sha2(concat(now(), ?), 224), now() , 'PHARMACIE');  ";
      const okPacket1 = await conn.query(sql, [email, mdp]);
      sql = "INSERT INTO pharmacie (id_pharmacie, nom_pharmacie, numero_telephone, email) VALUES (NULL, ?, ?, ?)";
      const okPacket2 = await conn.query(sql, [nomPharmacie, telPharmacie, email]);
      conn.end();
      //console.log(okPacket1);
      //console.log(okPacket2);
      return okPacket2.insertId;
    }
    catch (error) {
      throw error;
    }
  },

  //Vérifier l'addresse mail unique
  async VerifExiste(email) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM utilisateur WHERE email = ?";
      const rows = await conn.query(sql, email);
      console.log("USERS FETCHED: " + rows.length);
      if (rows.length == 0) {
        return true;
      }
      else
        return false;
    }
    catch (error) {
      throw error;
    }
  },

  //Vérifier le RPPS
  async GestionRpps(rpps) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM rpps WHERE num_rpps = ? AND Utiliser = 0";
      const rows = await conn.query(sql, rpps);
      console.log("rpps FETCHED: " + rows.length);
      if (rows.length == 1) {
        sql = "UPDATE rpps SET Utiliser=1 WHERE num_rpps = ?";
        const rows = await conn.query(sql, rpps);
        return true;
      }
      else
        return false;
    }
    catch (error) {
      throw error;
    }
  }

}; 