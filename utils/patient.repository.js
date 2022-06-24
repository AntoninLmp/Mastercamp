// utils/patient.repository.js

pool = require("../utils/db.js");

module.exports = {

    async getOnePatient(email) {
      try {
        conn = await pool.getConnection()
        sql = "SELECT * FROM patients WHERE email = ?;"
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
}
    