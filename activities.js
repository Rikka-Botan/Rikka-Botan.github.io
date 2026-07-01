/* Activities — sort the static cards newest-first, show 4, collapse the rest */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var source = document.getElementById("activities-source");
    var target = document.getElementById("activities-container");
    if (!source || !target) return;

    var cards = Array.prototype.slice.call(source.querySelectorAll(".activity-card"));
    cards.sort(function (a, b) {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    });

    var grid = document.createElement("div");
    grid.className = "activities-grid";
    cards.slice(0, 4).forEach(function (c) {
      grid.appendChild(c);
      if (window.SiteFX) window.SiteFX.reveal(c);
    });
    target.appendChild(grid);

    var rest = cards.slice(4);
    if (rest.length) {
      var d = document.createElement("details");
      d.innerHTML = "<summary>Earlier activities (" + rest.length + ")</summary>";
      var g2 = document.createElement("div");
      g2.className = "activities-grid";
      rest.forEach(function (c) {
        g2.appendChild(c);
        if (window.SiteFX) window.SiteFX.reveal(c);
      });
      d.appendChild(g2);
      target.appendChild(d);
    }

    source.remove();
  });
})();
