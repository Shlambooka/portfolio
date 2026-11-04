const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const isOpen = nav.classList.contains('open');  //accessibility
  toggle.setAttribute('aria-expanded', isOpen);  //accessibility
});

// accessibility Esc button to close the menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});