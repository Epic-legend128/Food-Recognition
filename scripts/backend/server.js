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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJZxPt5j7msnqWGtzrTGOx8weMSdxzuGo",
  authDomain: "food-recognition-8ec7e.firebaseapp.com",
  projectId: "food-recognition-8ec7e",
  storageBucket: "food-recognition-8ec7e.appspot.com",
  messagingSenderId: "525065813681",
  appId: "1:525065813681:web:bc9d141d82bc9556a62c90",
  measurementId: "G-YJ67Z3X6XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);