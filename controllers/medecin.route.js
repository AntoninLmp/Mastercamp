//controllers/medecin.route.js

const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
    var myContent=[];
    console.log(request.user.email);
    response.render("medecin_home.ejs", { "content": myContent });
});

module.exports = router;