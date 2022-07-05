//controllers/medecin.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const medecinRepo = require("../utils/medecin.repository");
const patientRepo = require('../utils/patient.repository');
const ordonnanceRepository = require("../utils/ordonnance.repository");
const { spawnSync } = require('child_process');
const { Console } = require("console");

router.get("/", auth.checkAuthentication("MEDECIN"), async function (request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    //var patientDuMedecin = await medecinRepo.getPatientByMedecin(request.user.email);
    var patientDuMedecin = [];
    var etablissement = await medecinRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var etablissementAjout = await medecinRepo.getALLEtablissementSansCeuxQuiADeja(medecin.id_professionneldesante);
    var patientTrie = [];
    // get current date
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    // get current year
    let year = date_time.getFullYear();
    var myContent=[];
    if (medecin == false) {
        response.redirect("/connexion");
    } else {
        response.render("medecin_home.ejs", { "medecin": medecin, "etablissement": etablissement, "etablissementAjout": etablissementAjout, "pdms": patientDuMedecin, "ptrier": patientTrie, "annee": year, "mois": month, "jour": date, "content": myContent  });
    }
});

router.post("/searchPatByNPS", auth.checkAuthentication("MEDECIN"), searchPatByNPS)
async function searchPatByNPS(request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    //var patientDuMedecin = await medecinRepo.getPatientByMedecin(request.user.email);
    var patientDuMedecin = [];
    var etablissement = await medecinRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var etablissementAjout = await medecinRepo.getALLEtablissementSansCeuxQuiADeja(medecin.id_professionneldesante);
    var patientTrie = await medecinRepo.getPatientByNPS(request.user.email, request.body.nomp, request.body.prenomp, request.body.numsecup);
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    if (patientTrie.length == 0){
        var myContent=[];
        myContent.push({ "category": "ERREUR",  "message": "Aucun patient ne correspond à votre recherche" });
    }
    if (medecin == false) {
        response.redirect("/connexion");
    } else {
        response.render("medecin_home", { "medecin": medecin, "etablissement": etablissement, "etablissementAjout": etablissementAjout, "pdms": patientDuMedecin, "ptrier": patientTrie, "annee": year, "mois": month, "jour": date, "content": myContent });
    }
};

router.get("/AllPatient", auth.checkAuthentication("MEDECIN"), async function (request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var patientDuMedecin = await medecinRepo.getPatientByMedecin(request.user.email);
    var etablissement = await medecinRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var etablissementAjout = await medecinRepo.getALLEtablissementSansCeuxQuiADeja(medecin.id_professionneldesante);
    var patientTrie = [];
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    var myContent=[];
    if (medecin == false) {
        response.redirect("/connexion");
    } else {
        response.render("medecin_home.ejs", { "medecin": medecin, "etablissement": etablissement, "etablissementAjout": etablissementAjout, "pdms": patientDuMedecin, "ptrier": patientTrie, "annee": year, "mois": month, "jour": date, "content": myContent  });
    }
});

router.post("/updateMedecin", auth.checkAuthentication("MEDECIN"), updateUser);
async function updateUser(request, response) {
    medecinRepo.updateMedecin(request.user.email, request.body.nom, request.body.prenom,
        request.body.profession);
    response.redirect("/medecin#Mesinformations");
}

router.post("/updateEtab", auth.checkAuthentication("MEDECIN"), updateEtab);
async function updateEtab(request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    medecinRepo.updateEtab(medecin.id_professionneldesante, request.body.etab);
    response.redirect("/medecin#ETAB");
}

router.get("/VoirPatient/:PatientEmail", auth.checkAuthentication("MEDECIN"), voirPatient);
async function voirPatient(request, response) {
    var patient = await patientRepo.getOnePatient(request.params.PatientEmail);
    var ordoPatient = await ordonnanceRepository.getAllOrdonnanceByPatient(request.params.PatientEmail);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var allergiesOfAPatient = await ordonnanceRepository.getAllAllergiesOfAPatient(patient.id_patient);
    // get current date
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2); // get current day
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);// get current month
    let year = date_time.getFullYear();// get current year
    // Patient date
    date_patient = patient.date_naissance;
    let day_patient = ("0" + date_patient.getDate()).slice(-2);
    let month_patient = ("0" + (date_patient.getMonth() + 1)).slice(-2);
    let year_patient = date_patient.getFullYear();
    response.render("medecin_OnePatient", { "patient": patient, "medecin": medecin, "ordoPatient": ordoPatient, "allergies": allergiesOfAPatient, "annee": year, "mois": month, "jour": date, "annee_pat": year_patient, "mois_pat": month_patient, "jour_pat": day_patient });

}

router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("MEDECIN"), voirOrdonnance);
async function voirOrdonnance(request, response) {
    var my_ordo = await ordonnanceRepository.getOneOrdonnance(request.params.OrdoId);
    var medecin = await ordonnanceRepository.getMedecinAboutOrdonnance(my_ordo.id_professionneldesante);
    var etablissement = await ordonnanceRepository.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var listeMedicament = await ordonnanceRepository.getListeMedicament(my_ordo.id_ordo);
    var patient = await patientRepo.getOnePatientById(my_ordo.id_patient);
    request.session.flashMessage = "";
    // Date patient
    date_ordo = my_ordo.date_delivrance;
    let day_ordo = ("0" + date_ordo.getDate()).slice(-2);
    let month_ordo = ("0" + (date_ordo.getMonth() + 1)).slice(-2);
    let year_ordo = date_ordo.getFullYear();
    response.render("vue_ordonnance", { "my_ordo": my_ordo, "medecin": medecin, "etablissement": etablissement, "listeMedicament": listeMedicament, "patient": patient, "annee_ordo": year_ordo, "mois_ordo": month_ordo, "jour_ordo": day_ordo });
}

router.get("/delEtab/:EtabId", auth.checkAuthentication("MEDECIN"), delEtab);
async function delEtab(request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    medecinRepo.delEtabByMed(request.params.EtabId, medecin.id_professionneldesante);
    response.redirect("/medecin#ETAB");
}

router.post("/addPrescriptionMedicale/:boolRedirect", auth.checkAuthentication("MEDECIN"), addPrescriptionMedicale);
async function addPrescriptionMedicale(request, response) {
    var okNumSecu = await ordonnanceRepository.checkNumeroSecurite(request.body.NumSecu);
    if (okNumSecu == false) {
        spawnSync("powershell.exe", [`
Add-Type -AssemblyName PresentationCore,PresentationFramework;
[System.Windows.MessageBox]::Show('Le numéro de sécurité social est incorrect');
`]);
    }
    else {
        var date_time = new Date();
        var patient = await patientRepo.getOnePatientByNumSecu(request.body.NumSecu);
        var medecin = await medecinRepo.getOneMedecin(request.user.email);
        ordonnanceRepository.addOneOrdoPrescription(
            date_time,
            request.body.ville,
            request.body.prescription,
            medecin.id_professionneldesante,
            patient.id_patient
        );
        if (request.params.boolRedirect) {
            const route = "/medecin/VoirPatient/" + patient.email;
            response.redirect(route)
        }
        else { response.redirect("/medecin"); }
    }
}


router.post("/ordonnanceMedicamenteusePatient", auth.checkAuthentication("MEDECIN"), ordonnanceMedicamenteuseSsPatient);
async function ordonnanceMedicamenteuseSsPatient(request, response) {
    var okNumSecu = await ordonnanceRepository.checkNumeroSecurite(request.body.NumSecu);
    if (okNumSecu == false) {
        spawnSync("powershell.exe", [`
Add-Type -AssemblyName PresentationCore,PresentationFramework;
[System.Windows.MessageBox]::Show('Le numéro de sécurité social est incorrect');
`]);
    }
    else {
        var date_time = new Date();
        var patient = await patientRepo.getOnePatientByNumSecu(request.body.NumSecu);
        var medecin = await medecinRepo.getOneMedecin(request.user.email);
        var ordonnance = await ordonnanceRepository.addOrdoMedimanteuse(date_time,
            request.body.ville,
            medecin.id_professionneldesante,
            patient.id_patient);
        var date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
        let year = date_time.getFullYear();
        var listeMedicament = await ordonnanceRepository.getAllMedicaments();
        var allergiesOfAPatient = await ordonnanceRepository.getAllAllergiesOfAPatient(patient.id_patient);
        var medicamentOrdo = [];
        response.render("vue_ordo_medicamenteuse", { "medecin": medecin, "annee": year, "mois": month, "jour": date, "listeMedicament": listeMedicament, "patient": patient,"allergies": allergiesOfAPatient, "ordonnance": ordonnance, "medicamentOrdo": medicamentOrdo });
    }
}
/*
router.post("/ordonnanceMedicamenteuse/:numSecu", auth.checkAuthentication("MEDECIN"), ordonnanceMedicamenteuse);
async function ordonnanceMedicamenteuse(request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    var listeMedicament = await ordonnanceRepository.getAllMedicaments();
    var patient = await patientRepo.getOnePatientByNumSecu(request.params.numSecu);
    var ordonnance = await ordonnanceRepository.addOrdoMedimanteuse(date_time,
        request.body.ville,
        medecin.id_professionneldesante,
        patient.id_patient);
        console.log(ordonnance.ville_ordo);
    var medicamentOrdo = [];
    if (patient == null) {
        response.render("vue_ordo_medicamenteuse", { "medecin": medecin, "annee": year, "mois": month, "jour": date, "listeMedicament": listeMedicament, "patient": patient });
    } else {
        var allergiesOfAPatient = await ordonnanceRepository.getAllAllergiesOfAPatient(patient.id_patient);
        response.render("vue_ordo_medicamenteuse", { "medecin": medecin, "annee": year, "mois": month, "jour": date, "listeMedicament": listeMedicament, "patient": patient, "allergies": allergiesOfAPatient, "ordonnance": ordonnance, "medicamentOrdo": medicamentOrdo });

    }
}*/

router.post("/addMedicament/:id_ordo", auth.checkAuthentication("MEDECIN"), addMedicament);
async function addMedicament(request, response) {
    ordonnanceRepository.addOneMedicToOrdo(request.body.medicaments, request.params.id_ordo, request.body.quant, request.body.freq, request.body.duree)
    var date_time = new Date();
    var patient = await patientRepo.getOnePatientByNumSecu(request.body.NumSecu);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var ordonnance = await ordonnanceRepository.getOneOrdonnance(request.params.id_ordo);
    var date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    var listeMedicament = await ordonnanceRepository.getMedicamentSansCeuxQuiADeja(request.params.id_ordo);
    var allergiesOfAPatient = await ordonnanceRepository.getAllAllergiesOfAPatient(patient.id_patient);
    var medicamentOrdo = await ordonnanceRepository.getListeMedicament(ordonnance.id_ordo);
    response.render("vue_ordo_medicamenteuse", { "medecin": medecin, "annee": year, "mois": month, "jour": date, "listeMedicament": listeMedicament, "patient": patient,"allergies": allergiesOfAPatient, "ordonnance": ordonnance, "medicamentOrdo": medicamentOrdo });
}

router.get("/delMedicament/:id_patient/:id_medic/:id_ordo", auth.checkAuthentication("MEDECIN"), delMedicament);
async function delMedicament(request, response) {
    ordonnanceRepository.delOneMedicByOrdo(request.params.id_ordo, request.params.id_medic);
    var date_time = new Date();
    var patient = await patientRepo.getOnePatientById(request.params.id_patient);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    var ordonnance = await ordonnanceRepository.getOneOrdonnance(request.params.id_ordo);
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    var listeMedicament = await ordonnanceRepository.getMedicamentSansCeuxQuiADeja(request.params.id_ordo);
    var allergiesOfAPatient = await ordonnanceRepository.getAllAllergiesOfAPatient(patient.id_patient);
    var medicamentOrdo = await ordonnanceRepository.getListeMedicament(ordonnance.id_ordo);
    response.render("vue_ordo_medicamenteuse", { "medecin": medecin, "annee": year, "mois": month, "jour": date, "listeMedicament": listeMedicament, "patient": patient,"allergies": allergiesOfAPatient, "ordonnance": ordonnance, "medicamentOrdo": medicamentOrdo });
}

router.get("/annulerOrdo/:id_ordo", auth.checkAuthentication("MEDECIN"), annulerOrdo);
async function annulerOrdo(request, response) {
    ordonnanceRepository.delOneOrdo(request.params.id_ordo);
    response.redirect("/medecin");
}




module.exports = router;