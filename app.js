var http = require("http");

const bodyparser = require('body-parser')
const PORT = 3000;
const express = require("express");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv").config();
const path = require("path");

// 1. New Import: express-session for keeping users logged in
const session = require("express-session"); 
const routes = require("./routes/routes");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./scripts")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// 2. New Middleware: Initialize Session
app.use(session({
    secret: 'gamehub_secret_key', // A secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// 3. New Middleware: Global User Variable
// This makes "user" available in every EJS file automatically
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


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
