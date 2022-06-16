//controllers/inscription.route.js
const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.render("inscription_choix");
});

module.exports = router;