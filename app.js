var http = require("http");

const bodyparser = require('body-parser')
const PORT = 3000;
const express = require("express");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv").config();
const routes = require("./routes/routes");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"./views"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(fileupload({
    limits: {
        fileSize: 2000000000,
    },
    abortOnLimit: true,
    limitHandles: ()=>console.log("helhgerhregkjhegr")
})
);

app.use(routes);
app.listen(PORT);

console.log(`Server running on http://localhost:${PORT}`);