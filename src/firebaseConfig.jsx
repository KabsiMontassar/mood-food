import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuNwqxf2uSNVJaR97fmtg1qhGP4iesMv8",
  authDomain: "mood-and-food-3yrpfs.firebaseapp.com",
  projectId: "mood-and-food-3yrpfs",
  storageBucket: "mood-and-food-3yrpfs.appspot.com",
  messagingSenderId: "952704320280",
  appId: "1:952704320280:web:0af58b67eb9cf990cd146d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
