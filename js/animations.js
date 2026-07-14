/* ============================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    // Create a single Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Once animated, stop observing to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    // Observe each element
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Add stagger classes to grid children automatically
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    staggerContainers.forEach((container) => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        if (index < 9) {
          child.classList.add(`stagger-${index + 1}`);
        }
      });
    });
  });
})();
