const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

let app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.use("/api/auth", require("./routes/routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
