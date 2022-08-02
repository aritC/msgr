const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { verifyToken } = require("./routes/verifyToken");

require("dotenv").config();

let app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;
const version = process.env.API_VERSION;

app.use(`/api/${version}/auth`, require("./routes/auth"));
app.use(`/api/${version}/`, verifyToken, require("./routes/middleware"));
app.use("*", (req, res) => {
  res.status(404).json({ message: "Resource Not Found", url: req.baseUrl });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
