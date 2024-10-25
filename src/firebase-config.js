// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB49dcskh5hXZYI7lUhH4f3wXUthXqpznQ",
  authDomain: "contact-us-387f1.firebaseapp.com",
  projectId: "contact-us-387f1",
  storageBucket: "contact-us-387f1.appspot.com",
  messagingSenderId: "146167749806",
  appId: "1:146167749806:web:fe7c40929d4658da9a213f",
  measurementId: "G-3X2BS5M2T6",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions };
