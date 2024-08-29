// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz_YilGEqTkF_48nAnuWKxiOrH2Ulndec",
  authDomain: "mood-and-food-5d978.firebaseapp.com",
  projectId: "mood-and-food-5d978",
  storageBucket: "mood-and-food-5d978.appspot.com",
  messagingSenderId: "817879091325",
  appId: "1:817879091325:web:4dd96975f92abb90334914",
  measurementId: "G-KTYRCPSSZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);