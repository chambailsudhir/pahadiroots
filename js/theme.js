/* ── 5 Pahadi Roots — Global Theme System ───────────────────────── */
(function() {
  var DEFAULT_THEME = 'dukan';
  var THEMES = ['pahadi','dukan','saffron','midnight','valley'];

  function applyTheme(theme) {
    if (THEMES.indexOf(theme) === -1) theme = DEFAULT_THEME;
    document.body.setAttribute('data-theme', theme);
    try { localStorage.setItem('pr_theme', theme); } catch(e) {}
    /* Update all .theme-opt buttons on this page */
    document.querySelectorAll('.theme-opt').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  function openThemeSwitcher() {
    var p = document.getElementById('themeSwitcherPanel');
    if (p) p.classList.toggle('open');
  }
  function closeThemeSwitcher() {
    var p = document.getElementById('themeSwitcherPanel');
    if (p) p.classList.remove('open');
  }

  /* Close panel on outside click */
  document.addEventListener('click', function(e) {
    var wrap = document.querySelector('.theme-switcher-wrap');
    if (wrap && !wrap.contains(e.target)) closeThemeSwitcher();
  });

  /* Apply saved (or default) theme immediately */
  var saved;
  try { saved = localStorage.getItem('pr_theme'); } catch(e) {}
  applyTheme(saved || DEFAULT_THEME);

  /* Expose globally */
  window.applyTheme        = applyTheme;
  window.openThemeSwitcher  = openThemeSwitcher;
  window.closeThemeSwitcher = closeThemeSwitcher;
})();
