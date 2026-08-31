/**
 * ANUPAMA FLOORING - FARMDUNGEXPORTER.COM INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initMetricCounters();
  initModals();
  initContactForm();
});

/* Navbar with Smooth Scroll & Active Spy */
function initNavbar() {
  const header = document.querySelector('.header-main');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.main-nav-link');

  // Handle mobile menu
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Header scroll shadow and active spy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      
      // If we are scrolling in company-profile or founder, keep company-profile active
      const targetId = (id === 'founder') ? 'company-profile' : id;
      const matchingLink = document.querySelector(`.main-nav-link[href="#${targetId}"]`);

      if (scrollPosition >= top && scrollPosition < top + height) {
        if (matchingLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  // Smooth click scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header.offsetHeight || 88;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
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
    title: 'Royal Burmese Teak Hardwood',
    category: 'Natural Hardwood',
    desc: 'Crafted from sustainable premium old-growth teak with a multi-ply eucalyptus core for maximum dimensional stability and natural golden-brown patina.',
    thickness: '15mm (4mm Wear Layer)',
    size: '1900 x 190 x 15 mm',
    finish: 'UV Matt Cured Lacquer / Zero VOC',
    waterResistance: 'High Humidity Resistant',
    application: 'Luxury Villas, Presidential Suites, Penthouse Living Rooms'
  },
  'p2': {
    title: 'Nordic Smoked Heritage Oak',
    category: 'Natural Hardwood',
    desc: 'Deep brushed European smoked oak with handcrafted micro-bevels, enhancing the natural warmth and wood grain character of contemporary interiors.',
    thickness: '14mm (3.5mm Wear Layer)',
    size: '1800 x 150 x 14 mm',
    finish: 'Natural Matte Oil',
    waterResistance: 'Moisture Sealed Edges',
    application: 'Executive Boardrooms, Boutique Hotels, Residences'
  },
  'p3': {
    title: 'Mineral Stone Composite (SPC)',
    category: 'Luxury SPC Vinyl',
    desc: '100% waterproof rigid core flooring integrated with IXPE acoustic sound insulation underlay. Highly resistant to dents, scratches, and pet traffic.',
    thickness: '6.5mm (0.55mm Commercial Wear Layer)',
    size: '1220 x 180 x 6.5 mm',
    finish: 'Embossed in Register (EIR) Wood Texture',
    waterResistance: '100% Fully Waterproof',
    application: 'Kitchens, Bathrooms, Retail Showrooms, High-Traffic Commercial'
  },
  'p4': {
    title: 'Calacatta Earth Vitrified Tile',
    category: 'Glazed Vitrified Tiles',
    desc: 'High-definition digital glazed porcelain vitrified tiles replicating Italian Calacatta gold veining with ultra-low water absorption (<0.05%).',
    thickness: '9mm High Density Ceramic',
    size: '1200 x 600 mm',
    finish: 'Mirror Polished High Gloss / Satin Silk',
    waterResistance: 'Impervious to Water & Stains',
    application: 'Grand Foyers, Airport Lounges, Luxury Bathrooms'
  },
  'p5': {
    title: 'Midnight Emerald Terrazzo',
    category: 'Natural Stone & Terrazzo',
    desc: 'Custom composite terrazzo embedding natural jade, quartz, and forest green marble chips within a high-strength polymer matrix.',
    thickness: '18mm Calibrated Slab',
    size: '600 x 600 mm',
    finish: 'Honed Matte Anti-Slip',
    waterResistance: 'Sealed Stain-Proof Surface',
    application: 'Art Galleries, Luxury Cafes, Designer Boutiques'
  },
  'p6': {
    title: 'Thermotreated Teak Decking',
    category: 'Outdoor Teak Decking',
    desc: 'Heavy-duty exterior decking planks thermally modified to resist UV degradation, rot, termites, and harsh maritime climates without chemical preservatives.',
    thickness: '21mm Solid Teak',
    size: '2400 x 120 x 21 mm',
    finish: 'Deep Impregnated Teak Oil with Anti-Slip Grooves',
    waterResistance: '100% Weather & Marine Proof',
    application: 'Poolside Decks, Rooftop Terraces, Yacht Docks, Resorts'
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
      const refId = 'AF-FDE-' + Math.floor(100000 + Math.random() * 900000);
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
