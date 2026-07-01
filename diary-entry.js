/* Diary entry page — reads ?id=<slug>, renders the entry from
   diary-data.js, and links to the older / newer entries. */
(function () {
  "use strict";
  var SPARK = (window.RBIcons && window.RBIcons.spark) || "";

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("diary-article");
    if (!box) return;

    var id = getParam("id");
    var list = (window.DIARY_ENTRIES || []).slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].slug === id) idx = i;

    if (idx < 0) {
      box.innerHTML =
        '<div class="card"><a class="diary-back" href="diary.html">← Back to Diary</a>' +
        '<p class="state-msg">Sorry, that diary entry could not be found.</p></div>';
      document.title = "Diary | Rikka Botan";
      return;
    }

    var e = list[idx];
    document.title = e.title + " | Diary — Rikka Botan";

    var tags = (e.tags || []).map(function (t) { return "<span>#" + t + "</span>"; }).join("");
    var paras = (Array.isArray(e.body) ? e.body : [e.body])
      .map(function (p) { return "<p>" + p + "</p>"; }).join("");

    var art = document.createElement("article");
    art.className = "diary-article card";
    art.innerHTML =
      '<a class="diary-back" href="diary.html">← Back to Diary</a>' +
      '<div class="diary-head"><span class="diary-date">' + fmt(e.date) + '</span>' +
        '<span class="diary-spark">' + SPARK + '</span></div>' +
      '<h1>' + e.title + '</h1>' +
      (tags ? '<div class="diary-tags">' + tags + '</div>' : "") +
      '<div class="diary-body">' + paras + '</div>';
    box.innerHTML = "";
    box.appendChild(art);
    if (window.SiteFX) window.SiteFX.reveal(art);

    var newer = list[idx - 1], older = list[idx + 1];
    var nav = document.createElement("nav");
    nav.className = "entry-nav";
    nav.setAttribute("aria-label", "Diary entries");
    nav.innerHTML =
      (older
        ? '<a class="prev" href="diary-entry.html?id=' + encodeURIComponent(older.slug) + '"><small>Older entry</small><span>← ' + older.title + '</span></a>'
        : '<span></span>') +
      (newer
        ? '<a class="next" href="diary-entry.html?id=' + encodeURIComponent(newer.slug) + '"><small>Newer entry</small><span>' + newer.title + ' →</span></a>'
        : '<span></span>');
    box.appendChild(nav);
  });

  function getParam(name) {
    if (window.URLSearchParams) return new URLSearchParams(location.search).get(name);
    var m = location.search.match(new RegExp("[?&]" + name + "=([^&]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function fmt(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mo[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
})();
