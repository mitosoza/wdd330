import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("aww-cart") || [];
  const cartListeElement = document.querySelector(".cart-list");
  const cartList = new ShoppingCart(cartItems, cartListeElement);

  cartList.init();
}

renderCartContents();
