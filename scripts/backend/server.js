const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyparser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "/.."));
app.use(express.static(path.join(__dirname, '/..')));

app.set("view engine", "ejs");
app.use(express.json());

const allowedPages = ["home", "foodRecognition"];

app.get("/", async (req, res) => {
    console.log("Inside");
    res.render("ejs/home.ejs");
});

app.get("/:id", async (req, res) => {
    if (allowedPages.includes(req.params.id)) {
        res.render("ejs/"+req.params.id+".ejs");
    }
    else {
        res.render("ejs/pageNotFound.ejs");
    }
});

app.get("/*", async (req, res) => {
    res.render("ejs/pageNotFound.ejs");
});


app.listen(PORT, _ => console.log("Listening on port: " + PORT));