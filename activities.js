/* Activities — renders from activities-data.js (window.ACTIVITIES),
   newest first, showing the 4 most recent and collapsing the rest. */
(function () {
  "use strict";

  function card(a) {
    var el = document.createElement("div");
    el.className = "activity-card";
    var body = (Array.isArray(a.body) ? a.body : [a.body]).join("<br>");
    var link = a.link
      ? '<br><br><a href="' + a.link.url + '" target="_blank" rel="noopener">' + (a.link.label || "Link") + "</a>"
      : "";
    el.innerHTML =
      '<span class="activity-date">' + fmt(a.date) + '</span>' +
      '<h3>' + a.title + '</h3>' +
      '<p>' + body + link + '</p>' +
      '<span class="activity-tag" data-kind="' + a.kind + '">' + a.kind + '</span>';
    if (window.SiteFX) window.SiteFX.reveal(el);
    return el;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var target = document.getElementById("activities-container");
    if (!target) return;

    var list = (window.ACTIVITIES || []).slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    if (!list.length) {
      target.innerHTML = '<p class="state-msg">No activities yet.</p>';
      return;
    }

    target.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "activities-grid";
    list.slice(0, 4).forEach(function (a) { grid.appendChild(card(a)); });
    target.appendChild(grid);

    var rest = list.slice(4);
    if (rest.length) {
      var d = document.createElement("details");
      d.innerHTML = "<summary>Earlier activities (" + rest.length + ")</summary>";
      var g2 = document.createElement("div");
      g2.className = "activities-grid";
      rest.forEach(function (a) { g2.appendChild(card(a)); });
      d.appendChild(g2);
      target.appendChild(d);
    }
  });

  function fmt(date) { return (date || "").replace(/-/g, "."); }
})();
