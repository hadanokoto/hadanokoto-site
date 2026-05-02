/* ============================================================
   HADANOKOTO SALON — main.js
   ============================================================ */

/* AOS */
AOS.init({
  duration: 800,
  offset: 80,
  once: true,
  easing: 'ease',
});

/* Hero Swiper */
if (document.querySelector('.hero__swiper')) {
  new Swiper('.hero__swiper', {
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.hero__pagination',
      clickable: true,
    },
  });
}

/* Header scroll state */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add('is-scrolled');
  } else {
    if (!header.dataset.alwaysScrolled) {
      header.classList.remove('is-scrolled');
    }
  }
}

if (header) {
  if (header.classList.contains('is-scrolled')) {
    header.dataset.alwaysScrolled = 'true';
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* Hamburger */
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}
