
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDL-Xw4TVbFM9yhfWzdpSRVj0FF2FaYdPo",
  authDomain: "healthy-coil-421013.firebaseapp.com",
  projectId: "healthy-coil-421013",
  storageBucket: "healthy-coil-421013.appspot.com",
  messagingSenderId: "149573219354",
  appId: "1:149573219354:web:382934475543e771f3cda3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default { db, auth };