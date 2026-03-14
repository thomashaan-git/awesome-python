/* ============================================
   WIJKSPELEN.NL - Unified UI App
   Challenge Middelburg
   ============================================ */

// ---- Page Navigation ----
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update navbar active state
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Update bottom nav active state
  document.querySelectorAll('.bottom-nav__link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Prevent default link behavior
  return false;
}

// ---- Navbar Scroll Effect ----
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Filter Chips ----
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('chip')) {
    const parent = e.target.closest('.filter-chips');
    if (parent) {
      parent.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('chip--active', 'active');
      });
      e.target.classList.add('chip--active', 'active');
    }
  }
});

// ---- Confetti Animation on Hero ----
function createConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;

  const colors = ['#FF6B35', '#6C5CE7', '#00B894', '#FDCB6E', '#74B9FF', '#FD79A8', '#A29BFE'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (3 + Math.random() * 4) + 's';
    piece.style.animationDelay = Math.random() * 5 + 's';
    piece.style.width = (4 + Math.random() * 8) + 'px';
    piece.style.height = (4 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
}

// ---- Map Pin Hover Effects ----
function initMapPins() {
  const pins = document.querySelectorAll('.map-pin-container');
  pins.forEach((pin, index) => {
    const marker = pin.querySelector('.map-pin-marker');
    if (marker) {
      marker.style.animationDelay = (index * 0.5) + 's';
    }
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function() {
  createConfetti();
  initMapPins();
});
