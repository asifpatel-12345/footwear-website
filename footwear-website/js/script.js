// ----- Product data (edit this list to add your own shoes) -----
const products = [
  { id: 1, name: "Cloud Runner",  cat: "Sneakers", price: 2499, color: "#2447F5" },
  { id: 2, name: "Street Low",    cat: "Sneakers", price: 1899, color: "#E4572E" },
  { id: 3, name: "Court White",   cat: "Sneakers", price: 2199, color: "#4B5563" },
  { id: 4, name: "Oxford Classic",cat: "Formal",   price: 3299, color: "#5A3825" },
  { id: 5, name: "Derby Black",   cat: "Formal",   price: 2999, color: "#1F2937" },
  { id: 6, name: "Beach Slide",   cat: "Sandals",  price: 799,  color: "#0EA5A4" },
  { id: 7, name: "Trail Strap",   cat: "Sandals",  price: 1199, color: "#8A6F3B" },
  { id: 8, name: "Ridge Boot",    cat: "Boots",    price: 3799, color: "#7C4A21" },
  { id: 9, name: "Chelsea Boot",  cat: "Boots",    price: 3499, color: "#2B2B2B" }
];

let cart = JSON.parse(localStorage.getItem("strideCart") || "[]");
let activeCat = "All";

const $ = (id) => document.getElementById(id);
const money = (n) => "₹" + n.toLocaleString("en-IN");
const shoeSvg = (color) => `<svg style="color:${color}" aria-hidden="true"><use href="#shoe"/></svg>`;

function renderProducts() {
  const list = activeCat === "All" ? products : products.filter(p => p.cat === activeCat);
  $("productGrid").innerHTML = list.map(p => `
    <article class="card">
      <div class="card-img">${shoeSvg(p.color)}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <span class="cat">${p.cat}</span>
        <div class="card-foot">
          <span class="price">${money(p.price)}</span>
          <button class="add" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>`).join("");
}

function saveCart() { localStorage.setItem("strideCart", JSON.stringify(cart)); }

function renderCart() {
  const box = $("cartItems");
  if (!cart.length) {
    box.innerHTML = '<p class="empty">Your cart is empty. Pick a pair you like.</p>';
  } else {
    box.innerHTML = cart.map(i => {
      const p = products.find(x => x.id === i.id);
      return `
      <div class="cart-row">
        <div class="thumb">${shoeSvg(p.color)}</div>
        <div>
          <h4>${p.name}</h4>
          <div>${money(p.price)}</div>
          <div class="qty">
            <button data-act="dec" data-id="${p.id}" aria-label="Decrease quantity">−</button>
            <span>${i.qty}</span>
            <button data-act="inc" data-id="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="remove" data-act="rm" data-id="${p.id}">Remove</button>
      </div>`;
    }).join("");
  }
  const total = cart.reduce((s, i) => s + products.find(x => x.id === i.id).price * i.qty, 0);
  $("cartTotal").textContent = money(total);
  $("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function openCart(open) {
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("show", open);
  $("drawer").setAttribute("aria-hidden", String(!open));
}

// ----- Events -----
$("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeCat = btn.dataset.cat;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === btn));
  renderProducts();
});

$("productGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  saveCart(); renderCart(); openCart(true);
});

$("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const item = cart.find(i => i.id === id);
  if (btn.dataset.act === "inc") item.qty++;
  if (btn.dataset.act === "dec") item.qty--;
  if (btn.dataset.act === "rm" || item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
});

$("openCart").addEventListener("click", () => openCart(true));
$("closeCart").addEventListener("click", () => openCart(false));
$("overlay").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });
$("checkout").addEventListener("click", () => {
  if (!cart.length) return alert("Your cart is empty.");
  alert("Thank you! This is a demo project, so no real payment is taken.");
  cart = []; saveCart(); renderCart(); openCart(false);
});

$("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
