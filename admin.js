// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFfj86lbA6ObwFeN0ngQTtW-GWDg0tYnY",
  authDomain: "glitterandgoldshop.firebaseapp.com",
  projectId: "glitterandgoldshop",
  storageBucket: "glitterandgoldshop.appspot.com",
  messagingSenderId: "880466186545",
  appId: "1:880466186545:web:4fe7a55154989dfed16010",
  measurementId: "G-SRT30JGMJF"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Handle form submission
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageFile = document.getElementById("productImage").files[0];

  if (!name || !price || !imageFile) {
    alert("Please fill all fields");
    return;
  }

  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Save product to Firestore
    await addDoc(collection(db, "products"), {
      name,
      price,
      image: imageUrl
    });

    alert("✅ Product added successfully!");
    document.getElementById("productForm").reset();
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Failed to add product.");
  }
});
