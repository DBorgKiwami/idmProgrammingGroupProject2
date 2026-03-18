var http = require("http");

const PORT = 3000;
const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./routes/routes");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"./views"));

app.use(routes);
app.listen(PORT);

console.log(`Server running on http://localhost:${PORT}`);