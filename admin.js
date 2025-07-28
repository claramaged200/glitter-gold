import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Example usage
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

const productsCollection = collection(db, "products");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  try {
    await addDoc(productsCollection, {
      name,
      price,
      image
    });
    alert("✅ Product added!");
    productForm.reset();
    loadProducts(); // reload products after adding
  } catch (error) {
    console.error("Error adding product: ", error);
  }
});

async function loadProducts() {
  productList.innerHTML = "";
  const querySnapshot = await getDocs(productsCollection);
  querySnapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${product.name}</strong> - ${product.price} EGP<br>
      <img src="${product.image}" width="100"><br>
      <button data-id="${docSnap.id}">Delete</button>
    `;
    productList.appendChild(li);

    // Delete Button
    li.querySelector("button").addEventListener("click", async () => {
      await deleteDoc(doc(db, "products", docSnap.id));
      loadProducts();
    });
  });
}

loadProducts();
