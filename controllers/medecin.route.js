//controllers/medecin.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const medecinRepo = require("../utils/medecin.repository");
const patientRepo = require('../utils/patient.repository');
const ordonnanceRepository = require("../utils/ordonnance.repository");

router.get("/", auth.checkAuthentication("MEDECIN"), async function (request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var patientDuMedecin = await medecinRepo.getPatientByMedecin(request.user.email);
    //console.log(patientDuMedecin);
    var etablissement = await medecinRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var etablissementAjout = await medecinRepo.getALLEtablissementSansCeuxQuiADeja(medecin.id_professionneldesante);
    if (medecin == false) {
        response.redirect("/connexion");
    } else {
        response.render("medecin_home.ejs", { "medecin": medecin, "etablissement": etablissement, "etablissementAjout": etablissementAjout, "pdms": patientDuMedecin });
    }
});

router.post("/updateMedecin", auth.checkAuthentication("MEDECIN"), updateUser);
async function updateUser(request, response) {
    medecinRepo.updateMedecin(request.user.email, request.body.nom, request.body.prenom,
        request.body.profession);
    response.redirect("/medecin");
}

router.post("/updateEtab", auth.checkAuthentication("MEDECIN"), updateEtab);
async function updateEtab(request, response) {
    //console.log(request.body.etab);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    medecinRepo.updateEtab(medecin.id_professionneldesante, request.body.etab);
    response.redirect("/medecin");
}

router.get("/VoirPatient/:PatientEmail", auth.checkAuthentication("MEDECIN"), voirPatient);
async function voirPatient(request, response) {
    var patient = await patientRepo.getOnePatient(request.params.PatientEmail);
    var ordoPatient = await ordonnanceRepository.getAllOrdonnanceByPatient(request.params.PatientEmail);
    // get current date
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    // get current year
    let year = date_time.getFullYear();
    response.render("medecin_OnePatient", { "patient": patient, "ordoPatient": ordoPatient, "annee": year, "mois": month, "jour": date });
}

router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("MEDECIN"), voirOrdonnance);
async function voirOrdonnance(request, response) {
    var my_ordo = await ordonnanceRepository.getOneOrdonnance(request.params.OrdoId);
    var medecin = await ordonnanceRepository.getMedecinAboutOrdonnance(my_ordo.id_professionneldesante);
    var etablissement = await ordonnanceRepository.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var listeMedicament = await ordonnanceRepository.getListeMedicament(my_ordo.id_ordo);
    var patient = await patientRepo.getOnePatientById(my_ordo.id_patient);
    request.session.flashMessage = "";
    response.render("vue_ordonnance", { "my_ordo": my_ordo, "medecin": medecin, "etablissement": etablissement, "listeMedicament": listeMedicament, "patient": patient });
}

router.get("/delEtab/:EtabId", auth.checkAuthentication("MEDECIN"), delEtab);
async function delEtab(request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    medecinRepo.delEtabByMed(request.params.EtabId,medecin.id_professionneldesante);
    response.redirect("/medecin");
}

router.post("/addPrescriptionMedicale", auth.checkAuthentication("MEDECIN"), addPrescriptionMedicale);
async function addPrescriptionMedicale(request, response){
    var patient = await patientRepo.getOnePatientByNumSecu(request.body.NumSecu);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    ordonnanceRepository.addOneOrdoPrescription(
        request.body.date,
        request.body.ville,
        request.body.prescription,
        medecin.id_professionneldesante,
        patient.id_patient
    );
    response.redirect("/medecin");
}

module.exports = router;