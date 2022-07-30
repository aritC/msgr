const connection = require("../db/db");
const { INSERT_USER } = require("../db/queries");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  let regEx = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const { username, emailId, password } = req.body;
  if (regEx.test(password)) {
    return res.status(400).json({ message: "Invalid Password Format" });
  }

  try {
    connection.connect(function (err) {
      if (err) throw err;
      user_id = uuidv4();
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const params = [user_id, username, emailId, hashedPassword];
        connection.query(INSERT_USER, params, function (err, result) {
          if (err) throw err;
          res.status(200).json({ message: "User creation sucessful" });
        });
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }
};
