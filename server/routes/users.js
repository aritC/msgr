const connection = require("../db/config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  CHECK_UNIQUE_USERNAME_AND_EMAIL,
  INSERT_USER,
  VALIDATE,
} = require("../db/queries");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  let regEx = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const { username, emailId, password } = req.body;

  if (!username || !emailId || !password) {
    return res.status(400).json({ message: "All fields must have value" });
  }

  if (regEx.test(password)) {
    return res.status(400).json({ message: "Invalid Password Format" });
  }

  try {
    user_id = uuidv4();
    alreadyExists = false;

    connection.query(
      CHECK_UNIQUE_USERNAME_AND_EMAIL,
      [username, username],
      (err, results) => {
        if (err) throw err;
        if (results.length !== 0) {
          return res
            .status(400)
            .json({ message: "Username / Email Id already Exists" });
        } else {
          bcrypt.hash(password, 10).then((hashedPassword) => {
            const params = [user_id, username, emailId, hashedPassword];
            connection.query(INSERT_USER, params, (err) => {
              if (err) throw err;
              return res
                .status(200)
                .json({ message: "User creation sucessful" });
            });
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      message: "User creation failed",
      error: error.mesage,
    });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username / Password cannot be empty" });
  }

  try {
    connection.query(VALIDATE, [username, username], (err, results) => {
      if (err) throw err;
      if (
        results.length == 1 &&
        bcrypt.compareSync(password, results[0].password)
      ) {
        token = jwt.sign(
          {
            userId: results[0].userId,
            username: results[0].username,
            emailId: results[0].emailId,
          },
          process.env.SECRET,
          { expiresIn: 60 } //60 seconds
        );

        return res.status(200).json({
          message: "Logged In",
          userId: results[0].userId,
          username: results[0].username,
          emailId: results[0].emailId,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "User Login Failed",
      error: err.mesage,
    });
  }
};
