//controllers/organismesante.route.js

const express = require("express");
const router = express.Router();
const auth = require("../utils/users.auth");
const ordonnanceRepo = require('../utils/ordonnance.repository');
const pharmaRepo = require('../utils/pharmacie.repository');
const ordonnanceRepository = require("../utils/ordonnance.repository");
const patientRepo = require("../utils/patient.repository");

// routes permettant à la pharmacie d'utiliser son espace dédié
router.get("/", auth.checkAuthentication("PHARMACIE"), async function (request, response) {
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnances = [];
    var ordonnance = [];
    var myContent = [];
    response.render("orgasante_home.ejs", { "ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie, "content": myContent });
});

// pharmacie recherche une ordonnance par son numéro (barre de recherche 1)
router.post("/searchByIdOrdonnance", auth.checkAuthentication("PHARMACIE"), SearchByIdOrdonnance)
async function SearchByIdOrdonnance(request, response) {
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnances = [];
    var ordonnance = await ordonnanceRepo.getOneOrdonnance(request.body.numeroOrdo);
    var myContent = [];
    if (ordonnance == null) {
        myContent.push({ "category": "ERREUR", "message": "Aucune ordonnance correspond à votre recherche" });
    }
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie, "content": myContent });
};

// pharmacie recherche une ordonnance par le numéro de securité sociale du patient (barre d recherche 2)
router.post("/searchByPatientOrdonnance", auth.checkAuthentication("PHARMACIE"), searchByPatientOrdonnance)
async function searchByPatientOrdonnance(request, response) {
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnance = [];
    var ordonnances = await ordonnanceRepo.getAllOrdonnanceByPatientBySecu(request.body.numeroSecu);
    var myContent = [];
    if (ordonnances.length == 0) {
        myContent.push({ "category": "ERREUR", "message": "Aucune ordonnance correspond à votre recherche" });
    }
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie, "content": myContent });
};

// pharmacie regarde une ordonnance
router.get("/VoirOrdonnance/:OrdoId", auth.checkAuthentication("PHARMACIE"), voirOrdonnance);
async function voirOrdonnance(request, response) {
    var my_ordo = await ordonnanceRepository.getOneOrdonnance(request.params.OrdoId);
    var medecin = await ordonnanceRepository.getMedecinAboutOrdonnance(my_ordo.id_professionneldesante);
    var etablissement = await ordonnanceRepository.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var listeMedicament = await ordonnanceRepository.getListeMedicament(my_ordo.id_ordo);
    var patient = await patientRepo.getOnePatientById(my_ordo.id_patient);
    var medocdonner = await pharmaRepo.ToutMedocDonner(request.params.OrdoId);
    request.session.flashMessage = "";
    date_ordo = my_ordo.date_delivrance;
    let day_ordo = ("0" + date_ordo.getDate()).slice(-2);
    let month_ordo = ("0" + (date_ordo.getMonth() + 1)).slice(-2);
    let year_ordo = date_ordo.getFullYear();
    response.render("vue_ordo_pharma", { "my_ordo": my_ordo, "medecin": medecin, "medocdonner": medocdonner, "etablissement": etablissement, "listeMedicament": listeMedicament, "patient": patient, "annee_ordo": year_ordo, "mois_ordo": month_ordo, "jour_ordo": day_ordo });
}

// pharmacie modifie ses informations
router.post("/updatePharmacie", auth.checkAuthentication("PHARMACIE"), updateUser);
async function updateUser(request, response) {
    pharmaRepo.updatePharmacie(request.user.email, request.body.nom, request.body.numtel);
    response.redirect("/organismesante#infos");
}

// pharmacie modifie une ordonnance
router.post("/updateOrdoPh/:idMedic/:idOrdo", auth.checkAuthentication("PHARMACIE"), updateOrdoPh);
async function updateOrdoPh(request, response) {
    pharmaRepo.updateOrdonnancePh(request.body.qt, request.params.idMedic, request.params.idOrdo);
    response.redirect("/organismesante/VoirOrdonnance/" + request.params.idOrdo);
}
router.post("/updateOrdoPhDesc/:idOrdo", auth.checkAuthentication("PHARMACIE"), updateOrdoPhDesc);
async function updateOrdoPhDesc(request, response) {
    pharmaRepo.updateOrdonnancePhDesc(request.params.idOrdo);
    response.redirect("/organismesante/VoirOrdonnance/" + request.params.idOrdo);
}


module.exports = router;