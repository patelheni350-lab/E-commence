
const products = [
  {
    id: 1,
    name: "Relaxed Cotton Shirt",
    category: "Women",
    price: 1299,
    oldPrice: 1799,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=80",
    badge: "NEW"
  },
  {
    id: 2,
    name: "Everyday Denim Jacket",
    category: "Men",
    price: 1999,
    oldPrice: 2599,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
    badge: "SALE"
  },
  {
    id: 3,
    name: "Minimal Gold Earrings",
    category: "Accessories",
    price: 499,
    oldPrice: 799,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    badge: "NEW"
  },
  {
    id: 4,
    name: "Classic Weekend Bag",
    category: "Accessories",
    price: 1499,
    oldPrice: 1999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    badge: "POPULAR"
  },
  {
    id: 5,
    name: "Soft Knit Sweater",
    category: "Women",
    price: 1499,
    oldPrice: 1999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",
    badge: "SALE"
  },
  {
    id: 6,
    name: "Modern Everyday Sneakers",
    category: "Men",
    price: 2199,
    oldPrice: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    badge: "POPULAR"
  },
  {
    id: 7,
    name: "Slim Frame Sunglasses",
    category: "Accessories",
    price: 599,
    oldPrice: 899,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    badge: "NEW"
  },
  {
    id: 8,
    name: "Casual Summer Dress",
    category: "Women",
    price: 1799,
    oldPrice: 2499,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
    badge: "SALE"
  },
  {
    id: 9,
    name: "Women Floral Blouse",
    category: "Women",
    price: 899,
    oldPrice: 1299,
    
image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80",


    badge: "NEW"
  },
  {
    id: 10,
    name: "Women High-Waist Jeans",
    category: "Women",
    price: 1199,
    oldPrice: 1699,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    badge: "SALE"
  },
  {
    id: 11,
    name: "Men Casual Cotton T-Shirt",
    category: "Men",
    price: 499,
    oldPrice: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    badge: "POPULAR"
  },
  {
    id: 12,
    name: "Men Slim-Fit Chinos",
    category: "Men",
    price: 999,
    oldPrice: 1499,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80",
    badge: "NEW"
  },
  {
    id: 13,
    name: "Women Crossbody Handbag",
    category: "Women",
    price: 1299,
    oldPrice: 1899,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    badge: "POPULAR"
  },
  {
    id: 14,
    name: "Men Lightweight Hoodie",
    category: "Men",
    price: 1199,
    oldPrice: 1799,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    badge: "SALE"
  }
];

let activeCategory = "All";
let searchTerm = "";
let cart = [];
let wishlist = [];
let toastTimer;
let showWishlistOnly = false;

const productGrid = document.getElementById("productGrid");
const cartDialog = document.getElementById("cartDialog");
const checkoutDialog = document.getElementById("checkoutDialog");
const orderSuccess = document.getElementById("orderSuccess");

// Indian Rupees
const money = amount =>
  "₹" + amount.toLocaleString("en-IN");

function renderProducts() {
  const shown = products.filter(product => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch =
      (product.name + " " + product.category)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesWish =
      !showWishlistOnly ||
      wishlist.includes(product.id);

    return matchesCategory &&
      matchesSearch &&
      matchesWish;
  });

  document.getElementById("resultMessage").textContent =
    `${shown.length} products found`;

  if (!shown.length) {
    productGrid.innerHTML =
      '<div class="empty-state">No products found. Try another search.</div>';
    return;
  }

  productGrid.innerHTML = shown.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}"
             alt="${product.name}"
             loading="lazy">

        ${product.badge
          ? `<span class="sale-badge">${product.badge}</span>`
          : ""}

        <button class="heart ${
          wishlist.includes(product.id) ? "liked" : ""
        }" data-wish="${product.id}">
          ${wishlist.includes(product.id) ? "♥" : "♡"}
        </button>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>

        <div class="price-row">
          <span class="price">${money(product.price)}</span>
          <span class="old-price">${money(product.oldPrice)}</span>
        </div>

        <button class="add-btn" data-add="${product.id}">
          Add to bag +
        </button>
      </div>
    </article>
  `).join("");
}

function updateCounts() {
  document.getElementById("cartCount").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("wishCount").textContent =
    wishlist.length;
}

function notify(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function addToCart(id) {
  const item = cart.find(row => row.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  updateCounts();
  renderCart();
  notify("Product added to your shopping bag!");
}

function toggleWish(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    notify("Removed from wishlist.");
  } else {
    wishlist.push(id);
    notify("Added to wishlist!");
  }

  updateCounts();
  renderProducts();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  if (!cart.length) {
    cartItems.innerHTML =
      '<div class="cart-empty">Your bag is empty.<br>Find something you love!</div>';
  } else {
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);

      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">

          <div>
            <h3>${product.name}</h3>
            <p>${money(product.price)}</p>

            <div class="qty-controls">
              <button data-qty="${item.id}" data-change="-1">−</button>
              <span>${item.quantity}</span>
              <button data-qty="${item.id}" data-change="1">+</button>
            </div>
          </div>

          <button class="remove-btn" data-remove="${item.id}">
            Remove
          </button>
        </div>
      `;
    }).join("");
  }

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  document.getElementById("cartTotal").textContent =
    money(total);

  const checkoutTotal =
    document.getElementById("checkoutTotal");

  if (checkoutTotal) {
    checkoutTotal.textContent = money(total);
  }
}

// Product buttons
productGrid.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const wish = event.target.closest("[data-wish]");

  if (add) addToCart(Number(add.dataset.add));
  if (wish) toggleWish(Number(wish.dataset.wish));
});

// Category filters
document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  showWishlistOnly = false;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts();
});

// Search
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();

  searchTerm =
    document.getElementById("searchInput").value.trim();

  renderProducts();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("searchInput").addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

// Wishlist
document.getElementById("wishlistButton").addEventListener("click", () => {
  showWishlistOnly = !showWishlistOnly;
  activeCategory = "All";

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle(
      "active",
      filter.dataset.category === "All"
    );
  });

  renderProducts();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });

  notify(showWishlistOnly
    ? "Showing your wishlist."
    : "Showing all products.");
});

// Open and close cart
document.getElementById("cartButton").addEventListener("click", () => {
  renderCart();
  cartDialog.showModal();
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartDialog.close();
});

// Quantity and remove buttons
document.getElementById("cartItems").addEventListener("click", event => {
  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");

  if (qty) {
    const item = cart.find(
      row => row.id === Number(qty.dataset.qty)
    );

    if (item) {
      item.quantity += Number(qty.dataset.change);

      if (item.quantity <= 0) {
        cart = cart.filter(row => row.id !== item.id);
      }
    }

    updateCounts();
    renderCart();
  }

  if (remove) {
    cart = cart.filter(
      row => row.id !== Number(remove.dataset.remove)
    );

    updateCounts();
    renderCart();
  }
});

// Checkout
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    notify("Please add a product to your bag first.");
    return;
  }

  renderCart();
  cartDialog.close();
  checkoutDialog.showModal();
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutDialog.close();
});

// Place order
document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    checkoutDialog.close();
    notify("Your shopping bag is empty.");
    return;
  }

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const name =
    document.getElementById("customerName").value.trim();

  const payment =
    form.querySelector('input[name="paymentMethod"]:checked');

  if (!payment) {
    notify("Please select a payment method.");
    return;
  }

  const orderId = "AN" + Date.now().toString().slice(-8);

  document.getElementById("orderMessage").textContent =
    `Thank you, ${name}! Your order has been confirmed successfully.`;

  document.getElementById("orderNumber").textContent =
    `Order ID: ${orderId} | Payment method: ${payment.value}`;

  cart = [];
  updateCounts();
  renderCart();
  form.reset();

  checkoutDialog.close();
  orderSuccess.showModal();
});

// Finish shopping
document.getElementById("finishOrder").addEventListener("click", () => {
  orderSuccess.close();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();

  const email =
    document.getElementById("emailInput").value.trim();

  document.getElementById("newsletterMessage").textContent =
    `Thank you! ${email} has been added to our newsletter.`;

  event.target.reset();
});

// Mobile menu
document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

// Navigation category links
document.querySelectorAll("[data-nav-category]").forEach(link => {
  link.addEventListener("click", () => {
    activeCategory = link.dataset.navCategory;
    showWishlistOnly = false;

    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.toggle(
        "active",
        filter.dataset.category === activeCategory
      );
    });

    renderProducts();
    document.getElementById("nav").classList.remove("open");
  });
});

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Initial display
renderProducts();
updateCounts();
renderCart();
