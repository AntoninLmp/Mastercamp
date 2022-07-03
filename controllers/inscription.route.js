//controllers/inscription.route.js
const express = require('express');
const router = express.Router();

//importer
const utilisateurRepo = require("../utils/users.repository");

router.get("/", (request, response) => {
    response.render("inscription_choix");
});

router.get('/patient', (request, response) => {
    var myContent = [];
    response.render("inscription_patient", { "content": myContent });
});

router.get('/medecin', (request, response) => {
    var myContent = [];
    response.render("inscription_sante", { "content": myContent });
});

router.get('/organismesante', (request, response) => {
    var myContent = [];
    response.render("inscription_organisme_sante", { "content": myContent });
});

//ROUTE D'INSCRIPTION
router.post("/medecin/add", addMedecin);
router.post("/patient/add", addPatient);
router.post("/organismesante/add", addOrganismeSante);


//Route inscription pour les patients
async function addMedecin(request, response) {
    bool = await utilisateurRepo.VerifExiste(request.body.email);
    if (bool != true) {
        var myContent = [];
        myContent.push({ "category": "ERREUR", "message": "Cette addresse email est déjà utilisée." });
        response.render("inscription_sante", { "content": myContent });
    }
    else {
        if (request.body.mdp != request.body.mdp2) {
            var myContent = [];
            myContent.push({ "category": "ERREUR", "message": "Les deux mots de passe sont différents." });
            response.render("inscription_sante", { "content": myContent });
        } else if ((await utilisateurRepo.GestionRpps(request.body.rpps)) != true) {
            var myContent = [];
            myContent.push({ "category": "ERREUR", "message": "Ce numéro RPPS n'est pas valide." });
            response.render("inscription_sante", { "content": myContent });
        } else {
            var inserer = await utilisateurRepo.addOneMedecin(
                request.body.email,
                request.body.mdp,
                request.body.nom,
                request.body.prenom,
                request.body.rpps,
                request.body.adeli,
                request.body.proffesion
            )
            request.session.flashMessage = "NEW USER: " + request.body.email;
            response.redirect("/connexion");
        }
    }
}


//Route inscription pour les patients
async function addPatient(request, response) {
    // bool = await utilisateurRepo.VerifExiste(request.body.email);
    if (request.body.mdp != request.body.mdp2) {
        var myContent = [];
        myContent.push({ "category": "ERREUR", "message": "Les deux mots de passe sont différents." });
        response.render("inscription_patient", { "content": myContent });
    } else if (await utilisateurRepo.VerifExiste(request.body.email) != true) {
        var myContent = [];
        myContent.push({ "category": "ERREUR", "message": "Cette addresse email est déjà utilisée." });
        response.render("inscription_patient", { "content": myContent });
    } else {
        var inserer = await utilisateurRepo.addOnePatient(
            request.body.email,
            request.body.mdp,
            request.body.nom,
            request.body.prenom,
            request.body.dateNaissance,
            request.body.adresse,
            request.body.codePostal,
            request.body.ville,
            request.body.numeroTelephone,
            request.body.numeroSecurite ,
        )
        request.session.flashMessage = "NEW USER: " + request.body.email;
        response.redirect("/connexion");
    }
}

//Route inscription pour les organismes de sante
async function addOrganismeSante(request, response) {
    bool = await utilisateurRepo.VerifExiste(request.body.email);
    console.log(request.body.mdp, request.body.mdp2);
    if (request.body.mdp != request.body.mdp2) {
        var myContent = [];
        myContent.push({ "category": "ERREUR", "message": "Les deux mots de passe sont différents." });
        response.render("inscription_organisme_sante", { "content": myContent });
    } else if (await utilisateurRepo.VerifExiste(request.body.email) != true) {
        var myContent = [];
        myContent.push({ "category": "ERREUR", "message": "Cette addresse email est déjà utilisée." });
        response.render("inscription_organisme_sante", { "content": myContent });
    } else {
        var inserer = await utilisateurRepo.addOneOrganismeSante(
            request.body.email,
            request.body.mdp,
            request.body.nom,
            request.body.numero ,
        )
        request.session.flashMessage = "NEW USER: " + request.body.email;
        response.redirect("/connexion");
    }
}

module.exports = router;