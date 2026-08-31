/**
 * ANUPAMA FLOORING - MAIN JAVASCRIPT
 * Interactive functionality, sliders, filters, calculator, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initMetricCounters();
  initCompanyTabs();
  initProductFilter();
  initFlooringCalculator();
  initGalleryFilter();
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

  // Sticky Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('svg');
      if (navMenu.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on click link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active Nav Link scrollspy
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
    slideInterval = setInterval(nextSlide, 6000);
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
  runCounters(); // Initial check
}

/* --------------------------------------------------------------------------
   4. COMPANY PROFILE TABS
   -------------------------------------------------------------------------- */
function initCompanyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

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
   5. PRODUCT FILTER & QUICK VIEW
   -------------------------------------------------------------------------- */
const productData = {
  'p1': {
    title: 'Royal Burmese Teak Hardwood',
    category: 'Engineered Hardwood',
    desc: 'Crafted from sustainable premium old-growth teak with a multi-ply eucalyptus core for maximum dimensional stability and natural golden-brown patina.',
    thickness: '15mm (4mm Wear Layer)',
    size: '1900 x 190 x 15 mm',
    finish: 'UV Matt Cured Lacquer / Zero VOC',
    waterResistance: 'High Humidity Resistant',
    application: 'Luxury Villas, Presidential Suites, Penthouse Living Rooms'
  },
  'p2': {
    title: 'Nordic Smoked Oak Plank',
    category: 'Engineered Hardwood',
    desc: 'Deep brushed European smoked oak with handcrafted micro-bevels, enhancing the natural warmth and wood grain character of contemporary interiors.',
    thickness: '14mm (3.5mm Wear Layer)',
    size: '1800 x 150 x 14 mm',
    finish: 'Natural Matte Oil',
    waterResistance: 'Moisture Sealed Edges',
    application: 'Executive Boardrooms, Boutique Hotels, Residences'
  },
  'p3': {
    title: 'Ultra-Core Stone Polymer Composite (SPC)',
    category: 'Luxury SPC Vinyl',
    desc: '100% waterproof rigid core flooring integrated with IXPE acoustic sound insulation underlay. Highly resistant to dents, scratches, and pet traffic.',
    thickness: '6.5mm (0.55mm Commercial Wear Layer)',
    size: '1220 x 180 x 6.5 mm',
    finish: 'Embossed in Register (EIR) Wood Texture',
    waterResistance: '100% Fully Waterproof',
    application: 'Kitchens, Bathrooms, Retail Showrooms, High-Traffic Commercial'
  },
  'p4': {
    title: 'Calacatta Luxe Glazed Vitrified Tile',
    category: 'Glazed Vitrified Tiles',
    desc: 'High-definition digital glazed porcelain vitrified tiles replicating Italian Calacatta gold veining with ultra-low water absorption (<0.05%).',
    thickness: '9mm High Density Ceramic',
    size: '1200 x 600 mm / 1600 x 800 mm',
    finish: 'Mirror Polished High Gloss / Satin Silk',
    waterResistance: 'Impervious to Water & Stains',
    application: 'Grand Foyers, Airport Lounges, Luxury Bathrooms'
  },
  'p5': {
    title: 'Midnight Emerald Terrazzo Slab',
    category: 'Natural Stone & Terrazzo',
    desc: 'Custom composite terrazzo embedding natural jade, quartz, and forest green marble chips within a high-strength polymer matrix.',
    thickness: '18mm Calibrated Slab',
    size: '600 x 600 mm / Custom Cut-to-Size',
    finish: 'Honed Matte Anti-Slip',
    waterResistance: 'Sealed Stain-Proof Surface',
    application: 'Art Galleries, Luxury Cafes, Designer Boutiques'
  },
  'p6': {
    title: 'Thermotreated Exterior Teak Decking',
    category: 'Outdoor Teak Decking',
    desc: 'Heavy-duty exterior decking planks thermally modified to resist UV degradation, rot, termites, and harsh maritime climates without chemical preservatives.',
    thickness: '21mm Solid Teak',
    size: '2400 x 120 x 21 mm',
    finish: 'Deep Impregnated Teak Oil with Anti-Slip Grooves',
    waterResistance: '100% Weather & Marine Proof',
    application: 'Poolside Decks, Rooftop Terraces, Yacht Docks, Resorts'
  }
};

function initProductFilter() {
  const filterBtns = document.querySelectorAll('.product-filters .filter-btn');
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
    const unit = unitSelect.value;
    const wastePercent = parseFloat(wasteSelect.value) || 10;
    const pricePerSqFt = parseFloat(productSelect.value) || 4.50;

    let baseAreaSqFt = 0;
    if (unit === 'ft') {
      baseAreaSqFt = length * width;
    } else {
      // Meters to sq ft (1 sq m = 10.7639 sq ft)
      baseAreaSqFt = (length * width) * 10.7639;
    }

    const wasteAreaSqFt = baseAreaSqFt * (wastePercent / 100);
    const totalAreaSqFt = baseAreaSqFt + wasteAreaSqFt;

    // Standard box covers ~22 sq ft
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

  calculate(); // Run initial estimation
}

/* --------------------------------------------------------------------------
   7. GALLERY FILTER & LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. MODALS (Product Details, Quote Modal, Lightbox)
   -------------------------------------------------------------------------- */
function initModals() {
  const quoteModal = document.getElementById('quoteModal');
  const productModal = document.getElementById('productModal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const viewDetailBtns = document.querySelectorAll('.btn-view-detail');
  const closeBtns = document.querySelectorAll('.modal-close');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  // Open Quote Modal
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) quoteModal.classList.add('active');
    });
  });

  // Open Product Detail Modal
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

  // Close modals
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

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach(m => m.classList.remove('active'));
    }
  });
}

/* --------------------------------------------------------------------------
   9. CONTACT & RFQ FORM SUBMISSION
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
      </svg> Submitting Export Inquiry...
    `;
    submitBtn.disabled = true;

    // Simulate reliable API dispatch
    setTimeout(() => {
      const refId = 'AF-EXP-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Inquiry Received! Reference: #${refId}. Our international export manager will contact you within 4 hours.`);
      
      formElement.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Close modal if submitted inside modal
      const parentModal = formElement.closest('.modal-backdrop');
      if (parentModal) {
        setTimeout(() => parentModal.classList.remove('active'), 1200);
      }
    }, 1200);
  }

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => handleFormSubmit(e, rfqForm));
  }

  if (modalRfqForm) {
    modalRfqForm.addEventListener('submit', (e) => handleFormSubmit(e, modalRfqForm));
  }
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2">
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
   11. BACK TO TOP BUTTON
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
