//controllers/patient.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");
const ordonnanceRepo = require('../utils/ordonnance.repository');
const patientRepo = require('../utils/patient.repository');


router.get("/", auth.checkAuthentication("PATIENT"), async function (request, response) {
    console.log(request.user);
    var myContent = [];
    var ordonnance = await ordonnanceRepo.getAllOrdonnanceByPatient(request.user.email);
    var patient = await patientRepo.getOnePatient(request.user.email);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    console.log(patient);
    if (patient == false){
        response.redirect("/connexion");
    }else{
        response.render("patient_home.ejs", { "ordonnances": ordonnance, "patient": patient, "flashMessage": flashMessage });
    }
});

router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("PATIENT"), voirOrdonnance);
async function voirOrdonnance(request, response) {
    var my_ordo = await ordonnanceRepo.getOneOrdonnance(request.params.OrdoId);
    var medecin = await ordonnanceRepo.getMedecinAboutOrdonnance(my_ordo.id_professionneldesante);
    var etablissement = await ordonnanceRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var listeMedicament = await ordonnanceRepo.getListeMedicament(my_ordo.id_ordo);
    request.session.flashMessage = "";
    response.render("vue_ordonnance", { "my_ordo": my_ordo, "medecin": medecin, "etablissement": etablissement, "listeMedicament": listeMedicament });
}

module.exports = router;