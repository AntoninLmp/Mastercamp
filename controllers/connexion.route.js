// controllers/connexion.route.js

const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
    var myContent=[];
    response.render("connexion", { "content": myContent });
});

//THE SESSION
const utilisateurRepo = require("../utils/utilisateur.repository");

//THE ROUTES
router.post("/connexion", ConnexionAction);

async function ConnexionAction(request, response) {
    areValid = await utilisateurRepo.areValidCredentials(request.body.email, request.body.mdp);
  
    if (areValid) {
      user = await utilisateurRepo.getOneUtilisateur(request.body.email);
      
      await request.login(user, function (err) { 
          if (err) { 
            console.log(err);
            return next(err); 
        }
      });
      console.log(request.user);
      if (request.user.Role === "PATIENT") {
        response.redirect("/patient");
      } 
      else if (request.user.Role === "MEDECIN") {
        response.redirect("/medecin");
      }
      else {
        response.redirect("/organismesante");
      }
    } 
    else {
      var myContent=[];
      myContent.push({ "category": "ERREUR",  "message": "Votre identifiant ou votre mot de passe est incorrect." });
      response.render("connexion", { "content": myContent });
    }
  }

module.exports = router;