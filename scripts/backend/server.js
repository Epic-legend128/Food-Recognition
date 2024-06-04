import express, { json } from 'express';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config.js";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "/.."));
app.use(express.static(path.join(__dirname, '/..')));

app.set("view engine", "ejs");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
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
import { getFirestore, updateDoc, getDoc, doc } from "firebase/firestore/lite";

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
const COLLECTION_NAME = "Food";

let session;
//const classNames = ["Apples_0%", "Apples_100%", "Apples_25%", "Apples_50%", "Apples_75%", "Pasta_100%", "Pasta_25%", "Pasta_50%", "Pasta_75%", "bread 100%", "bread 25%", "bread 50%", "bread 75%", "bread 85%"];
const classNames = ["Apples_0%", "Apples_100%", "Apples_25%", "Apples_50%", "Apples_75%", "Pasta_100%", "Pasta_25%", "Pasta_50%", "Pasta_75%", "bread_100%", "bread_25%", "bread_50%", "bread_75%", "bread_85%"];


app.post("/image", async (req, res) => {
    let data = req.body.img_data;

    console.log(data);

    var base64Data = data.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("inp/inp.png", base64Data, 'base64', function(err) {
        console.log(err);
    });

    let docRef = await doc(db, COLLECTION_NAME, process.env.TOTAL_WASTE);
    let d = await getDoc(docRef);
    d = d.data();
    let adjustedData = [];
    dataWithClassNames.forEach(pair => {
        let key = pair.className;
        if (pair.probability > 0.6) {
            let num = key.match("_.*")[0].substring(1);
            let actualKey = key.match("^.*_")[0];
            actualKey = actualKey.substring(0, actualKey.length - 1);
            if (d.hasOwnProperty(actualKey)) d[actualKey] += parseInt(num);
            else d[actualKey] = parseInt(num);

            adjustedData.push(key);
        }
    });
    await updateDoc(docRef, d);

    docRef = await doc(db, COLLECTION_NAME, process.env.CASE_FOOD);
    d = await getDoc(docRef);
    d = d.data();
    let len = Object.keys(d).length;
    let newData = {
        [((len+1).toString())]: adjustedData
    };
    await updateDoc(docRef, newData);
    res.render("ejs/foodRecognition.ejs", {
        hasData: true,
        imageClassData: dataWithClassNames
    });
});
