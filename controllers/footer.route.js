const express = require("express");
const router = express.Router();

router.get('/', footerRootAction);
//http://localhost:9000
function footerRootAction(response){
    response.redirect("/home");
}

router.get('/contact', contactRootAction);
//http://localhost:9000
function contactRootAction(request, response){
    response.render("contact");
}

module.exports = router;