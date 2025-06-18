import { loadCarCards } from './utils.mjs';

async function getCarsList() {
  const response = await fetch('/data/car-data.json');
  const carsList = await response.json();
  loadCarCards(carsList);
}

getCarsList()