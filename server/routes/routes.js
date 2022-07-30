const express = require("express");
const router = express.Router();

const { signup } = require("./auth.js");

router.route("/signup").post(signup);

module.exports = router;
