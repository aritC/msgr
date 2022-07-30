exports.GET_ALL_USERS = "SELECT * FROM users";
exports.CHECK_UNIQUE_EMAIL = "SELECT user_id FROM users where email_id=?";
exports.INSERT_USER =
  "INSERT INTO users (user_id, username, email_id, password) VALUES (?,?,?,?)";
exports.VALIDATE = "";
