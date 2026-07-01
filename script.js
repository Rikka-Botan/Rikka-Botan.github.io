/* =====================================================================
   Rikka Botan | Portfolio — interactions & effects
   Loaded after layout.js (end of <body>). Exposes window.SiteFX.reveal().
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var revealObserver = null;

  window.SiteFX = {
    reveal: function (el) {
      if (!el) return;
      if (reduceMotion || !revealObserver) { el.classList.add("is-visible"); return; }
      el.classList.add("reveal");
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
    initCursorGlow();
    initTilt();
    initMagnetic();
    if (!reduceMotion) startPetals();
  });

  window.addEventListener("pageshow", function () {
    document.documentElement.classList.remove("is-leaving");
    document.documentElement.classList.add("is-ready");
  });

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---- scroll reveal -------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(
      "[data-reveal], main > section, .card, .sea-card, .activity-card, .diary-entry"
    );
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i * 0.05, 0.35) + "s";
      revealObserver.observe(el);
    });
  }

  /* ---- playful spin on hover for headings ----------------------- */
  function initHeadingSpin() {
    if (reduceMotion) return;
    document.querySelectorAll(".brand-logo, .page-head h1, .hero-title, main section > h2")
      .forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          el.classList.remove("rotate-y");
          void el.offsetWidth;
          el.classList.add("rotate-y");
        });
      });
  }

  /* ---- back-to-top ---------------------------------------------- */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "to-top"; btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
    function onScroll() { btn.classList.toggle("show", window.pageYOffset > 340); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---- fade transition between internal pages ------------------- */
  function initPageTransition() {
    if (reduceMotion) return;
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
      document.documentElement.classList.add("is-leaving");
      window.setTimeout(function () { window.location.href = href; }, 260);
    });
  }

  /* ---- prefetch internal pages on hover / focus ----------------- */
  function initPrefetch() {
    var done = {};
    function prefetch(href) {
      if (!href || done[href]) return;
      done[href] = true;
      var l = document.createElement("link");
      l.rel = "prefetch"; l.href = href;
      document.head.appendChild(l);
    }
    document.querySelectorAll('.side-nav a, .pager a, .cta-row a, a[data-prefetch]')
      .forEach(function (a) {
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
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var ratio = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = "scaleX(" + ratio + ")";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---- soft glow that trails the cursor ------------------------- */
  function initCursorGlow() {
    if (reduceMotion || !finePointer) return;
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
    window.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      x += (tx - x) * 0.15; y += (ty - y) * 0.15;
      glow.style.transform = "translate(" + x + "px," + y + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---- 3D tilt on hover for feature cards ----------------------- */
  function initTilt() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.style.transformStyle = "preserve-3d";
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(760px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" +
          (px * 5).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---- magnetic pull on buttons --------------------------------- */
  function initMagnetic() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".btn").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (mx * 0.22).toFixed(1) + "px," + (my * 0.35).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- ambient falling petals ----------------------------------- */
  function startPetals() {
    var glyphs = ["🩵", "❄️", "❄️", "❄️", "❄️", "❄️"];
    window.setInterval(function () {
      if (document.hidden || document.body.classList.contains("intro-playing")) return;
      var f = document.createElement("div");
      f.className = "petal emoji";
      f.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      var dur = 3 + Math.random() * 3;
      f.style.left = (Math.random() * 100) + "vw";
      f.style.fontSize = (16 + Math.random() * 20) + "px";
      f.style.animationDuration = dur + "s, " + (3 + Math.random() * 3) + "s";
      document.body.appendChild(f);
      window.setTimeout(function () { f.remove(); }, dur * 1000);
    }, 1500);
  }
})();
