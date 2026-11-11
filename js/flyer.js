document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('flyer-viewer');
  const display = document.getElementById('loupe-display');
  const triggerContainer = document.querySelector('.loupe-trigger-container');
  const image = document.getElementById('loupe-image');
  const closeBtn = document.querySelector('.loupe-close');
  const staticFlyers = document.querySelectorAll('.flyer-static');

  // Variable to remember which image opened the viewer
  let lastFocusedFlyer = null;

    // 1. Open the viewer
  staticFlyers.forEach(flyer => {
    flyer.style.cursor = 'zoom-in'; 
    
    // Factor out the opening logic so both click and Enter can use it
    const openViewer = (e) => {
      lastFocusedFlyer = e.target;
      image.src = e.target.src;
      display.style.backgroundImage = `url('${e.target.src}')`;
      
      viewer.hidden = false;
      closeBtn.focus(); 
    };

    // Open on mouse click
    flyer.addEventListener('click', openViewer);

    // Open on keyboard Enter
    flyer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Stop the browser from doing any default scrolling
        openViewer(e);
      }
    });
  });

  // 2. Close the viewer (and return focus)
  function closeViewer() {
    viewer.hidden = true;
    // Accessibility: Return focus to the image they originally clicked
    if (lastFocusedFlyer) {
      lastFocusedFlyer.focus();
    }
  }

  closeBtn.addEventListener('click', closeViewer);

    // 3. The Magnifying Logic (Only runs on Desktop)
  triggerContainer.addEventListener('mousemove', (e) => {
    // If the screen is small, don't run the loupe math!
    if (window.innerWidth <= 850) return;

    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    display.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });

  // 4. Accessibility: Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !viewer.hidden) {
      closeViewer();
    }
  });

  // 5. Accessibility: Focus Trap
  // This keeps the Tab key from escaping the modal and wandering into the page behind it
  viewer.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      // Since the close button is the ONLY focusable element in this modal,
      // we just prevent Tab from doing anything else.
      e.preventDefault();
      closeBtn.focus();
    }
  });
});