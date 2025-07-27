import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// Load and show products
async function loadProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${product.image}" width="100">
      <h3>${product.name}</h3>
      <p>${product.price} EGP</p>
    `;
    productList.appendChild(div);
  });
}
loadProducts();
