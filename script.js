const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

let products = JSON.parse(localStorage.getItem('products')) || [];

function showProducts() {
  productList.innerHTML = '';
  products.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>${p.price} EGP</strong>
    `;
    productList.appendChild(div);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const desc = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const imageInput = document.getElementById('image');

  const reader = new FileReader();
  reader.onload = function () {
    const imageURL = reader.result;

    products.push({ name, description: desc, price, image: imageURL });
    localStorage.setItem('products', JSON.stringify(products));
    showProducts();
    form.reset();
  };

  reader.readAsDataURL(imageInput.files[0]);
});

showProducts();
