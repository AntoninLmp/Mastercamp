//utils/utilisateur.repository.js

pool = require("../utils/db.js");
module.exports = {
    getBlankUtilisateur(){
        //TODO
    },

    //Vérifier que cet utilisateur existe
    async areValidCredentials(email, password) {
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM utilisateur WHERE email = ? AND mdp = sha2(concat(date_creation, ?), 224) ";
            const rows = await conn.query(sql, [email, password]);
            conn.end();
            if (rows.length == 1 && rows[0].email === email) {
                return true;
            } 
            else {
                return false;
            }
            } catch (err) {
            throw err;
        }
      },

    //Récupérer un utilisateur de la table Utilisateur avec un email 
    async getOneUtilisateur(email){
        try{
            conn = await pool.getConnection();
            sql = "SELECT * FROM Utilisateur WHERE email = ?";
            const rows = await conn.query(sql, email);
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

    //Ajouetr un medecin
    async addOneMedecin(){
        
    },

    //Ajouter un patient
    async addOnePatient(email, mdp, nom, prenom, dateNaissance, adresse, codePostal, ville, numeroTelephone, numeroSecurite){
        try {
            conn = await pool.getConnection();          
            sql = "INSERT INTO utilisateur (email, mdp, date_creation, Role) VALUES (?, sha2(concat(now(), ?), 224), now() , 'PATIENT');  ";
            const okPacket1 = await conn.query(sql, [email, mdp]); 
            sql = "INSERT INTO patients (id_patient, nom, prenom, date_naissance, adresse, code_postal, ville, numero_telephone, numero_sercurite, email) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    async addOneOrganismeSante(email, mdp, nomPharmacie, telPharmacie){
        try {
            conn = await pool.getConnection();          
            sql = "INSERT INTO utilisateur (email, mdp, date_creation, Role) VALUES (?, sha2(concat(now(), ?), 224), now() , 'PHARMACIE');  ";
            const okPacket1 = await conn.query(sql, [email, mdp]); 
            sql = "INSERT INTO pharmacie (id_pharmacie, nom_pharmacie, numero_telephone, email) VALUES (NULL, ?, ?, ?)";
            const okPacket2 = await conn.query(sql, [nomPharmacie, nomPharmacie, email]); 
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
    async VerifExiste(email){
        try{
            conn = await pool.getConnection();
            sql = "SELECT * FROM utilisateur WHERE email = ?";
            const rows = await conn.query(sql, email);
            console.log("USERS FETCHED: "+rows.length);
            if (rows.length == 0){
              return true;
            }
            else
              return false;
        }
        catch(error){
            throw error;
        }
    }
}