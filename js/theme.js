/* ============================================
   THEME TOGGLE — Dark/Light Mode
   ============================================ */

(function () {
  'use strict';

  const THEME_KEY = 'portfolio-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * Get the user's preferred theme
   * Priority: localStorage > system preference > light
   */
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }

    return LIGHT;
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleIcon(theme);
  }

  /**
   * Update the toggle button icon
   */
  function updateToggleIcon(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const sunIcon = '☀️';
    const moonIcon = '🌙';

    toggleBtn.innerHTML = theme === DARK ? sunIcon : moonIcon;
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === DARK ? 'light' : 'dark'} mode`);
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
  }

  // Apply theme immediately (before DOM ready) to prevent flash
  applyTheme(getPreferredTheme());

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  }

  // Bind toggle button after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
      updateToggleIcon(getPreferredTheme());
    }
  });
})();
