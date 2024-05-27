import express from 'express';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "/.."));
app.use(express.static(path.join(__dirname, '/..')));

app.set("view engine", "ejs");
app.use(express.json());

const allowedPages = ["home.ejs", "foodRecognition.ejs", "contact.ejs", "aboutUs.ejs"];

app.get("/", async (req, res) => {
    res.render("ejs/home.ejs");
});

app.get("/:id", async (req, res) => {
    if (allowedPages.includes(req.params.id)) {
        res.render("ejs/"+req.params.id, {
            hasData: false
        });
    }
    else {
        res.render("ejs/pageNotFound.ejs");
    }
});

app.get("/*", async (req, res) => {
    res.render("ejs/pageNotFound.ejs");
});


app.listen(PORT, _ => console.log("Listening on port: " + PORT));


import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const dbApp = initializeApp(firebaseConfig);

const db = getFirestore(dbApp);

app.post("/image", express.urlencoded(), async (req, res) => {
    let data = JSON.parse(req.body.img_data);

    res.render("ejs/foodRecognition.ejs", {
        hasData: true
    });
});