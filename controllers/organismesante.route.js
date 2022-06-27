//controllers/organismesante.route.js

const express = require("express");
const router = express.Router();
const auth = require("../utils/users.auth");
const ordonnanceRepo = require('../utils/ordonnance.repository');

router.get("/", auth.checkAuthentication("PHARMACIE"), function (request, response) {
    var ordonnance = [];
    var ordonnances = [];
    console.log(ordonnance.length);
    response.render("orgasante_home.ejs", { "ordonnance": ordonnance, "ordonnances": ordonnances});
});

router.post("/searchByIdOrdonnance", auth.checkAuthentication("PHARMACIE"), SearchByIdOrdonnance)
async function SearchByIdOrdonnance(request, response){
    var ordonnances = [];
    var ordonnance = await ordonnanceRepo.getOneOrdonnance(request.body.numeroOrdo);
    console.log(ordonnance);
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances});
};


router.post("/searchByPatientOrdonnance", auth.checkAuthentication("PHARMACIE"), searchByPatientOrdonnance)
async function searchByPatientOrdonnance(request, response){
    var ordonnance = [];
    var ordonnances = await ordonnanceRepo.getAllOrdonnanceByPatientBySecu(request.body.numeroSecu);
    console.log(ordonnances);
    response.render("orgasante_home", { "ordonnance": ordonnance, "ordonnances": ordonnances});
};

module.exports = router;