// controllers/login.route.js

const express = require("express");
const router = express.Router();
//Les repertoires utiles
const userRepo = require("../utils/users.repository");

router.get("/", function (request, response) {
    response.render("connexion", { content: [] });
});

router.post("/connexion", loginPostAction);
router.get("/deconnexion", deconnexionAction);

async function loginPostAction(request, response) {
  areValid = await userRepo.areValidCredentials(request.body.email, request.body.mdp);

  if (areValid) {
    user = await userRepo.getOneUser(request.body.email);
    
    await request.login(user, function (err) { 
        if (err) { 
          console.log(err);
          return next(err); }
    });
    
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

function deconnexionAction(request, response) {
  request.logOut();
  response.redirect("/connexion");
}


module.exports = router;