let products = [];

function addProduct() {
  const form = document.getElementById("product-form");
  const formData = new FormData(form);
  const product = {};

  for (const [key, value] of formData.entries()) {
    if (value.trim()) product[key] = value.trim();
  }

  // Simple validation
  const requiredFields = ['item_type', 'brand', 'category', 'sub_category', 'size', 'color', 'price', 'image_url'];
  for (const field of requiredFields) {
    if (!product[field]) {
      alert(`Field ${field} is required.`);
      return;
    }
  }

  products.push(product);
  renderProducts();
  form.reset();
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = '';
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded shadow";
    div.innerText = `#${i + 1}: ${p.brand} - ${p.category} - ${p.sub_category} - ${p.size} - ₹${p.price}`;
    list.appendChild(div);
  });
}

async function submitAll() {
  if (!products.length) {
    alert("No products to submit");
    return;
  }

  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.innerText = "Submitting...";

  const res = await fetch('https://script.google.com/macros/s/AKfycbzb4hDipTZHs-i_8QkKUlPubBTB-RB8OxJGbq_uIWm2B_omoquYOxiTSSO68soe4Cqh/exec', {
    method: "POST",
    body: JSON.stringify({ records: products }),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  alert(`Submitted ${result.added} products successfully`);
  products = [];
  renderProducts();
  btn.disabled = false;
  btn.innerText = "Submit All";
}
