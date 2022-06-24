const express = require("express");
const router = express.Router();

const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

router.get("/", auth.checkAuthentication("PATIENT"), studentHomeAction);
async function studentHomeAction(request, response){
  let userData = await userRepo.getOneUser(request.user.email);
  console.log(userData);
  console.log(request.user.email);
  response.send("ok");
}


module.exports = router;