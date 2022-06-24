// controllers/login.route.js

const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
    response.render("connexion", { content: [] });
});

//THE SESSION
const userRepo = require("../utils/users.repository");
//const citiesRepo = require("../utils/cities.repository")

router.post("/connexion", loginPostAction);
//router.get("/logout", logoutAction);
//sign in
//router.get("/add", addUser);
//router.post("/add/update", updateUser);

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
    response.render("login_view", { "content": myContent });
  }
}

function logoutAction(request, response) {
  request.logOut();
  response.redirect("/connexion");
}

/*
async function addUser(request, response){
  var newuser = await userRepo.getBlankUser();
  var cities = await citiesRepo.getAllCities();
  var myContent=[];
  response.render("sign_in", {"newuser": newuser, "cities":cities, "content": myContent})
}

async function updateUser(request, response){
  bool = await userRepo.checkIfExits(request.body.users_pseudo);
  if (bool != true){
    var newuser = await userRepo.getBlankUser();
    var cities = await citiesRepo.getAllCities();
    var myContent=[];
    myContent.push({ "message": "Votre nom d'utilisateur est déjà utilisé. Veuillez s'il vous plait en choisir un autre." });
    response.render( "sign_in", {"newuser": newuser, "cities":cities, "content": myContent});
  }
  else {
    var numRows = await userRepo.addOneUser(
        request.body.users_pseudo,
        request.body.users_pass,
        request.body.users_role,
        request.body.users_firstname,
        request.body.users_lastname,
        request.body.users_city,
        request.body.users_address,
        request.body.users_email,
        request.body.users_phone
    )
    request.session.flashMessage = "NEW USER: "+request.body.users_pseudo;
    response.redirect("/login");
  }
}
*/

module.exports = router;