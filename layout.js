/* =====================================================================
   Rikka Botan | Portfolio — shared layout
   Injects sidebar, mobile drawer, pager, footer, background decor and
   the SVG icon set. Single source of truth = PAGES. Runs immediately.
   ===================================================================== */
(function () {
  "use strict";

  /* --- SVG icons (outline, inherit currentColor) --------------------- */
  function svg(paths) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + paths + '</svg>';
  }
  var ICON = {
    index:        svg('<path d="M3.5 11.5 12 4l8.5 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>'),
    about:        svg('<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>'),
    diary:        svg('<path d="M6 4h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M9 4v16"/>'),
    projects:     svg('<path d="M9.5 3h5"/><path d="M10 3v5.5l-4.4 8A2 2 0 0 0 7.4 19.5h9.2a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M8 14h8"/>'),
    articles:     svg('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 12h5M9.5 15.5h5"/>'),
    repositories: svg('<path d="M9 8.5 5.5 12 9 15.5"/><path d="M15 8.5 18.5 12 15 15.5"/>'),
    models:       svg('<path d="M12 3.2 20 7.5v9L12 20.8 4 16.5v-9z"/><path d="M12 3.2v17.6M4 7.5l8 4.5 8-4.5"/>'),
    activities:   svg('<path d="M12 3.5 13.7 8.6 19 10l-5.3 1.4L12 16.5l-1.7-5.1L5 10l5.3-1.4z"/><path d="M18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"/>'),
    contact:      svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2.2"/><path d="M4.2 7.2 12 13l7.8-5.8"/>')
  };
  var HEART = '<svg class="title-heart" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="url(#rbGrad)" d="M12 20.8S3.6 15.3 3.6 9.6C3.6 6.7 5.8 4.8 8.2 4.8c1.7 0 3 .95 3.8 2.1.8-1.15 2.1-2.1 3.8-2.1 2.4 0 4.6 1.9 4.6 4.8 0 5.7-8.4 11.2-8.4 11.2z"/></svg>';
  var XLOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.3-5.6L6.3 21h-3l7-8L2 3h6.2l3.9 5.2z"/></svg>';
  var SPARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.6 5L19 9.6l-5.4 1.6L12 16l-1.6-4.8L5 9.6 10.4 8z"/></svg>';

  /* expose a couple of glyphs for other scripts (diary, snow) */
  window.RBIcons = { spark: SPARK, star: SPARK };

  var PAGES = [
    { id: "index",        file: "index.html",        label: "Home" },
    { id: "about",        file: "about.html",        label: "About" },
    { id: "diary",        file: "diary.html",        label: "Diary" },
    { id: "projects",     file: "projects.html",     label: "Projects" },
    { id: "articles",     file: "articles.html",     label: "Articles" },
    { id: "repositories", file: "repositories.html", label: "Repositories" },
    { id: "models",       file: "models.html",       label: "Models" },
    { id: "activities",   file: "activities.html",   label: "Activities" },
    { id: "contact",      file: "contact.html",      label: "Contact" }
  ];

  var current = document.body.getAttribute("data-page") || "index";
  var idx = 0;
  for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === current) idx = i;

  /* --- shared gradient def (referenced by inline SVGs) --------------- */
  var defs = document.createElement("div");
  defs.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  defs.setAttribute("aria-hidden", "true");
  defs.innerHTML =
    '<svg><defs><linearGradient id="rbGrad" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#6bb7e9"/><stop offset="1" stop-color="#f29ac1"/>' +
    '</linearGradient></defs></svg>';
  document.body.appendChild(defs);

  /* --- background decor (parallax) ---------------------------------- */
  var decor = document.createElement("div");
  decor.className = "bg-decor";
  decor.innerHTML = '<span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>';
  document.body.appendChild(decor);

  /* --- sidebar ------------------------------------------------------ */
  var navHTML = "";
  for (var n = 0; n < PAGES.length; n++) {
    var p = PAGES[n];
    var on = p.id === current ? ' class="active" aria-current="page"' : "";
    navHTML += '<a href="' + p.file + '"' + on + '>' +
      '<span class="ico">' + (ICON[p.id] || "") + '</span>' +
      '<span class="lbl">' + p.label + '</span></a>';
  }
  var sidebar = document.createElement("aside");
  sidebar.className = "sidebar"; sidebar.id = "sidebar";
  sidebar.innerHTML =
    '<a class="brand" href="index.html">' +
      '<img class="brand-logo" src="images/RikkaBotan_Logo.png" alt="">' +
      '<span class="brand-text">Rikka Botan<small>Portfolio</small></span>' +
    '</a>' +
    '<nav class="side-nav" aria-label="Site navigation">' + navHTML + '</nav>' +
    '<div class="side-foot">' +
      '<a class="side-social" href="https://x.com/peony__snow" target="_blank" rel="noopener">' + XLOGO + '<span>@peony__snow</span></a>' +
      '<p>© 2026 Rikka Botan</p>' +
    '</div>';

  /* --- mobile topbar ------------------------------------------------ */
  var topbar = document.createElement("header");
  topbar.className = "layout-topbar";
  topbar.innerHTML =
    '<button class="menu-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="sidebar"><span></span><span></span><span></span></button>' +
    '<a class="topbar-brand" href="index.html"><img src="images/RikkaBotan_Logo.png" alt=""><span>Rikka Botan</span></a>';

  var overlay = document.createElement("div"); overlay.className = "nav-overlay";
  var progress = document.createElement("div"); progress.className = "scroll-progress";

  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.appendChild(overlay);
  document.body.appendChild(progress);

  /* --- decorate page-head titles with a heart ----------------------- */
  var h1 = document.querySelector(".page-head h1");
  if (h1) h1.insertAdjacentHTML("afterbegin", HEART);

  /* --- pager (all pages except home) -------------------------------- */
  var main = document.querySelector("main");
  if (main && current !== "index") {
    var prev = PAGES[idx - 1] || PAGES[0];
    var next = PAGES[idx + 1] || PAGES[0];
    var pager = document.createElement("nav");
    pager.className = "pager"; pager.setAttribute("aria-label", "Pagination");
    pager.innerHTML =
      '<a class="prev" href="' + prev.file + '"><small>Previous</small><span>← ' + prev.label + '</span></a>' +
      '<a class="next" href="' + next.file + '"><small>Next</small><span>' + next.label + ' →</span></a>';
    main.appendChild(pager);
  }

  /* --- footer ------------------------------------------------------- */
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = '<p>© 2026 Rikka Botan · All rights reserved · made with ' +
    '<svg class="foot-heart" viewBox="0 0 24 24" aria-hidden="true"><path fill="url(#rbGrad)" d="M12 20.8S3.6 15.3 3.6 9.6C3.6 6.7 5.8 4.8 8.2 4.8c1.7 0 3 .95 3.8 2.1.8-1.15 2.1-2.1 3.8-2.1 2.4 0 4.6 1.9 4.6 4.8 0 5.7-8.4 11.2-8.4 11.2z"/></svg></p>';
  document.body.appendChild(footer);

  /* --- drawer behaviour --------------------------------------------- */
  var toggle = topbar.querySelector(".menu-toggle");
  function openNav() { sidebar.classList.add("open"); overlay.classList.add("show"); toggle.setAttribute("aria-expanded", "true"); document.body.classList.add("nav-open"); }
  function closeNav() { sidebar.classList.remove("open"); overlay.classList.remove("show"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("nav-open"); }
  toggle.addEventListener("click", function () { sidebar.classList.contains("open") ? closeNav() : openNav(); });
  overlay.addEventListener("click", closeNav);
  sidebar.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
})();
