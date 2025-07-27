const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Load existing products
let products = JSON.parse(localStorage.getItem('products')) || [];
renderProducts();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const image = document.getElementById('productImage').value;

  const product = { name, price, image };
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));

  renderProducts();
  form.reset();
});

function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="80">
      <strong>${product.name}</strong> - $${product.price}
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    productList.appendChild(li);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}
