//controllers/medecin.route.js

const express = require("express");
const router = express.Router();
const auth = require("../utils/users.auth");

router.get("/", auth.checkAuthentication("MEDECIN"), function (request, response) {
    var myContent=[];
    console.log(request.user.email);
    response.render("medecin_home.ejs", { "content": myContent });
});

module.exports = router;