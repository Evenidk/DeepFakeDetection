// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKOKcp8gcSvPk3ptQ87MqF4JyZLOmJhs0",
  authDomain: "deepfake-detection-69814.firebaseapp.com",
  projectId: "deepfake-detection-69814",
  storageBucket: "deepfake-detection-69814.appspot.com",
  messagingSenderId: "19784161815",
  appId: "1:19784161815:web:6d0cb860de140938d3da52",
  measurementId: "G-Z3DLE63291"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);