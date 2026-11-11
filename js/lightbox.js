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
  
  // ==========================================
  // SWIPE SUPPORT (Mobile)
  // ==========================================
  let touchStartX = 0;
  let touchEndX = 0;

  // Record where the finger first touched
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // When finger lifts, calculate the distance
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum pixels to count as a swipe
    const distance = touchEndX - touchStartX;

    if (distance > swipeThreshold) {
      // Swiped right → go to previous image
      lightboxPrev.click();
    } else if (distance < -swipeThreshold) {
      // Swiped left → go to next image
      lightboxNext.click();
    }
  } 
}



