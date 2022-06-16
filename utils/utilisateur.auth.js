const session = require("express-session");
const passport = require("passport");
const utilisateurRepo = require("../utils/utilisateur.repository");

module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (utilisateur, done) {
      done(null, utilisateur.email);
    });
    passport.deserializeUser(async function (email, done) {
      let utilisateur = await utilisateurRepo.getOneUser(email);
      done(null, utilisateur);
    });
  },

  //Autentification
  checkAuthentication(role) {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        if (role) {
          if (role === request.utilisateur.role) { 
            return next();
          } else {
            return response.end("401 Unautorized");
          }
        } else {
          return next();
        }
      } else {
        response.redirect("/connexion");
      }
    }
  }
};