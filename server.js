const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringForOrdo130",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

//ADD athentification
const auth = require("./utils/utilisateur.auth");
auth.initialization(app);

app.listen(process.env.WEB_PORT,
    function () {
        console.log("Listen on " + process.env.WEB_PORT);
    }
);

app.get('/', (req, res) => {
    res.render("home");
});

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

//ADD the routes

app.use("/static", express.static(__dirname + '/static'));
app.use("/home", require("./controllers/home.route"));
app.use("/connexion", require("./controllers/connexion.route"));
