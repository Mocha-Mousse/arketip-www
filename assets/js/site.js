(function () {
  var root = document.documentElement, body = document.body;
  document.getElementById('yr').textContent = new Date().getFullYear();
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('ready'); }); });
  
  // Header border on scroll
  var header = document.getElementById('header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  
  // Dropdowns
  var dds = document.querySelectorAll('.dd');
  var closeAll = function (except) {
    dds.forEach(function (d) { if (d !== except) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); } });
  };
  dds.forEach(function (d) {
    var b = d.querySelector('button');
    b.addEventListener('click', function (e) {
      e.stopPropagation(); closeAll(d);
      var open = d.classList.toggle('open'); b.setAttribute('aria-expanded', open);
    });
    if (window.matchMedia('(hover: hover) and (min-width: 1081px)').matches) {
      d.addEventListener('mouseenter', function () { closeAll(d); d.classList.add('open'); b.setAttribute('aria-expanded', 'true'); });
      d.addEventListener('mouseleave', function () { d.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); });
    }
  });
  document.addEventListener('click', function () { closeAll(); });
  
  // Mobile menu
  var burger = document.querySelector('.burger');
  var setMenu = function (open) { body.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç'); };
  burger.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); closeAll(); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); closeAll(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080) setMenu(false); });
  
  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }
})();
