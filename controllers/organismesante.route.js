//controllers/organismesante.route.js

const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
    var myContent=[];
    console.log(request.user.email);
    response.render("orgasante_home.ejs", { "content": myContent });
});

module.exports = router;