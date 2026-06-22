/* ===== MOOYOR interactions ===== */
(function () {
  var CA = document.body.dataset.ca;

  /* ---- copy contract ---- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  function copyCA() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CA).then(showToast).catch(fallback);
    } else { fallback(); }
    function fallback() {
      var t = document.createElement('textarea');
      t.value = CA; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); showToast(); } catch (e) {}
      document.body.removeChild(t);
    }
  }
  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', copyCA);
  });

  /* ---- mobile nav ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      burger.classList.toggle('x');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('x');
      });
    });
  }

  /* ---- scroll reveal ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- lightbox ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  document.querySelectorAll('[data-lb]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      lbImg.src = a.getAttribute('href');
      lb.classList.add('show');
    });
  });
  function closeLb() { lb.classList.remove('show'); lbImg.src = ''; }
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---- gallery carousel dots ---- */
  var track = document.getElementById('track');
  var dotsWrap = document.getElementById('dots');
  if (track && dotsWrap) {
    var frames = Array.prototype.slice.call(track.children);
    var dots = frames.map(function (f, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to image ' + (i + 1));
      d.addEventListener('click', function () {
        track.scrollTo({ left: f.offsetLeft - (track.clientWidth - f.clientWidth) / 2, behavior: 'smooth' });
      });
      dotsWrap.appendChild(d);
      return d;
    });
    var raf;
    track.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var center = track.scrollLeft + track.clientWidth / 2;
        var best = 0, bestDist = Infinity;
        frames.forEach(function (f, i) {
          var fc = f.offsetLeft + f.clientWidth / 2;
          var dist = Math.abs(fc - center);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        dots.forEach(function (d, i) { d.classList.toggle('active', i === best); });
      });
    }, { passive: true });
  }
})();
