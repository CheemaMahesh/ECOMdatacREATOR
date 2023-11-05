// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEpoEFpf3_9eX5-FQjLfZWzPxDZEJH0n8",
  authDomain: "newblogging-df52d.firebaseapp.com",
  projectId: "newblogging-df52d",
  storageBucket: "newblogging-df52d.appspot.com",
  messagingSenderId: "978621803195",
  appId: "1:978621803195:web:b49a27f676317f8a26579e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);