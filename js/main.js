/**
 * NAMA HARLEM — Main JavaScript
 * Handles: Navigation, Scroll effects, Animations, FAQ, Newsletter, Events data
 */

/* ============================================================
   NAVIGATION
============================================================ */
(function() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const navOverlay = document.querySelector('.nav-overlay');
  const overlayClose = document.querySelector('.nav-overlay__close');
  const overlayLinks = document.querySelectorAll('.nav-overlay a');
  const announcementBar = document.querySelector('.announcement-bar');

  // Offset navbar if announcement bar is present
  function setNavOffset() {
    if (announcementBar && navbar) {
      const h = announcementBar.offsetHeight;
      navbar.style.top = h + 'px';
    }
  }

  // Scroll-based navbar styling
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      if (announcementBar) navbar.style.top = '0px';
    } else {
      navbar.classList.remove('scrolled');
      setNavOffset();
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  setNavOffset();
  handleScroll();

  // Mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMenu() {
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (overlayClose) overlayClose.addEventListener('click', closeMenu);
  overlayLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();


/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
============================================================ */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Counter animation for impact numbers
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // Progress bar animation
  const progressBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0';
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        progressBarObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar').forEach(el => progressBarObserver.observe(el));
})();


/* ============================================================
   PARALLAX HERO
============================================================ */
(function() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  function onScroll() {
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   FAQ ACCORDION
============================================================ */
(function() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });
})();


/* ============================================================
   TONIGHT / EVENTS DATA
============================================================ */
const NAMA_EVENTS = [
  {
    id: 1,
    title: "The Lion's Den — Wednesday Night Jam",
    series: "Weekly Residency",
    date: "2026-04-01",
    displayDate: { day: "01", month: "APR" },
    time: "9:00 PM – Midnight",
    cover: "$10",
    type: "jam",
    badge: "Tonight",
    badgeType: "tonight",
    description: "NAMA's legendary Wednesday night open jam. All musicians welcome. Hosted by the house band in the historic brownstone basement.",
    image: "images/jazz-performance.jpg"
  },
  {
    id: 2,
    title: "Monday Nite Jams — Music of the Diaspora",
    series: "Monthly Series",
    date: "2026-04-06",
    displayDate: { day: "06", month: "APR" },
    time: "7:00 PM – 11:00 PM",
    cover: "Free / Donation",
    type: "concert",
    badge: "This Week",
    badgeType: "",
    description: "A monthly celebration of music rooted in the African diaspora. From jazz to blues, gospel to world music — an immersive evening of cultural expression.",
    image: "images/audience.jpg"
  },
  {
    id: 3,
    title: "Lady Legends of Harlem",
    series: "Special Event",
    date: "2026-04-12",
    displayDate: { day: "12", month: "APR" },
    time: "7:30 PM – 10:30 PM",
    cover: "$20 – $35",
    type: "concert",
    badge: "Upcoming",
    badgeType: "",
    description: "An evening honoring the legendary women of Harlem music. Featuring local vocalists, instrumentalists, and a tribute to NAMA's century of supporting Black artists.",
    image: "images/venue-interior.jpg"
  },
  {
    id: 4,
    title: "Blues & Poetry Night",
    series: "Monthly Series",
    date: "2026-04-18",
    displayDate: { day: "18", month: "APR" },
    time: "8:00 PM – 11:00 PM",
    cover: "$15",
    type: "poetry",
    badge: "Upcoming",
    badgeType: "",
    description: "The blues and the spoken word collide in NAMA's basement for an intimate evening of original poetry, live blues performance, and open mic.",
    image: "images/jazz-performance.jpg"
  },
  {
    id: 5,
    title: "Centennial Fundraiser Gala Recap Night",
    series: "Community Event",
    date: "2026-04-25",
    displayDate: { day: "25", month: "APR" },
    time: "7:00 PM – 11:00 PM",
    cover: "$25 – $50",
    type: "gala",
    badge: "Members Event",
    badgeType: "",
    description: "Relive the highlights of NAMA's Centennial Fundraiser Gala. An evening of appreciation, live music, and community celebration as we continue building toward our next century.",
    image: "images/audience.jpg"
  },
  {
    id: 6,
    title: "Sunday Afternoon Jazz Session",
    series: "Weekend Series",
    date: "2026-05-03",
    displayDate: { day: "03", month: "MAY" },
    time: "3:00 PM – 7:00 PM",
    cover: "Free / Donation",
    type: "jam",
    badge: "May",
    badgeType: "",
    description: "Wind down your Sunday with live jazz in the historic NAMA brownstone. Doors open to the community. Light refreshments available. All ages welcome.",
    image: "images/venue-interior.jpg"
  }
];

// Render event cards dynamically
function renderEventCards(containerId, limit = 3, filter = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let events = NAMA_EVENTS;
  if (filter) events = events.filter(e => e.type === filter);
  if (limit) events = events.slice(0, limit);

  container.innerHTML = events.map(event => `
    <article class="event-card fade-in">
      <div class="event-card__img-wrap">
        <img src="${event.image}" alt="${event.title}" class="event-card__img" loading="lazy">
        ${event.badge ? `<span class="event-card__badge${event.badgeType === 'tonight' ? ' event-card__badge--tonight' : ''}">${event.badge}</span>` : ''}
        <div class="event-card__date-chip">
          <div class="event-card__date-day">${event.displayDate.day}</div>
          <div class="event-card__date-mon">${event.displayDate.month}</div>
        </div>
      </div>
      <div class="event-card__body">
        <div class="event-card__series">${event.series}</div>
        <h3 class="event-card__title">${event.title}</h3>
        <div class="event-card__meta">
          <span><i class="fa fa-clock"></i> ${event.time}</span>
          <span><i class="fa fa-ticket"></i> ${event.cover}</span>
        </div>
        <p class="event-card__desc">${event.description}</p>
        <a href="events.html" class="btn btn--outline btn--sm">Learn More</a>
      </div>
    </article>
  `).join('');

  // Re-observe new elements for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Render tonight banner
function renderTonightBanner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tonight = NAMA_EVENTS.find(e => e.badgeType === 'tonight') || NAMA_EVENTS[0];
  container.innerHTML = `
    <div class="tonight-banner__pulse"></div>
    <div>
      <div class="tonight-banner__label">🎵 Live Tonight at NAMA</div>
      <div class="tonight-banner__title">${tonight.title}</div>
      <div class="tonight-banner__time">
        <i class="fa fa-clock"></i> ${tonight.time} &nbsp;·&nbsp;
        <i class="fa fa-ticket"></i> ${tonight.cover}
      </div>
    </div>
    <div class="tonight-banner__actions">
      <a href="visit.html" class="btn btn--gold btn--sm">Plan Your Visit</a>
      <a href="events.html" class="btn btn--outline btn--sm">Full Schedule</a>
    </div>
  `;
}


/* ============================================================
   DONATION TIERS — Interactive
============================================================ */
(function() {
  document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const amount = card.dataset.amount;
      const donateInput = document.getElementById('donate-amount-input');
      if (donateInput && amount) donateInput.value = amount;
    });
  });
})();


/* ============================================================
   NEWSLETTER FORM
============================================================ */
(function() {
  document.querySelectorAll('.newsletter-form-js').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]')?.value;
      if (email) {
        showToast('✓  You\'re on the list! Welcome to NAMA\'s community.');
        this.reset();
      }
    });
  });
})();


/* ============================================================
   TOAST NOTIFICATION
============================================================ */
function showToast(message, duration = 4000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa fa-check-circle"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}


/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================================
   INIT — Run on DOM Ready
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render events if containers exist
  renderEventCards('events-grid-home', 3);
  renderEventCards('events-grid-all', 6);
  renderTonightBanner('tonight-banner-content');

  // Open first FAQ item by default
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) firstFaq.classList.add('open');
});
