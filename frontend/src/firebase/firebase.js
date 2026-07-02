// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUPqoEPt-GMIqBqMQvza573CG7h72IJko",
  authDomain: "wellnessstudio-126ca.firebaseapp.com",
  projectId: "wellnessstudio-126ca",
  storageBucket: "wellnessstudio-126ca.firebasestorage.app",
  messagingSenderId: "454142792440",
  appId: "1:454142792440:web:14c3acf02b1fffa7ac210d",
  measurementId: "G-LJG87H2C02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
