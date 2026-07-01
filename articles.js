/* Qiita articles — fetched live, sorted by likes, top 3 + expandable rest */
(function () {
  "use strict";
  var USER = "peony_snow";
  var box = document.getElementById("qiita-list");
  if (!box) return;

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var m = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    return d.getFullYear() + "." + m + "." + day;
  }

  function card(a) {
    var el = document.createElement("div");
    el.className = "qiita-card";
    el.innerHTML =
      '<div class="card-header">' +
        '<img class="qiita-icon" src="images/qiita_icon.png" alt="" loading="lazy">' +
        '<span class="user-name">Qiita</span>' +
      '</div>' +
      '<h3><a href="' + a.url + '" target="_blank" rel="noopener">' + a.title + '</a></h3>' +
      '<p>❤️ ' + a.likes_count + ' Likes</p>' +
      '<p>🗓 ' + fmtDate(a.updated_at) + '</p>';
    if (window.SiteFX) window.SiteFX.reveal(el);
    return el;
  }

  fetch("https://qiita.com/api/v2/users/" + USER + "/items?per_page=50")
    .then(function (r) { return r.json(); })
    .then(function (items) {
      box.innerHTML = "";
      if (!items || !items.length) {
        box.innerHTML = '<p class="state-msg">No articles found.</p>';
        return;
      }
      items.sort(function (a, b) { return b.likes_count - a.likes_count; });

      var grid = document.createElement("div");
      grid.className = "card-grid";
      items.slice(0, 3).forEach(function (a) { grid.appendChild(card(a)); });
      box.appendChild(grid);

      var rest = items.slice(3);
      if (rest.length) {
        var d = document.createElement("details");
        d.innerHTML = "<summary>More articles (" + rest.length + ")</summary>";
        var g2 = document.createElement("div");
        g2.className = "card-grid";
        rest.forEach(function (a) { g2.appendChild(card(a)); });
        d.appendChild(g2);
        box.appendChild(d);
      }
    })
    .catch(function (err) {
      console.error("Qiita API error", err);
      box.innerHTML = '<p class="state-msg">Couldn\'t load articles.</p>';
    });
})();
