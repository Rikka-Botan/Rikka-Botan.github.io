/* =====================================================================
   Rikka Botan | Portfolio — shared layout
   Injects the sidebar, mobile topbar/drawer, pager and footer on every
   page, keyed off <body data-page="…">. Single source of truth for the
   navigation order so adding a page = editing PAGES only.
   Runs immediately (included at end of <body>), before script.js.
   ===================================================================== */
(function () {
  "use strict";

  var PAGES = [
    { id: "index",        file: "index.html",        label: "Home",         icon: "🏠" },
    { id: "about",        file: "about.html",        label: "About",        icon: "🎀" },
    { id: "diary",        file: "diary.html",        label: "Diary",        icon: "📔" },
    { id: "projects",     file: "projects.html",     label: "Projects",     icon: "🔬" },
    { id: "articles",     file: "articles.html",     label: "Articles",     icon: "📝" },
    { id: "repositories", file: "repositories.html", label: "Repositories", icon: "💻" },
    { id: "models",       file: "models.html",       label: "Models",       icon: "🤗" },
    { id: "activities",   file: "activities.html",   label: "Activities",   icon: "✨" },
    { id: "contact",      file: "contact.html",      label: "Contact",      icon: "💌" }
  ];

  var current = document.body.getAttribute("data-page") || "index";
  var idx = 0;
  for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === current) idx = i;

  /* ---- sidebar ---- */
  var navHTML = "";
  for (var n = 0; n < PAGES.length; n++) {
    var p = PAGES[n];
    var on = p.id === current ? ' class="active" aria-current="page"' : "";
    navHTML +=
      '<a href="' + p.file + '"' + on + '>' +
        '<span class="ico emoji" aria-hidden="true">' + p.icon + '</span>' +
        '<span class="lbl">' + p.label + '</span>' +
      '</a>';
  }

  var sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.id = "sidebar";
  sidebar.innerHTML =
    '<a class="brand" href="index.html">' +
      '<img class="brand-logo" src="images/RikkaBotan_Logo.png" alt="">' +
      '<span class="brand-text">Rikka Botan<small>Portfolio</small></span>' +
    '</a>' +
    '<nav class="side-nav" aria-label="Site navigation">' + navHTML + '</nav>' +
    '<div class="side-foot">' +
      '<a class="side-social" href="https://x.com/peony__snow" target="_blank" rel="noopener">✕ &nbsp;X / Twitter</a>' +
      '<p>© 2026 Rikka Botan</p>' +
    '</div>';

  /* ---- mobile topbar ---- */
  var topbar = document.createElement("header");
  topbar.className = "layout-topbar";
  topbar.innerHTML =
    '<button class="menu-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="sidebar">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<a class="topbar-brand" href="index.html">' +
      '<img src="images/RikkaBotan_Logo.png" alt=""><span>Rikka Botan</span>' +
    '</a>';

  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";

  var progress = document.createElement("div");
  progress.className = "scroll-progress";

  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.appendChild(overlay);
  document.body.appendChild(progress);

  /* ---- pager (all pages except home) ---- */
  var main = document.querySelector("main");
  if (main && current !== "index") {
    var prev = PAGES[idx - 1] || PAGES[0];
    var next = PAGES[idx + 1] || PAGES[0];
    var pager = document.createElement("nav");
    pager.className = "pager";
    pager.setAttribute("aria-label", "Pagination");
    pager.innerHTML =
      '<a class="prev" href="' + prev.file + '"><small>Previous</small><span>← ' + prev.label + '</span></a>' +
      '<a class="next" href="' + next.file + '"><small>Next</small><span>' + next.label + ' →</span></a>';
    main.appendChild(pager);
  }

  /* ---- footer ---- */
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = '<p>© 2026 Rikka Botan · All rights reserved · made with <span class="emoji">🩵</span></p>';
  document.body.appendChild(footer);

  /* ---- drawer behaviour ---- */
  var toggle = topbar.querySelector(".menu-toggle");
  function openNav() {
    sidebar.classList.add("open"); overlay.classList.add("show");
    toggle.setAttribute("aria-expanded", "true"); document.body.classList.add("nav-open");
  }
  function closeNav() {
    sidebar.classList.remove("open"); overlay.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("nav-open");
  }
  toggle.addEventListener("click", function () {
    sidebar.classList.contains("open") ? closeNav() : openNav();
  });
  overlay.addEventListener("click", closeNav);
  sidebar.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
})();
