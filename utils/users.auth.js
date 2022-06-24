const session = require("express-session");
const passport = require("passport");
const usersRepo = require("../utils/users.repository.js");

module.exports = {
    initialization(app) {
      app.use(passport.initialize());
      app.use(passport.session());
      passport.serializeUser(function (user, done) {
        done(null, user.email);
      });
      passport.deserializeUser(async function (email, done) {
        let user = await usersRepo.getOneUser(email);
        done(null, user);
      });
    },
    checkAuthentication(role) {
      return function (request, response, next) {
        if (request.isAuthenticated()) {
          if (role) {
            if (role === request.user.Role) { 
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