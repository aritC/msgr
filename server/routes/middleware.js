const express = require("express");
const router = express.Router();

const { test } = require("./tester.js");
const { signup, signin } = require("./users.js");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

router.route("/testing").post(test);

module.exports = router;
