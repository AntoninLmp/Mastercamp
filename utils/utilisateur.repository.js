//utils/utilisateur.repository.js

pool = require("../utils/db.js");
module.exports = {
    getBlankUtilisateur(){
        //TODO
    },

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

}