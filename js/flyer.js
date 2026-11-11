document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('flyer-viewer');
  const display = document.getElementById('loupe-display');
  const triggerContainer = document.querySelector('.loupe-trigger-container');
  const image = document.getElementById('loupe-image');
  const closeBtn = document.querySelector('.loupe-close');

  // Find the static flyer images on the page
  const staticFlyers = document.querySelectorAll('.flyer-static');

  // 1. Open the viewer when a static flyer is clicked
  staticFlyers.forEach(flyer => {
    flyer.style.cursor = 'zoom-in'; // Hint that it's clickable
    flyer.addEventListener('click', (e) => {
      // Set the image source to match the one they clicked
      image.src = e.target.src;
      display.style.backgroundImage = `url('${e.target.src}')`;
      
      viewer.hidden = false;
    });
  });

  // 2. Close the viewer
  closeBtn.addEventListener('click', () => {
    viewer.hidden = true;
  });

  // 3. The Magnifying Logic
  triggerContainer.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    
    // Get mouse position relative to the visible flyer strip
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage (0 to 100)
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Apply to the square
    display.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });
});