/* ============================================================
   HADANOKOTO SALON — main.js
   ============================================================ */

/* AOS */
AOS.init({
  duration: 1200,
  offset: 30,
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

  /* オーバーレイ生成 */
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  /* ×閉じるボタン生成 */
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close';
  closeBtn.setAttribute('aria-label', 'メニューを閉じる');
  closeBtn.innerHTML = '&times;';
  nav.prepend(closeBtn);

  /* SNSリンク生成（メニュー下部）*/
  const navSns = document.createElement('div');
  navSns.className = 'nav-sns';
  navSns.innerHTML =
    '<a href="https://www.instagram.com/hadanokoto/" class="nav-sns__link" target="_blank" rel="noopener">Instagram</a>' +
    '<a href="https://lin.ee/RhbFOYM" class="nav-sns__link" target="_blank" rel="noopener">LINE</a>';
  nav.appendChild(navSns);

  function openNav() {
    nav.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('is-open') ? closeNav() : openNav();
  });

  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}
