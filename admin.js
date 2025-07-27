// admin.js

let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${product.name}</strong> - ${product.price} EGP<br>
      <img src="${product.image}" width="100"><br>
      <button onclick="deleteProduct(${index})">🗑 Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    saveProducts();
  }
}

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const fileInput = document.getElementById('productImage');
  const file = fileInput.files[0];

  if (!file) return alert("Please select an image.");

  const reader = new FileReader();
  reader.onload = function(event) {
    const image = event.target.result;

    products.push({ name, price, image });
    saveProducts();
    document.getElementById('productForm').reset();
  };

  reader.readAsDataURL(file);
});

renderProducts();
