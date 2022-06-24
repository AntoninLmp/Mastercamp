//controllers/patient.route.js

const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

router.get("/", auth.checkAuthentication("PATIENT"), studentHomeAction);
async function studentHomeAction(request, response){
  let userData = await userRepo.getOneUser(request.user.email);
  console.log(userData);
  console.log(request.user.email);
  response.send("ok");
}

/*
const express = require("express");
const router = express.Router();
//const ordonnanceRepo = require('../utils/ordonnance.repository');


router.get("/", async function (request, response) {
    console.log(request.session.passport);
    console.log(request.isAuthenticated());
    console.log(express.User);
    var myContent = [];
    //var ordonnance = await ordonnanceRepo.getAllOrdonnance()
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    //response.render("patient_home.ejs", { "ordonnances": ordonnance, "flashMessage": flashMessage });
    response.send("OKAY");
});*/


module.exports = router;