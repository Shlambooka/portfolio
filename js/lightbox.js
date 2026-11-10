
// Lightbox: open on thumbnail click
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');

// Build arrays of all full-size images and their alt text
const galleryImages = document.querySelectorAll('.design-thumb');

// Check if we are on a small screen (850px or less)
const isMobile = window.innerWidth <= 850;

// Pick the right array of images based on the screen size
const imageSources = [...galleryImages].map(btn => {
  const img = btn.querySelector('img');
  return isMobile ? (img.dataset.fullMobile || img.dataset.full) : img.dataset.full;
});
const imageAlts = [...galleryImages].map(btn => btn.querySelector('img').alt);

let currentIndex = 0;

galleryImages.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentIndex = index;
    lightboxImg.src = imageSources[currentIndex];
    lightboxImg.alt = imageAlts[currentIndex];
    lightbox.hidden = false;
  });
});

// Lightbox: next / previous buttons
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
  lightboxImg.alt = imageAlts[currentIndex];
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
  lightboxImg.alt = imageAlts[currentIndex];
});

// Lightbox: close button
const lightboxClose = lightbox.querySelector('.lightbox-close');

lightboxClose.addEventListener('click', () => {
  lightbox.hidden = true;
});

// Lightbox: close when clicking the dark background
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.hidden = true;
  }
});

// Lightbox: close on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) {
    lightbox.hidden = true;
  }
});

// Lightbox: arrow keys to navigate
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;

  if (event.key === 'ArrowRight') {
    lightboxNext.click();
  } else if (event.key === 'ArrowLeft') {
    lightboxPrev.click();
  }
});