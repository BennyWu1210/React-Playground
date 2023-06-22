import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // HIDE API KEY
  authDomain: "react-playground-387214.firebaseapp.com",
  databaseURL: "https://react-playground-387214-default-rtdb.firebaseio.com",
  projectId: "react-playground-387214",
  storageBucket: "react-playground-387214.appspot.com",
  messagingSenderId: "728484844706",
  appId: "1:728484844706:web:38bb7fa2456bad7ffcb3fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
