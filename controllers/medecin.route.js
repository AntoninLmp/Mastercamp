//controllers/medecin.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const medecinRepo = require("../utils/medecin.repository")

router.get("/", auth.checkAuthentication("MEDECIN"), async function (request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);

    var patientDuMedecin = await medecinRepo.getPatientByMedecin(request.user.email);
    console.log(request.user.email);
    var etablissement = await medecinRepo.getEtablissementDuMedecin(medecin.id_professionneldesante);
    var etablissementAjout = await medecinRepo.getALLEtablissementSansCeuxQuiADeja(medecin.id_professionneldesante); console.log(request.user.email);
    console.log(medecin);
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
    console.log(request.body.etab);
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    medecinRepo.updateEtab(medecin.id_professionneldesante, request.body.etab);
    response.redirect("/medecin");
}


module.exports = router;