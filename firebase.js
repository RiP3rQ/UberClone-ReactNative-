// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXbr4qy0E2du9moA226auQXBDsY7VOxHA",
  authDomain: "uber-clone-yt-a4d8c.firebaseapp.com",
  projectId: "uber-clone-yt-a4d8c",
  storageBucket: "uber-clone-yt-a4d8c.appspot.com",
  messagingSenderId: "653390768109",
  appId: "1:653390768109:web:64b28b1a0697b1297869e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
