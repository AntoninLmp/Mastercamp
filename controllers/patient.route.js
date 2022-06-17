//controllers/patient.route.js

const express = require("express");
const router = express.Router();
const ordonnanceRepo = require('../utils/ordonnance.repository')

router.get("/", async function (request, response) {
    var myContent = [];
    var ordonnance = await ordonnanceRepo.getAllOrdonnance()
    var flashMessage = request.session.flashMessage
    request.session.flashMessage = ""
    response.render("patient_home.ejs", { "ordonnances": ordonnance, "flashMessage": flashMessage });

});


module.exports = router;