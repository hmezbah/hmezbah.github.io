/* ============================================
   MAIN — Navigation, Counters, Filters, Form
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // ── Loading Screen ──
    initLoadingScreen();

    // ── Navigation ──
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLinks();

    // ── Hero ──
    initTypingEffect();
    initCounters();

    // ── Portfolio ──
    initPortfolioFilters();

    // ── Testimonials ──
    initTestimonialSlider();

    // ── Contact Form ──
    initContactForm();

    // ── Back to Top ──
    initBackToTop();

    // ── Button Ripple ──
    initButtonRipple();
  });

  /* ── Loading Screen ── */
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
          loadingScreen.remove();
        }, 600);
      }, 500);
    });
  }

  /* ── Navbar Scroll Effect ── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load
  }

  /* ── Mobile Menu Toggle ── */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth Scroll ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Active Nav Link Highlighting ── */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ── Typing Effect ── */
  function initTypingEffect() {
    const element = document.getElementById('typing-text');
    if (!element) return;

    const titles = [
      'Web Developer',
      'Laravel Expert',
      'WordPress Developer',
      'ERP Developer',
      'Full Stack Developer',
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        element.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        element.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(type, 1500);
  }

  /* ── Animated Counters ── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
        element.classList.add('counting');
      }
    }

    requestAnimationFrame(update);
  }

  /* ── Portfolio Filters ── */
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter cards with animation
        projectCards.forEach((card, index) => {
          const category = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.style.display = '';
            card.style.animation = `slide-up 0.4s ease ${index * 0.05}s both`;
          } else {
            card.style.animation = 'none';
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Testimonial Slider ── */
  function initTestimonialSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const total = cards.length;
    let autoPlayInterval;

    function goToSlide(index) {
      currentIndex = ((index % total) + total) % total;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAutoPlay(); goToSlide(i); startAutoPlay(); });
    });

    // Auto-play
    startAutoPlay();

    // Pause on hover
    track.closest('.testimonials-slider')?.addEventListener('mouseenter', stopAutoPlay);
    track.closest('.testimonials-slider')?.addEventListener('mouseleave', startAutoPlay);
  }

  /* ── Contact Form ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#form-name');
      const email = form.querySelector('#form-email');
      const message = form.querySelector('#form-message');
      let isValid = true;

      [name, email, message].forEach((field) => {
        if (field && !field.value.trim()) {
          field.style.borderColor = 'var(--error)';
          isValid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      // Email validation
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = 'var(--error)';
        isValid = false;
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        fetch(form.action || 'https://formsubmit.co/ajax/hmezbah@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          
          if (res.success === 'true' || res.success === true) {
            const successMsg = document.getElementById('form-success');
            if (successMsg) {
              successMsg.textContent = '✅ Thank you! Your message has been sent successfully. I will respond to hmezbah@gmail.com within 24 hours.';
              successMsg.classList.add('show');
              form.reset();
              setTimeout(() => successMsg.classList.remove('show'), 6000);
            }
          } else {
            alert(res.message || 'Oops! There was a problem submitting your form. Please check the inputs and try again.');
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          alert('Oops! There was a problem submitting your form. Please try again or email directly to hmezbah@gmail.com.');
        });
      }
    });

    // Clear error state on input
    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  /* ── Back to Top ── */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Button Ripple Effect ── */
  function initButtonRipple() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
})();
