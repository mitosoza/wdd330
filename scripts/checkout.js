import { getLocalStorage } from "./utils.mjs";

function renderCheckoutTotals() {
  const cartItems = getLocalStorage("aww-cart") || [];
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const subTotal = document.querySelector("#subTotal");
  const tax = document.querySelector("#tax");
  const shipping = document.querySelector("#shipping");
  const orderTotal = document.querySelector("#orderTotal");

  subTotal.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  tax.textContent = `$${(total * 0.07).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  shipping.textContent = `$${(total * 0.02).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  orderTotal.textContent = `$${(total + (total * 0.07) + (total * 0.02)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) {
    localStorage.removeItem("aww-cart");
    window.location.href = "thankyou.html";
  }
});

renderCheckoutTotals();