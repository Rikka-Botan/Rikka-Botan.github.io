/* Diary list — renders entries from diary-data.js, each linking to its
   own page (diary-entry.html?id=<slug>). */
(function () {
  "use strict";
  var SPARK = (window.RBIcons && window.RBIcons.spark) || "";

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("diary-list");
    if (!box) return;

    var list = (window.DIARY_ENTRIES || []).slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    if (!list.length) { box.innerHTML = '<p class="state-msg">No diary entries yet.</p>'; return; }

    box.innerHTML = "";
    list.forEach(function (e) {
      var a = document.createElement("a");
      a.className = "diary-entry";
      a.href = "diary-entry.html?id=" + encodeURIComponent(e.slug);
      var tags = (e.tags || []).map(function (t) { return "<span>#" + t + "</span>"; }).join("");
      var excerpt = Array.isArray(e.body) ? e.body[0] : (e.body || "");
      a.innerHTML =
        '<div class="diary-head">' +
          '<span class="diary-date">' + fmt(e.date) + '</span>' +
          '<span class="diary-spark">' + SPARK + '</span>' +
        '</div>' +
        '<h3>' + e.title + '</h3>' +
        '<p>' + excerpt + '</p>' +
        (tags ? '<div class="diary-tags">' + tags + '</div>' : "") +
        '<span class="diary-more">Read the entry →</span>';
      box.appendChild(a);
      if (window.SiteFX) window.SiteFX.reveal(a);
    });
  });

  function fmt(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
})();
