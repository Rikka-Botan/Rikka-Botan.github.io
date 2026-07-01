/* =====================================================================
   Rikka Botan | Portfolio — interactions & effects
   Loaded after layout.js. Motion is proximity/scroll based (no cursor
   paint). Exposes window.SiteFX.reveal().
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var revealObserver = null, rvSeq = 0, rvLast = 0;

  var STAR = (window.RBIcons && window.RBIcons.star) ||
    '<svg viewBox="0 0 24 24"><path d="M12 3l1.6 5L19 9.6l-5.4 1.6L12 16l-1.6-4.8L5 9.6 10.4 8z"/></svg>';

  /* reveal one element; consecutive calls auto-stagger (sequential feel) */
  window.SiteFX = {
    reveal: function (el, variant) {
      if (!el) return;
      if (reduceMotion || !revealObserver) { el.classList.add("is-visible"); return; }
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      if (now - rvLast > 220) rvSeq = 0;
      rvLast = now;
      el.classList.add("reveal");
      if (variant) el.setAttribute("data-v", variant);
      el.style.transitionDelay = Math.min(rvSeq * 70, 420) + "ms";
      rvSeq++;
      revealObserver.observe(el);
    }
  };

  ready(function () {
    document.documentElement.classList.add("is-ready");
    initReveal();
    initHeadingSpin();
    initBackToTop();
    initPageTransition();
    initPrefetch();
    initScrollProgress();
    initParallax();
    initTilt();
    initProximity();
    if (!reduceMotion) startSnow();
  });

  window.addEventListener("pageshow", function () {
    document.documentElement.classList.add("is-ready");
    var l = document.querySelector(".rb-loader");
    if (l) l.classList.remove("show");
  });

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- scroll reveal: directional, staggered (branding motion) --- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    function add(el, variant, delay) {
      if (!el) return;
      el.classList.add("reveal");
      if (variant) el.setAttribute("data-v", variant);
      if (delay) el.style.transitionDelay = delay + "ms";
      revealObserver.observe(el);
    }
    function each(sel, fn) { Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(fn); }

    add(document.querySelector(".page-head"), "up", 0);

    /* hero: elements enter one after another */
    each(".hero > *", function (el, i) {
      if (el.classList.contains("hero-glow")) return;
      add(el, "up", i * 110);
    });

    /* about: photo from the left, text from the right */
    add(document.querySelector(".about-media"), "left", 0);
    add(document.querySelector(".about > p"), "right", 130);

    /* projects: intro then cards cascade in */
    add(document.querySelector(".project-intro"), "up", 0);
    each(".sea-card", function (el, i) { add(el, "up", 130 + i * 110); });

    add(document.querySelector(".contact-card"), "zoom", 0);
    add(document.querySelector(".pager"), "up", 0);
  }

  /* ---- headings spin on hover ----------------------------------- */
  function initHeadingSpin() {
    if (reduceMotion) return;
    document.querySelectorAll(".brand-logo, .page-head h1, .hero-title, main section > h2").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        el.classList.remove("rotate-y"); void el.offsetWidth; el.classList.add("rotate-y");
      });
    });
  }

  /* ---- back-to-top ---------------------------------------------- */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "to-top"; btn.type = "button";
    btn.setAttribute("aria-label", "Back to top"); btn.innerHTML = "↑";
    document.body.appendChild(btn);
    function onScroll() { btn.classList.toggle("show", window.pageYOffset > 340); }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  /* ---- page-transition loading screen (snow + stars) ------------ */
  function buildLoader() {
    var el = document.createElement("div");
    el.className = "rb-loader"; el.setAttribute("aria-hidden", "true");

    var arm = '<path d="M50 50V9 M50 17l-6 6 M50 17l6 6 M50 28l-5 5 M50 28l5 5"/>';
    var flake = "";
    for (var k = 0; k < 6; k++) flake += '<g transform="rotate(' + (k * 60) + ' 50 50)">' + arm + '</g>';

    el.innerHTML =
      '<div class="loader-core">' +
        '<div class="snowflake"><svg viewBox="0 0 100 100">' + flake + '</svg></div>' +
        '<div class="orbit"><i>' + STAR + '</i><i>' + STAR + '</i><i>' + STAR + '</i></div>' +
      '</div>' +
      '<div class="cap">Loading<b>.</b><b>.</b><b>.</b></div>';

    /* scattered twinkling stars */
    var pts = [[12,20],[24,64],[80,24],[86,70],[50,12],[68,84],[32,88],[90,42],[8,50],[58,32]];
    for (var s = 0; s < pts.length; s++) {
      var t = document.createElement("span");
      t.className = "l-tw";
      t.style.left = pts[s][0] + "vw"; t.style.top = pts[s][1] + "vh";
      var sz = 7 + (s % 3) * 4; t.style.width = sz + "px"; t.style.height = sz + "px";
      t.style.animationDelay = (s * 0.2) + "s";
      t.innerHTML = STAR;
      el.appendChild(t);
    }
    /* falling snow inside the loader */
    for (var i = 0; i < 16; i++) {
      var f = document.createElement("span");
      f.className = "l-flake";
      f.style.left = ((i * 6.3 + 3) % 100) + "vw";
      var fs = 6 + (i % 4) * 3; f.style.width = fs + "px"; f.style.height = fs + "px";
      f.style.animationDuration = (3 + (i % 5)) + "s, " + (3 + (i % 3)) + "s";
      f.style.animationDelay = (-(i % 6)) + "s, 0s";
      f.innerHTML = (i % 3 === 0) ? '<span class="star">' + STAR + "</span>" : '<span class="dot"></span>';
      el.appendChild(f);
    }
    document.body.appendChild(el);
    return el;
  }

  function initPageTransition() {
    var loader = buildLoader();
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;
      if (a.origin && a.origin !== location.origin) return;
      e.preventDefault();
      if (reduceMotion) { window.location.href = href; return; }
      loader.classList.add("show");
      window.setTimeout(function () { window.location.href = href; }, 1900);
    });
  }

  /* ---- prefetch internal pages on hover / focus ----------------- */
  function initPrefetch() {
    var done = {};
    function prefetch(href) {
      if (!href || done[href]) return; done[href] = true;
      var l = document.createElement("link"); l.rel = "prefetch"; l.href = href; document.head.appendChild(l);
    }
    document.querySelectorAll('.side-nav a, .pager a, .cta-row a, a[data-prefetch]').forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return;
      a.addEventListener("mouseenter", function () { prefetch(href); }, { once: true });
      a.addEventListener("focus", function () { prefetch(href); }, { once: true });
    });
  }

  /* ---- top scroll-progress bar ---------------------------------- */
  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    function update() {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update); update();
  }

  /* ---- scroll parallax on background blobs ---------------------- */
  function initParallax() {
    if (reduceMotion) return;
    var blobs = document.querySelectorAll(".bg-decor .blob");
    if (!blobs.length) return;
    var ticking = false;
    function upd() {
      var y = window.pageYOffset;
      for (var i = 0; i < blobs.length; i++) blobs[i].style.transform = "translate3d(0," + (y * (0.04 + i * 0.03)).toFixed(1) + "px,0)";
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(upd); ticking = true; } }, { passive: true });
    upd();
  }

  /* ---- 3D tilt on hover (feature cards) ------------------------- */
  function initTilt() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(760px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---- proximity magnetism (objects react as cursor nears) ------ */
  function initProximity() {
    if (reduceMotion || !finePointer) return;
    var els = Array.prototype.slice.call(document.querySelectorAll(".btn, .to-top, .sea-card"));
    if (!els.length) return;
    var mx = -9999, my = -9999, ticking = false;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
    function apply() {
      ticking = false;
      for (var i = 0; i < els.length; i++) {
        var el = els[i], r = el.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = mx - cx, dy = my - cy, dist = Math.sqrt(dx * dx + dy * dy);
        var reach = Math.max(r.width, r.height) / 2 + 90;
        if (dist < reach) {
          var f = 1 - dist / reach;
          var k = el.classList.contains("sea-card") ? 0.16 : 0.34;
          el.style.transform = "translate(" + (dx * k * f).toFixed(1) + "px," + (dy * k * f).toFixed(1) + "px)";
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      }
    }
  }

  /* ---- ambient falling snow + stars (SVG, no emoji) ------------- */
  function startSnow() {
    window.setInterval(function () {
      if (document.hidden || document.body.classList.contains("intro-playing")) return;
      var star = Math.random() < 0.32;
      var f = document.createElement("span");
      f.className = "flake";
      var sz = star ? (16 + Math.random() * 13) : (12 + Math.random() * 13);
      f.style.width = sz + "px"; f.style.height = sz + "px";
      f.style.left = (Math.random() * 100) + "vw";
      var dur = 5 + Math.random() * 4;
      f.style.animationDuration = dur + "s, " + (3 + Math.random() * 3) + "s";
      f.innerHTML = star ? '<span class="star">' + STAR + "</span>" : '<span class="dot"></span>';
      document.body.appendChild(f);
      window.setTimeout(function () { f.remove(); }, dur * 1000);
    }, 900);
  }
})();
