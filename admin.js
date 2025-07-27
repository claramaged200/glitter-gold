import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFfj86lbA6ObwFeN0ngQTtW-GWDg0tYnY",
  authDomain: "glitterandgoldshop.firebaseapp.com",
  projectId: "glitterandgoldshop",
  storageBucket: "glitterandgoldshop.firebasestorage.app",
  messagingSenderId: "880466186545",
  appId: "1:880466186545:web:4fe7a55154989dfed16010",
  measurementId: "G-SRT30JGMJF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add product
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  if (name && price && image) {
    await addDoc(collection(db, "products"), { name, price, image });
    alert("✅ Product added!");
    loadProducts(); // Refresh list
  }
});

// Load products
async function loadProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${product.image}" width="80">
      <strong>${product.name}</strong> - ${product.price} EGP
      <button onclick="deleteProduct('${docSnap.id}')">🗑 Delete</button>
    `;
    productList.appendChild(li);
  });
}
loadProducts();

// Delete product
window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};
