//controllers/organismesante.route.js

const express = require("express");
const router = express.Router();
const auth = require("../utils/users.auth");
const ordonnanceRepo = require('../utils/ordonnance.repository');
const pharmaRepo = require('../utils/pharmacie.repository');


router.get("/", auth.checkAuthentication("PHARMACIE"), async function (request, response) {
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnances = [];
    var ordonnance =[];
    console.log(ordonnance.length);
    response.render("orgasante_home.ejs", {"ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie});
});

router.post("/searchByIdOrdonnance", auth.checkAuthentication("PHARMACIE"), SearchByIdOrdonnance)
async function SearchByIdOrdonnance(request, response){
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnances = [];
    var ordonnance = await ordonnanceRepo.getOneOrdonnance(request.body.numeroOrdo);
    console.log(ordonnance);
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie});
};


router.post("/searchByPatientOrdonnance", auth.checkAuthentication("PHARMACIE"), searchByPatientOrdonnance)
async function searchByPatientOrdonnance(request, response){
    var pharmacie = await pharmaRepo.getOnePharma(request.user.email);
    var ordonnance = [];
    var ordonnances = await ordonnanceRepo.getAllOrdonnanceByPatientBySecu(request.body.numeroSecu);
    console.log(ordonnances);
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances, "pharma": pharmacie});
};

router.post("/updatePharmacie", auth.checkAuthentication("PHARMACIE"), updateUser);
async function updateUser(request, response) {
    pharmaRepo.updatePharmacie(request.user.email, request.body.nom, request.body.numtel);
    response.redirect("/organismesante");
}

module.exports = router;