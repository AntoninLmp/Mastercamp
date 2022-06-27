//controllers/medecin.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const medecinRepo = require("../utils/medecin.repository")

router.get("/", auth.checkAuthentication("MEDECIN"), async function (request, response) {
    var medecin = await medecinRepo.getOneMedecin(request.user.email);
    console.log(request.user.email);
    console.log(medecin);
    if (medecin == false){
        response.redirect("/connexion");
    }else{
        response.render("medecin_home.ejs", { "medecin": medecin });
    }
});

router.post("/updateMedecin", auth.checkAuthentication("MEDECIN"),updateUser);
async function updateUser (request, response){
    medecinRepo.updateMedecin(request.user.email,request.body.nom, request.body.prenom, 
        request.body.profession);
    response.redirect("/medecin");
}

module.exports = router;