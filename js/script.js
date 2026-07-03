// Daniella de Souza — Link da Bio

// Acessibilidade: só mostra o anel de foco para navegação via teclado.
(function () {
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('kbd-nav');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();

// Efeito de scroll suave: revela cada seção conforme ela entra na tela.
(function () {
  var sections = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || !sections.length) {
    sections.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  sections.forEach(function (el) { observer.observe(el); });
})();
