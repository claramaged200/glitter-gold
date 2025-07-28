// Import Firebase SDK modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
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

// Reference to HTML elements
const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Handle form submission
form.addEventListener('submit', async (e) => {
    console.log("Form submitted");

  e.preventDefault();
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const imageFile = document.getElementById('productImage').files[0];

  if (!imageFile) {
    alert("Please select an image.");
    return;
  }

  // Upload image to Firebase Storage
  const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  // Add product data to Firestore
  await addDoc(collection(db, "products"), {
    name,
    price,
    imageUrl
  });

  alert("Product added successfully!");
  form.reset();
  loadProducts(); // Refresh product list
});

// Load products from Firestore
async function loadProducts() {
  productList.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach(docSnap => {
    const product = docSnap.data();
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" width="100" />
      <strong>${product.name}</strong> - ${product.price} EGP
      <button onclick="deleteProduct('${docSnap.id}')">Delete</button>
    `;
    productList.appendChild(li);
  });
}

// Delete a product
window.deleteProduct = async function(id) {
  await deleteDoc(doc(db, "products", id));
  alert("Product deleted");
  loadProducts();
};

// Initial load
loadProducts();
