//controllers/home.route.js
const express = require('express');
const router = express.Router();

router.get('/', homeRootAction);
//http://localhost:9000
function homeRootAction(response) {
    response.render("home");
}

// router.get('/connexion', ShowConnexionPage);
// async function ShowConnexionPage(request, response) {
//     response.render("connexion");

// }
router.get("/connexion", (request, response) => {
    response.render("connexion");
});
router.get("/inscriptionsante", (request, response) => {
    response.render("inscription_sante");
});
router.get("/inscriptionpatient", (request, response) => {
    response.render("inscription_patient");
});
router.get("/inscriptionconsultant", (request, response) => {
    response.render("inscription_consultant");
});


module.exports = router;