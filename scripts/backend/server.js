const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyparser = require("body-parser");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "/.."));
app.use(express.static(path.join(__dirname, '/..')));

app.set("view engine", "ejs");
app.use(express.json());

app.get("/", async (req, res) => {
    console.log("Inside");
    res.render("ejs/index.ejs");
});

app.listen(PORT, _ => console.log("Listening on port: " + PORT));