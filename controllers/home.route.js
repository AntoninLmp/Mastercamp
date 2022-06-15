//controllers/home.route.js
const express = require('express');
const router = express.Router();

router.get('/', homeRootAction);
//http://localhost:9000
function homeRootAction(response) {
    response.render("home");
}

module.exports = router;