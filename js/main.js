/**
 * ANUPAMA FLOORING - MULTI-PAGE & MOBILE INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initMetricCounters();
  initModals();
  initContactForm();
});

/* Navbar with Multi-Page Active State & Mobile Menu */
function initNavbar() {
  const header = document.querySelector('.header-main');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.main-nav-link');

  // Highlight active link based on current page URL
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // Mobile menu open / close & backdrop sync
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    navMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Hero Slider */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide-item');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 2000); // changes images every 2 seconds
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  startAutoSlide();
}

/* Metric Counters */
function initMetricCounters() {
  const counters = document.querySelectorAll('.stat-count');
  let animated = false;

  function runCounters() {
    const strip = document.querySelector('.section-counter-overlap');
    if (!strip) return;

    const rect = strip.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9 && !animated) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const start = 0;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', runCounters);
  runCounters();
}

/* Product Data & Modals */
const productData = {
  'p1': {
    title: 'Organic Cow Dung Cakes (fertilizer grade)',
    category: 'Fertilizer Grade & Organic Agriculture',
    desc: 'Made from farm-sourced cow dung, shaped into uniform cakes and dried in open sunlight. They contain no chemicals or additives. Crush them into soil, add them to compost, or soak them to make a liquid feed.',
    thickness: 'Uniform Handcrafted Depth',
    size: 'Round, flat cakes ([_ cm] diameter)',
    finish: 'Sun-dried in open sunlight & quality-inspected',
    waterResistance: '[below _ %] thoroughly sun-dried',
    application: 'Crush into soil, add to compost, or soak to make a liquid feed'
  },
  'p2': {
    title: 'Cow Dung Powder',
    category: 'Finely Ground Soil Conditioner',
    desc: 'The same sun-dried product, finely ground for easy, even mixing into soil and potting blends.',
    thickness: 'Fine granular powder',
    size: '[_ kg bags / cartons; private label available]',
    finish: 'Finely milled and screened',
    waterResistance: 'Controlled safe moisture level',
    application: 'Easy, even mixing into soil and potting blends, nurseries, orchards'
  },
  'p3': {
    title: 'Cow Dung Herbal Compost',
    category: 'Herbal-Enriched Soil Bioresource',
    desc: 'Cow dung composted with herbal inputs to improve soil conditions and plant growth.',
    thickness: 'Fully matured organic compost',
    size: '[_ kg bags / cartons; private label available]',
    finish: 'Herbal-composted and aged',
    waterResistance: 'Moisture-stabilized microbial compost',
    application: 'Rebuild soil structure, enhance microbial life, stimulate root growth'
  },
  'p4': {
    title: 'Calibrated 4-Inch Sized Cakes',
    category: 'Precision Calibrated Bioresource',
    desc: 'Precision-milled and molded to exact international dimensions for uniform burn rate, optimal compressive density, and zero batch-to-batch variation.',
    thickness: '20 mm Machine-Calibrated Depth',
    size: '100 mm (4-Inch) Precision Diameter',
    finish: 'Uniform Calibrated Texture',
    waterResistance: '<8% Precision Dry Moisture',
    application: 'Agnihotra Rituals, Incense Formulation, Standardized Clean Heating'
  },
  'p5': {
    title: 'Export Master Carton & Moisture Bags',
    category: 'Export-Grade Freight Packaging',
    desc: 'Moisture-resistant bags and heavy-duty 5-ply cartons engineered for container ocean freight protection; custom packing and private label available.',
    thickness: '5-Ply Heavy Duty Corrugated Fiberboard',
    size: 'Standard Export Carton & Moisture-Resistant Bags',
    finish: 'Moisture-Barrier Poly Sealed',
    waterResistance: '100% Ocean Humidity Sealed',
    application: 'FOB / CIF International Ocean Cargo, Global Container Distribution'
  },
  'p6': {
    title: 'Vedic Agnihotra Pure Desi Cow Dung',
    category: 'Vedic Ritual & Purification Grade',
    desc: 'Specially prepared from indigenous Indian desi cow dung following Vedic traditions. Clean, odorless, and pure for daily sacred Agnihotra ceremonies.',
    thickness: '15 - 18 mm Traditional Vedic Cake',
    size: 'Traditional Round & Square Flat Slices',
    finish: '100% Pure Indigenous Desi Cow Bio-Cure',
    waterResistance: 'Zero Chemical Residue / Moisture Tested',
    application: 'Daily Agnihotra Homa, Vedic Yajna, Atmospheric Air Purification'
  }
};

function initModals() {
  const quoteModal = document.getElementById('quoteModal');
  const productModal = document.getElementById('productModal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const viewDetailBtns = document.querySelectorAll('.btn-view-detail');
  const closeBtns = document.querySelectorAll('.modal-close');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) quoteModal.classList.add('active');
    });
  });

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-product-id');
      const item = productData[pId];
      if (item && productModal) {
        document.getElementById('modalProductTitle').textContent = item.title;
        document.getElementById('modalProductCategory').textContent = item.category;
        document.getElementById('modalProductDesc').textContent = item.desc;
        document.getElementById('modalProductThickness').textContent = item.thickness;
        document.getElementById('modalProductSize').textContent = item.size;
        document.getElementById('modalProductFinish').textContent = item.finish;
        document.getElementById('modalProductWater').textContent = item.waterResistance;
        document.getElementById('modalProductApp').textContent = item.application;
        
        productModal.classList.add('active');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalBackdrops.forEach(m => m.classList.remove('active'));
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach(m => m.classList.remove('active'));
    }
  });
}

/* Contact / RFQ Form */
function initContactForm() {
  const rfqForm = document.getElementById('rfqForm');
  const modalRfqForm = document.getElementById('modalRfqForm');

  function handleFormSubmit(e, formElement) {
    e.preventDefault();
    const submitBtn = formElement.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `Submitting Inquiry...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      const refId = 'AF-EXP-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Inquiry Received! Ref: #${refId}. Our export team will contact you shortly.`);
      
      formElement.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      const parentModal = formElement.closest('.modal-backdrop');
      if (parentModal) {
        setTimeout(() => parentModal.classList.remove('active'), 1200);
      }
    }, 1200);
  }

  if (rfqForm) rfqForm.addEventListener('submit', (e) => handleFormSubmit(e, rfqForm));
  if (modalRfqForm) modalRfqForm.addEventListener('submit', (e) => handleFormSubmit(e, modalRfqForm));
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EDDD5E" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}
