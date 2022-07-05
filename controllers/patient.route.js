//controllers/patient.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");
const ordonnanceRepo = require('../utils/ordonnance.repository');
const patientRepo = require('../utils/patient.repository');
const pharmaRepo = require('../utils/pharmacie.repository');


router.get("/", auth.checkAuthentication("PATIENT"), async function (request, response) {
    //console.log(request.user);
    var patient = await patientRepo.getOnePatient(request.user.email);
    var ordonnance = await ordonnanceRepo.getAllOrdonnanceByPatientWithDoc(request.user.email);
    var flashMessage = request.session.flashMessage;
    var allergies = await ordonnanceRepo.getAllAllergiesWithoutPatient(patient.id_patient);
    var allergiesOfAPatient = await ordonnanceRepo.getAllAllergiesOfAPatient(patient.id_patient);
    request.session.flashMessage = "";
    //console.log(patient);
    date_patient = patient.date_naissance;
    let day_patient = ("0" + date_patient.getDate()).slice(-2);
    let month_patient = ("0" + (date_patient.getMonth() + 1)).slice(-2);
    let year_patient = date_patient.getFullYear();

    if (patient == false) {
        response.redirect("/connexion");
    } else {
        response.render("patient_home.ejs", { "ordonnances": ordonnance, "patient": patient, "flashMessage": flashMessage, "annee_pat": year_patient, "mois_pat": month_patient, "jour_pat": day_patient, "allergies": allergies, "allergiesOfAPatient": allergiesOfAPatient });
    }
});

router.post("/updatePatient", auth.checkAuthentication("PATIENT"), updateUser);
async function updateUser(request, response) {
    patientRepo.updatePatient(request.user.email, request.body.nom, request.body.prenom,
        request.body.adresse, request.body.ville, request.body.codePostal, request.body.numeroTelephone);
    response.redirect("/patient#infos");
}

router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("PATIENT"), voirOrdonnance);
async function voirOrdonnance(request, response) {
    var my_ordo = await ordonnanceRepo.getOneOrdonnance(request.params.OrdoId);
    var medecin = await ordonnanceRepo.getMedecinAboutOrdonnance(my_ordo.id_professionneldesante);
    var etablissement = await ordonnanceRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var listeMedicament = await ordonnanceRepo.getListeMedicament(my_ordo.id_ordo);
    var patient = await patientRepo.getOnePatient(request.user.email);
    var medocdonner = await pharmaRepo.ToutMedocDonner(request.params.OrdoId);
    // Date patient
    date_ordo = my_ordo.date_delivrance;
    let day_ordo = ("0" + date_ordo.getDate()).slice(-2);
    let month_ordo = ("0" + (date_ordo.getMonth() + 1)).slice(-2);
    let year_ordo = date_ordo.getFullYear();

    request.session.flashMessage = "";
    response.render("vue_ordonnance", { "my_ordo": my_ordo, "medecin": medecin, "medocdonner": medocdonner, "etablissement": etablissement, "listeMedicament": listeMedicament, "patient": patient, "annee_ordo": year_ordo, "mois_ordo": month_ordo, "jour_ordo": day_ordo });
}

router.post("/updateAllergie", auth.checkAuthentication("PATIENT"), updateAllergies);
async function updateAllergies(request, response) {
    var patient = await patientRepo.getOnePatient(request.user.email);
    ordonnanceRepo.updateAllergie(patient.id_patient, request.body.allergie);
    response.redirect("/patient#ALL");
}

router.get("/delAllergie/:AllID", auth.checkAuthentication("PATIENT"), delAllerg);
async function delAllerg(request, response) {
    var patient = await patientRepo.getOnePatient(request.user.email);
    ordonnanceRepo.deleteAllergie(patient.id_patient, request.params.AllID);
    response.redirect("/patient#ALL");
}

router.post("/searchOrdo", auth.checkAuthentication("PATIENT"), async function (request, response) {
    //console.log(request.user);
    var patient = await patientRepo.getOnePatient(request.user.email);
    var ordonnance = [];
    if ((request.body.ville != []) && (request.body.medecin != [])) {
        var ordonnance = await ordonnanceRepo.getAllOrdonnanceByVilleAndNomMedecin(request.body.medecin, request.body.ville);
    }
    else if (request.body.ville != []) {
        var ordonnance = await ordonnanceRepo.getAllOrdonnanceByVille(request.body.ville);
    }
    else if (request.body.medecin != []) {
        var ordonnance = await ordonnanceRepo.getAllOrdonnanceByNomMedecin(request.body.medecin);
    }
    //var ordonnance = await ordonnanceRepo.getAllOrdonnanceByPatientWithDoc(request.user.email);
    var flashMessage = request.session.flashMessage;
    var allergies = await ordonnanceRepo.getAllAllergiesWithoutPatient(patient.id_patient);
    var allergiesOfAPatient = await ordonnanceRepo.getAllAllergiesOfAPatient(patient.id_patient);
    request.session.flashMessage = "";
    //console.log(patient);
    date_patient = patient.date_naissance;
    let day_patient = ("0" + date_patient.getDate()).slice(-2);
    let month_patient = ("0" + (date_patient.getMonth() + 1)).slice(-2);
    let year_patient = date_patient.getFullYear();

    if (patient == false) {
        response.redirect("/connexion");
    } else {
        response.render("patient_home.ejs", { "ordonnances": ordonnance, "patient": patient, "flashMessage": flashMessage, "annee_pat": year_patient, "mois_pat": month_patient, "jour_pat": day_patient, "allergies": allergies, "allergiesOfAPatient": allergiesOfAPatient });
    }
});

module.exports = router;