// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
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

const db = getDatabase();



function insertData() {
    console.log("Here");
    let returnData = takePic();


    console.log(returnData)
}

$("#analyze-btn").click(_ => {
    console.log("Inside");    
    insertData();
})