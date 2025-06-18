import { loadCarCards } from './utils.mjs';

async function getCarsList(count = 6) {
  const response = await fetch('data/car-data.json');
  const cars = await response.json();

  // Pick random IDs
  const ids = [];
  while (ids.length < count) {
    const rand = Math.floor(Math.random() * cars.length) + 1;
    if (!ids.includes(rand)) ids.push(rand);
  }
  const carsList = ids.map(id => cars.find(car => car.id === id)).filter(Boolean);
  loadCarCards(carsList);
}

getCarsList(9);