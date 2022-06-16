//controllers/inscription.route.js
const express = require('express');
const router = express.Router();

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
    response.render("inscription_organisme_sante");
});

module.exports = router;