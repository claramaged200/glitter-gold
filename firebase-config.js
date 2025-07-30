// firebase-config.js

// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFfj86lbA6ObwFeN0ngQTtW-GWDg0tYnY",
  authDomain: "glitterandgoldshop.firebaseapp.com",
  projectId: "glitterandgoldshop",
  storageBucket: "glitterandgoldshop.appspot.com",
  messagingSenderId: "880466186545",
  appId: "1:880466186545:web:4fe7a55154989dfed16010",
  measurementId: "G-SRT30JGMJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
