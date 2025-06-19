import { renderListWithTemplate, setLocalStorage, getLocalStorage } from "./utils.mjs";

function CartCardTemplate(item) {
  return `<li class="cart-card divider" data-id="${item.id}">
    <a href="car_details.html?carId=${item.id}">
      <div class="cart-card-row">
        <div class="cart-card-image-col">
          <img src="${item.image}" alt="${item.year} ${item.make} ${item.model}" width="250" height="auto" style="object-fit:cover;"/>
        </div>
        <div class="cart-card-info-col">
          <button class="cart-remove-btn" title="Remove from cart" type="button">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <h2 class="cart-card-title">${item.year} ${item.make} ${item.model}</h2>
          <div class="cart-card-fields">
            <div class="cart-field"><span class="cart-label">Type</span><span class="cart-value">${item.type}</span></div>
            <div class="cart-field"><span class="cart-label">Miles</span><span class="cart-value">${item.miles.toLocaleString()}</span></div>
            <div class="cart-field"><span class="cart-label">Transmission</span><span class="car-value">${item.transmission}</span></div>
            <div class="cart-field"><span class="cart-label">Drivetrain</span><span class="car-value">${item.drivetrain}</span></div>
            <div class="cart-field"><span class="cart-label">Title</span><span class="car-value">${item.title}</span></div>
            <div class="cart-field"><span class="cart-label">Price</span><span class="car-value">$${item.price.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </a>
  </li>`;
}

function renderEmptyCartMessage() {
  const emptyCartMessage = `
    <div class="cart-card__empty">
      <img src="/images/shopping-cart.jpeg" alt="shopping cart">
      <h2>Your cart is empty</h2>
      <p>
        Looks like you haven't added<br>
        anything to your cart yet.
      </p>
      <div class="cart-card__button">
        <a href="index.html" class="goHome">
          <button>Go Home</button>
        </a>
      </div>
    </div>
  `;
  const listElement = document.querySelector(".cart-list");
  listElement.innerHTML = emptyCartMessage;
}

export default class ShoppingCart {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    if (this.dataSource.length === 0) {
      renderEmptyCartMessage();
    } else {
      this.renderList(this.dataSource);
      this.addRemoveListeners();
      this.updateCartTotal();
    }
  }

  renderList(list) {
    renderListWithTemplate(CartCardTemplate, this.listElement, list);
  }

  updateCartTotal() {
    console.log("Updating cart total...");
    const cartItems = getLocalStorage("aww-cart") || [];
    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");
    if (cartItems.length > 0) {
      cartTotal.textContent = `Total: $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      cartFooter.hidden = false;
    } else {
      cartFooter.hidden = true;
      renderEmptyCartMessage();
    }
  }

  addRemoveListeners() {
    const removeBtns = this.listElement.querySelectorAll('.cart-remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.cart-card');
        const carId = parseInt(card.getAttribute('data-id'));
        let cartItems = getLocalStorage("aww-cart") || [];
        cartItems = cartItems.filter(item => item.id !== carId);
        setLocalStorage("aww-cart", cartItems);
        card.remove();
        this.updateCartTotal();
      });
    });
  }
}
