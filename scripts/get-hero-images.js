const accessKey = '-fZrsDUc22ovCEmnXpy39NpYRfO5K_6XGD9U6BJvd6M';

export async function getHeroImageUrl() {
  const img = document.getElementById('hero-image');
  if (!img) return;
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?orientation=landscape&query=car&client_id=${accessKey}`
    );
    const data = await response.json();
    img.src = data.urls.regular;
    img.alt = data.alt_description || 'Car image';
  } catch (e) {
    img.alt = 'Failed to load car image';
  }
}

getHeroImageUrl();