import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBbMhvl909RlREY9anM8XrZm3uu6-ilOaM",
  authDomain: "notesapp-32b8c.firebaseapp.com",
  projectId: "notesapp-32b8c",
  storageBucket: "notesapp-32b8c.appspot.com",
  messagingSenderId: "1013925431650",
  appId: "1:1013925431650:web:9b48a0f8889742c930043b",
  measurementId: "G-VQWNWW89NS"
};

export const app = initializeApp(firebaseConfig);
