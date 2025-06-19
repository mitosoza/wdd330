import { loadCarDetails, getParam, getLocalStorage, setLocalStorage } from './utils.mjs';

async function getCarDetails() {
  const response = await fetch('data/car-data.json');
  const cars = await response.json();

  // Pick car by Id
  const carId = getParam('carId');
  const carDetails = carId ? cars.find(car => car.id === parseInt(carId)) : null;
  if (carDetails) {
    loadCarDetails(carDetails);

    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
      const cartItems = getLocalStorage("aww-cart") || [];
      if (cartItems.some(item => item.id === carDetails.id)) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Already in Cart";
      } else {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener('click', () => addProductToCart(carDetails));
      }
    }
  }
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("aww-cart") || [];
  // Prevent duplicate by id
  if (!cartItems.some(item => item.id === product.id)) {
    cartItems.push(product);
    setLocalStorage("aww-cart", cartItems);
    // Disable button after adding
    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "Added to Cart";
    }
  }
  // Animate the cart icon
  const cartIcon = document.querySelector('.fa-cart-shopping');
  if (cartIcon) {
    cartIcon.classList.add('fa-beat');
    setTimeout(() => {
      cartIcon.classList.remove('fa-beat');
    }, 2000);
  }
}

getCarDetails();