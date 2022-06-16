//controllers/inscription.route.js
const express = require('express');
const router = express.Router();

//importer
const utilisateurRepo = require("../utils/utilisateur.repository");

router.get("/", (request, response) => {
    response.render("inscription_choix");
});

router.get('/patient',  (request, response) => {
    response.render("inscription_patient");
});

router.get('/medecin',  (request, response) => {
    response.render("inscription_sante");
});

router.get('/organismesante',  (request, response) => {
    var myContent=[];
    response.render("inscription_organisme_sante",  { "content": myContent });
});

//ROUTE D'INSCRIPTION
router.post("/organismesante/add", addOrganismeSante);

async function addOrganismeSante(request, response){
    bool = await utilisateurRepo.VerifExiste(request.body.email);
    if (bool != true){
        var myContent=[];
      myContent.push({ "category": "ERREUR",  "message": "Cette addresse email est déjà utilisée." });
      response.render("inscription_organisme_sante",  { "content": myContent });
    }
    else{
        var inserer = await utilisateurRepo.addOneOrganismeSante(
            //Remplir
            request.body.email ,
            request.body.mdp ,
            request.body.nom ,
            request.body.numero ,
        )
        request.session.flashMessage = "NEW USER: "+request.body.users_pseudo;
        response.redirect("/connexion");
    }
}

module.exports = router;