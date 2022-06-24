//controllers/patient.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");
const ordonnanceRepo = require('../utils/ordonnance.repository');


router.get("/", auth.checkAuthentication("PATIENT"), async function (request, response) {
    console.log(request.user.email);
    var myContent = [];
    var ordonnance = await ordonnanceRepo.getAllOrdonnance()
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("patient_home.ejs", { "ordonnances": ordonnance, "flashMessage": flashMessage });
});

router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("PATIENT"), voirOrdonnance);
async function voirOrdonnance(request, response){
    var my_ordo = await ordonnanceRepo.getOneOrdonnance(request.params.OrdoId);
    response.render("vue_ordonnance", {"my_ordo" : my_ordo});
}

module.exports = router;