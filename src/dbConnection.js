// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuj-z5JbShUcDIwuPfCRYFO6irZfaFTF4",
  authDomain: "rickandmorty-d79f1.firebaseapp.com",
  databaseURL: "https://rickandmorty-d79f1-default-rtdb.firebaseio.com",
  projectId: "rickandmorty-d79f1",
  storageBucket: "rickandmorty-d79f1.appspot.com",
  messagingSenderId: "934666658505",
  appId: "1:934666658505:web:cfca67bee18f29421de318",
  measurementId: "G-M2BN369YWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
