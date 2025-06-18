// Coordinates for 123 Main Street, Bountiful, Utah
const DEST_LAT = 40.8894;
const DEST_LON = -111.8808;

const map = L.map('map').setView([DEST_LAT, DEST_LON], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([DEST_LAT, DEST_LON]).addTo(map)
  .bindPopup('123 Main Street, Bountiful, Utah (Future Location)').openPopup();

// Directions button
document.getElementById('directions-btn').addEventListener('click', () => {
  const dest = encodeURIComponent('123 Main Street, Bountiful, Utah');
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
});
