// ==========================================
// LIGHTBOX
// ==========================================
const lightbox = document.getElementById('lightbox');

// Only run the lightbox code if the lightbox HTML exists on this page
if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const galleryImages = document.querySelectorAll('.design-thumb');
  const isMobile = window.innerWidth <= 850;

  // Build arrays of images based on screen size
  const imageSources = [...galleryImages].map(btn => {
    const img = btn.querySelector('img');
    return isMobile ? (img.dataset.fullMobile || img.dataset.full) : img.dataset.full;
  });
  const imageAlts = [...galleryImages].map(btn => btn.querySelector('img').alt);

  let currentIndex = 0;

  // Open lightbox on thumbnail click
  galleryImages.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentIndex = index;
      lightboxImg.src = imageSources[currentIndex];
      lightboxImg.alt = imageAlts[currentIndex];
      lightbox.hidden = false;
    });
  });

  // Next / Previous buttons
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

  // Close button
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  lightboxClose.addEventListener('click', () => {
    lightbox.hidden = true;
  });

  // Close when clicking the dark background
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.hidden = true;
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      lightbox.hidden = true;
    }
  });

  // Arrow keys to navigate
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;

    if (event.key === 'ArrowRight') {
      lightboxNext.click();
    } else if (event.key === 'ArrowLeft') {
      lightboxPrev.click();
    }
  });
}



