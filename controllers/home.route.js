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
router.get("/inscription", (request, response) => {
    response.render("inscription");
});


module.exports = router;