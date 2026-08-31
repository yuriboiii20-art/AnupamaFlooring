/**
 * ANUPAMA FLOORING - NATURAL & ARTISANAL JAVASCRIPT
 * Interactive sliders, natural material filters, timber area estimator, and RFQ handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initMetricCounters();
  initCompanyTabs();
  initProductFilter();
  initFlooringCalculator();
  initModals();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. HERO SLIDER
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 7000);
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

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoSlide();
    });
  });

  startAutoSlide();
}

/* --------------------------------------------------------------------------
   3. ANIMATED METRIC COUNTERS
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counters = document.querySelectorAll('.stat-count');
  let animated = false;

  function runCounters() {
    const strip = document.querySelector('.metrics-strip');
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

/* --------------------------------------------------------------------------
   4. COMPANY PROFILE TABS
   -------------------------------------------------------------------------- */
function initCompanyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn, .tab-nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane, .tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetTab);
      if (activePane) activePane.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   5. NATURAL MATERIAL FILTER & QUICK VIEW
   -------------------------------------------------------------------------- */
const productData = {
  'p1': {
    title: 'Royal Burmese Teak Plank',
    category: 'Natural Hardwood',
    desc: 'Responsibly harvested plantation teak with rich natural oil content, golden-brown grain patina, and eucalyptus cross-ply core.',
    thickness: '15mm (4mm Natural Wear Layer)',
    size: '1900 x 190 x 15 mm',
    finish: 'Cold-Pressed Botanical Linseed Oil',
    waterResistance: 'Natural Water Repelling Resins',
    application: 'Living Spaces, Master Bedrooms, Boutique Hospitality'
  },
  'p2': {
    title: 'Nordic Smoked Heritage Oak',
    category: 'Natural Hardwood',
    desc: 'Sustainably sourced European oak naturally fumed to reveal deep growth rings and knots, hand-brushed for tactile organic grain.',
    thickness: '14mm (3.5mm Natural Wear Layer)',
    size: '1800 x 150 x 14 mm',
    finish: 'Hand-Brushed Organic Wax Oil',
    waterResistance: 'Wax-Sealed Moisture Edges',
    application: 'Minimalist Architecture, Dining Rooms, Studios'
  },
  'p3': {
    title: 'Mineral Stone Composite (SPC)',
    category: 'Mineral Stone SPC',
    desc: 'Limestone rock composite bound with virgin polymers and acoustic cork backing. 100% waterproof for kitchens, mudrooms, and pet spaces.',
    thickness: '6.5mm (0.55mm Commercial Shield)',
    size: '1220 x 180 x 6.5 mm',
    finish: 'Embossed in Register (EIR) Organic Wood Touch',
    waterResistance: '100% Totally Waterproof',
    application: 'Kitchens, Bathrooms, Entryways, High-Traffic Areas'
  },
  'p4': {
    title: 'Calacatta Earth Vitrified Tile',
    category: 'Earth Vitrified Clay',
    desc: 'Dense kiln-fired porcelain clay with organic Calacatta earth veining and silk-touch stain-proof density.',
    thickness: '9.5mm Kiln-Fired Porcelain',
    size: '1200 x 600 mm',
    finish: 'Satin Silk Non-Reflective Touch',
    waterResistance: 'Impermeable (<0.05% Absorption)',
    application: 'Foyers, Modern Bathrooms, Sunrooms'
  },
  'p5': {
    title: 'Midnight Emerald Terrazzo',
    category: 'Forest Moss Terrazzo',
    desc: 'Cast natural stone slabs embedding green jade crystals, quartz, and river pebbles within a high-density cement matrix.',
    thickness: '18mm Calibrated Stone Slab',
    size: '600 x 600 mm',
    finish: 'Honed Matte Anti-Slip (R10)',
    waterResistance: 'Penetrating Stone Sealed',
    application: 'Courtyards, Artisan Boutiques, Cafes'
  },
  'p6': {
    title: 'Thermotreated Teak Decking',
    category: 'Exterior Teak Decking',
    desc: 'Solid plantation teak thermally tempered with steam heat to prevent weathering, rot, and fungus in wet outdoor climates.',
    thickness: '21mm Solid Teak',
    size: '2400 x 120 x 21 mm',
    finish: 'Deep Teak Oil with Grooved Grip',
    waterResistance: '100% Weather & Marine Proof',
    application: 'Pool Surrounds, Garden Patios, Balconies'
  }
};

function initProductFilter() {
  const filterBtns = document.querySelectorAll('.product-filter-bar .filter-pill, .product-filters .filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE FLOORING CALCULATOR
   -------------------------------------------------------------------------- */
function initFlooringCalculator() {
  const lengthInput = document.getElementById('calcLength');
  const widthInput = document.getElementById('calcWidth');
  const unitSelect = document.getElementById('calcUnit');
  const productSelect = document.getElementById('calcProduct');
  const wasteSelect = document.getElementById('calcWaste');

  const resArea = document.getElementById('resArea');
  const resWaste = document.getElementById('resWaste');
  const resTotalArea = document.getElementById('resTotalArea');
  const resBoxes = document.getElementById('resBoxes');
  const resCost = document.getElementById('resCost');

  if (!lengthInput || !widthInput) return;

  function calculate() {
    const length = parseFloat(lengthInput.value) || 0;
    const width = parseFloat(widthInput.value) || 0;
    const unit = unitSelect ? unitSelect.value : 'ft';
    const wastePercent = parseFloat(wasteSelect ? wasteSelect.value : 10) || 10;
    const pricePerSqFt = parseFloat(productSelect ? productSelect.value : 5.80) || 5.80;

    let baseAreaSqFt = 0;
    if (unit === 'ft') {
      baseAreaSqFt = length * width;
    } else {
      baseAreaSqFt = (length * width) * 10.7639;
    }

    const wasteAreaSqFt = baseAreaSqFt * (wastePercent / 100);
    const totalAreaSqFt = baseAreaSqFt + wasteAreaSqFt;

    const boxCoverage = 22;
    const boxesNeeded = Math.ceil(totalAreaSqFt / boxCoverage);
    const estimatedCost = totalAreaSqFt * pricePerSqFt;

    if (resArea) resArea.textContent = `${baseAreaSqFt.toFixed(1)} sq. ft`;
    if (resWaste) resWaste.textContent = `+${wasteAreaSqFt.toFixed(1)} sq. ft (${wastePercent}%)`;
    if (resTotalArea) resTotalArea.textContent = `${totalAreaSqFt.toFixed(1)} sq. ft`;
    if (resBoxes) resBoxes.textContent = `${boxesNeeded} Boxes`;
    if (resCost) resCost.textContent = `$${estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }

  [lengthInput, widthInput, unitSelect, productSelect, wasteSelect].forEach(element => {
    if (element) {
      element.addEventListener('input', calculate);
      element.addEventListener('change', calculate);
    }
  });

  calculate();
}

/* --------------------------------------------------------------------------
   7. MODALS
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   8. CONTACT & RFQ FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const rfqForm = document.getElementById('rfqForm');
  const modalRfqForm = document.getElementById('modalRfqForm');

  function handleFormSubmit(e, formElement) {
    e.preventDefault();
    const submitBtn = formElement.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width:18px; height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg> Dispatching Swatch Request...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      const refId = 'AF-NAT-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Inquiry Logged! Ref: #${refId}. Our timber export specialist will reach out shortly.`);
      
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

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#52b788" stroke-width="2">
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

/* --------------------------------------------------------------------------
   10. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.getElementById('backToTop');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
