
pool = require("../utils/db.js");
module.exports = {
    getOrdonnanceModel() { // defines the entity model
        return {
            "id_ordo": 0,
            "date_delivrance": "YYYY/MM/JJ",
            "ville_ordo": "X",
            "description": "X",
            "id_professionneldesante": 0,
            "id_patient": 0
        }
    },
    async getAllOrdonnance() {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM Ordonnance ORDER BY id_ordo DESC ;"
            const rows = await conn.query(sql)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllOrdonnanceByPatient(email) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM ordonnance INNER JOIN patients USING (id_patient) WHERE email = ? ORDER BY id_ordo DESC;"
            const rows = await conn.query(sql,email)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getAllOrdonnanceByPatientWithDoc(email) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT ordonnance.*, nom_pro, prenom_pro, patients.email FROM ordonnance INNER JOIN patients USING (id_patient) INNER JOIN professionneldesante USING(id_professionneldesante) WHERE patients.email = ?;"
            const rows = await conn.query(sql, email)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },


    async getAllOrdonnanceByPatientBySecu(numSecu) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM ordonnance INNER JOIN patients USING (id_patient) WHERE numero_sercurite = ? ORDER BY id_ordo DESC;"
            const rows = await conn.query(sql,numSecu)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllOrdonnanceByVille(Ville) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT ordonnance.*, nom_pro, prenom_pro, patients.email FROM ordonnance INNER JOIN patients USING (id_patient) INNER JOIN professionneldesante USING(id_professionneldesante) WHERE ville_ordo=?  ORDER BY id_ordo DESC;"
            const rows = await conn.query(sql,Ville)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllOrdonnanceByNomMedecin(nomMedecin) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT ordonnance.*, nom_pro, prenom_pro, patients.email FROM ordonnance INNER JOIN patients USING (id_patient) INNER JOIN professionneldesante USING(id_professionneldesante) WHERE nom_pro = ? ORDER BY id_ordo DESC;"
            const rows = await conn.query(sql,nomMedecin)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllOrdonnanceByVilleAndNomMedecin(nomMedecin, Ville) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT ordonnance.*, nom_pro, prenom_pro, patients.email FROM ordonnance INNER JOIN patients USING (id_patient) INNER JOIN professionneldesante USING(id_professionneldesante) WHERE nom_pro = ? AND ville_ordo=? ORDER BY id_ordo DESC;"
            const rows = await conn.query(sql, [nomMedecin, Ville])
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getOneOrdonnance(IdOrdo) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM Ordonnance WHERE id_ordo=?;"
            const rows = await conn.query(sql, IdOrdo)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            if (rows.lenght != 0) {
                return rows[0]
            }
            else {
                return [];
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getMedecinAboutOrdonnance(IdMedecin) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM professionneldesante WHERE id_professionneldesante=?;"
            const rows = await conn.query(sql, IdMedecin)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows[0]
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    ,
    async getEtablissementDuMedecin(IdMedecin) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM exercer inner join etablissement USING(id_etablissement) where id_professionneldesante = ?;"
            const rows = await conn.query(sql, IdMedecin)
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getListeMedicament(IdOrdo) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM contenir INNER join listedemedicaments USING(id_medic) where id_ordo = ?;"
            const rows = await conn.query(sql, IdOrdo)
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async addOneOrdoPrescription(dateDelivrance, ville, description, idProfDeSante, idPatient) {
        try {
            conn = await pool.getConnection()
            sql = "INSERT INTO ordonnance (id_ordo, date_delivrance, ville_ordo, description, id_professionneldesante, id_patient) VALUES (NULL, ?,?,?,?,?);"
            const rows = await conn.query(sql, [dateDelivrance, ville, description, idProfDeSante, idPatient]);
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllAllergies() {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM allergie;"
            const rows = await conn.query(sql);
            conn.end()
            // console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getAllAllergiesWithoutPatient(idPatient) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM allergie left join avoirallergie USING(id_allergie) where id_allergie not in (SELECT id_allergie  FROM allergie left join avoirallergie USING(id_allergie) WHERE id_patient = ?);"
            const rows = await conn.query(sql, idPatient);
            conn.end()
            // console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getAllAllergiesOfAPatient(idPatient) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM avoirallergie inner join allergie USING(id_allergie) WHERE id_patient = ?;"
            const rows = await conn.query(sql, idPatient);
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
         } catch (err) {
            console.log(err)
            throw err
        }
    },
    async checkNumeroSecurite(NumSecu) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM patients WHERE numero_sercurite = ?;"
            const rows = await conn.query(sql, NumSecu)
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            if (rows.length == 0){
                return false;
            }
            else{
                return true;
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async updateAllergie(idPatient, idAllergie) {
        try {
            conn = await pool.getConnection()
            sql = "insert into avoirallergie (id_patient, id_allergie) VALUES ( ?, ? );"
            const rows = await conn.query(sql, [idPatient, idAllergie]);
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async deleteAllergie(idPatient, idAllergie) {
        try {
            conn = await pool.getConnection()
            sql = " DELETE FROM avoirallergie WHERE avoirallergie.id_patient = ? AND avoirallergie.id_allergie = ?"
            const rows = await conn.query(sql, [idPatient, idAllergie]);
            conn.end()
            //console.log("ROWS FETCHED : " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    async getAllMedicaments() {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM ListeDeMedicaments;"
            const rows = await conn.query(sql)
            conn.end()
            //console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

}