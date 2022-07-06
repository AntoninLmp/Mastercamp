//controllers/home.route.js
const express = require('express');
const router = express.Router();

router.get('/', homeRootAction);
//http://localhost:9000
function homeRootAction(response){
    response.render("home");
}

router.get('/contact', contactRootAction);
//http://localhost:9000
function contactRootAction(request, response){
    response.render("contact");
}

router.get('/aboutus', aboutusRootAction);
//http://localhost:9000
function aboutusRootAction(request, response){
    response.render("aboutus");
}

module.exports = router;