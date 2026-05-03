/* ============================================================
   HADANOKOTO SALON — main.js
   ============================================================ */

/* AOS */
AOS.init({
  duration: 1000,
  offset: 60,
  once: true,
  easing: 'ease-out',
});

/* ---- HERO SWIPER ---- */
if (document.querySelector('.hero__swiper')) {
  new Swiper('.hero__swiper', {
    loop: true,
    speed: 1800,
    autoplay: {
      delay: 6000,
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

/* ---- HEADER SCROLL STATE ---- */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  if (window.scrollY > 60) {
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

/* ---- POPUP NAV (ORIGAMI style — full screen overlay) ---- */
var hamburger   = document.getElementById('hamburger');
var popnav      = document.getElementById('popnav');
var popnavClose = document.getElementById('popnav-close');

if (hamburger && popnav) {

  function openPopNav() {
    popnav.classList.add('is-open');
    popnav.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closePopNav() {
    popnav.classList.remove('is-open');
    popnav.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openPopNav);

  if (popnavClose) {
    popnavClose.addEventListener('click', closePopNav);
  }

  /* Close when a nav link is clicked */
  popnav.querySelectorAll('.popnav__link').forEach(function(link) {
    link.addEventListener('click', closePopNav);
  });

  /* Close when clicking the backdrop (outside inner box) */
  popnav.addEventListener('click', function(e) {
    if (e.target === popnav) closePopNav();
  });

  /* Close on ESC key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popnav.classList.contains('is-open')) {
      closePopNav();
    }
  });
}
