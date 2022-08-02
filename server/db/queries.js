exports.GET_ALL_USERS = "SELECT * FROM users";
exports.CHECK_UNIQUE_USERNAME_AND_EMAIL =
  "SELECT username FROM users where username = ? or email_id= ?";
exports.INSERT_USER =
  "INSERT INTO users (user_id, username, email_id, password) VALUES (?,?,?,?)";
exports.VALIDATE =
  "SELECT username, password FROM users where username = ? or email_id= ?";
