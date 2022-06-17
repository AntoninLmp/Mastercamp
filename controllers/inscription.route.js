//controllers/inscription.route.js
const express = require('express');
const router = express.Router();

//importer
const utilisateurRepo = require("../utils/utilisateur.repository");

router.get("/", (request, response) => {
    response.render("inscription_choix");
});

router.get('/patient',  (request, response) => {
    var myContent=[];
    response.render("inscription_patient",  { "content": myContent });
});

router.get('/medecin',  (request, response) => {
    var myContent=[];
    response.render("inscription_sante",  { "content": myContent });
});

router.get('/organismesante',  (request, response) => {
    var myContent=[];
    response.render("inscription_organisme_sante",  { "content": myContent });
});

//ROUTE D'INSCRIPTION
router.post("/patient/add", addPatient);
router.post("/organismesante/add", addOrganismeSante);

//Route inscription pour les organismes de sante
async function addPatient(request, response){
    bool = await utilisateurRepo.VerifExiste(request.body.email);
    if (bool != true){
        var myContent=[];
      myContent.push({ "category": "ERREUR",  "message": "Cette addresse email est déjà utilisée." });
      response.render("inscription_patient",  { "content": myContent });
    }
    else{
        var inserer = await utilisateurRepo.addOnePatient(
            request.body.email ,
            request.body.mdp ,
            request.body.nom ,
            request.body.prenom ,
            request.body.dateNaissance ,
            request.body.adresse ,
            request.body.codePostal ,
            request.body.ville ,
            request.body.numeroTelephone ,
            request.body.numeroSecurite ,
        )
        request.session.flashMessage = "NEW USER: "+request.body.email;
        response.redirect("/connexion");
    }
}

//Route inscription pour les organismes de sante
async function addOrganismeSante(request, response){
    bool = await utilisateurRepo.VerifExiste(request.body.email);
    if (bool != true){
        var myContent=[];
      myContent.push({ "category": "ERREUR",  "message": "Cette addresse email est déjà utilisée." });
      response.render("inscription_organisme_sante",  { "content": myContent });
    }
    else{
        var inserer = await utilisateurRepo.addOneOrganismeSante(
            request.body.email ,
            request.body.mdp ,
            request.body.nom ,
            request.body.numero ,
        )
        request.session.flashMessage = "NEW USER: "+request.body.email;
        response.redirect("/connexion");
    }
}

module.exports = router;