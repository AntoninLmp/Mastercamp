
pool = require("../utils/db.js");
module.exports = {
    getOrdonnanceModel() { // defines the entity model
        return {
            "id_ordo": 0,
            "date_delivrance": "YYYY/MM/JJ",
            "ville": "X",
            "description": "X",
            "id_professionneldesante": 0,
            "id_patient": 0
        }
    },
    async getAllOrdonnance() {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM Ordonnance ;"
            const rows = await conn.query(sql)
            conn.end()
            console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    async getAllOrdonnanceByPatient(email) {
        try {
            conn = await pool.getConnection()
            sql = "SELECT * FROM ordonnance INNER JOIN patients USING (id_patient) WHERE email = ?;"
            const rows = await conn.query(sql,email)
            conn.end()
            console.log("ROWS FETCHED: " + rows.length)
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    

}