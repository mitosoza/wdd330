export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  highlightActiveNav();
  resizeNavigation();

  const footerTemplate = await loadTemplate("footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function highlightActiveNav() {
  const navLinks = document.querySelectorAll(".navigation a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (href === "cart.html") return;
    if (href === currentPage) {
      link.classList.add("active");
    }
    if ((currentPage === "" || currentPage === "index.html") && href === "index.html") {
      link.classList.add("active");
    }
  });
}

export function resizeNavigation() {
  const mainnav = document.querySelector('.navigation');
  const hambutton = document.querySelector('#navigation-menu');

  hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
  });
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  alert.addEventListener('click', function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll)
    window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function loadCarCards(carsList) {
  const container = document.getElementById('car-cards-container');
  if (!container) return;

  container.innerHTML = '';
  const rows = Math.ceil(carsList.length / 3);
  for (let row = 0; row < rows; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'car-row';
    for (let col = 0; col < 3; col++) {
      const car = carsList[row * 3 + col];
      if (!car) continue;
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <a href="car_details.html?carId=${car.id}">
          <div><img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" loading="lazy"/></div>
          <div class="car-title"><h2>${car.year} ${car.make} ${car.model}</h2></div>
          <div class="car-field"><span class="car-label">Make</span><span class="car-value">${car.make}</span></div>
          <div class="car-field"><span class="car-label">Model</span><span class="car-value">${car.model}</span></div>
          <div class="car-field"><span class="car-label">Year</span><span class="car-value">${car.year}</span></div>
          <div class="car-field"><span class="car-label">Type</span><span class="car-value">${car.type}</span></div>
          <div class="car-field"><span class="car-label">Price</span><span class="car-value">$${car.price.toLocaleString()}</span></div>
          <div class="car-field"><span class="car-label">Miles</span><span class="car-value">${car.miles.toLocaleString()}</span></div>
          <div class="car-field"><span class="car-label">Transmission</span><span class="car-value">${car.transmission}</span></div>
          <div class="car-field"><span class="car-label">Drivetrain</span><span class="car-value">${car.drivetrain}</span></div>
          <div class="car-field"><span class="car-label">Title</span><span class="car-value">${car.title}</span></div>
        </a>
      `;
      rowDiv.appendChild(card);
    }
    container.appendChild(rowDiv);
  }
}

export function loadCarDetails(carDetails) {
  const container = document.getElementById('car-details-container');
  if (!container) return;

  container.innerHTML = `
    <div class="car-details-row">
      <div class="car-details-image-col">
        <img src="${carDetails.image}" alt="${carDetails.year} ${carDetails.make} ${carDetails.model}" width="650" height="488" style="object-fit:cover;"/>
      </div>
      <div class="car-details-info-col">
        <h1 class="car-details-title">${carDetails.year} ${carDetails.make} ${carDetails.model}</h1>
        <div class="car-details-price">$${carDetails.price.toLocaleString()}</div>
        <div class="car-details-fields">
          <div class="car-field"><span class="car-label">Type</span><span class="car-value">${carDetails.type}</span></div>
          <div class="car-field"><span class="car-label">Miles</span><span class="car-value">${carDetails.miles.toLocaleString()}</span></div>
          <div class="car-field"><span class="car-label">Transmission</span><span class="car-value">${carDetails.transmission}</span></div>
          <div class="car-field"><span class="car-label">Drivetrain</span><span class="car-value">${carDetails.drivetrain}</span></div>
          <div class="car-field"><span class="car-label">Title</span><span class="car-value">${carDetails.title}</span></div>
        </div>
        <button id="addToCart">Add to Cart</button>
      </div>
    </div>
  `;
}