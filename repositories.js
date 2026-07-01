/* GitHub repositories — fetched live, sorted by stars, top 3 + expandable rest */
(function () {
  "use strict";
  var USER = "Rikka-Botan";
  var box = document.getElementById("repo-list");
  if (!box) return;

  function card(repo) {
    var el = document.createElement("div");
    el.className = "repo-card";
    el.innerHTML =
      '<h3><a href="' + repo.html_url + '" target="_blank" rel="noopener">' + repo.name + '</a></h3>' +
      '<p>' + (repo.description || "No description") + '</p>' +
      '<p>⭐ ' + repo.stargazers_count +
        (repo.language ? ' &nbsp;·&nbsp; ' + repo.language : '') + '</p>';
    if (window.SiteFX) window.SiteFX.reveal(el);
    return el;
  }

  fetch("https://api.github.com/users/" + USER + "/repos?per_page=100")
    .then(function (r) { return r.json(); })
    .then(function (repos) {
      box.innerHTML = "";
      if (!Array.isArray(repos) || !repos.length) {
        box.innerHTML = '<p class="state-msg">No repositories found.</p>';
        return;
      }
      repos.sort(function (a, b) { return b.stargazers_count - a.stargazers_count; });

      var grid = document.createElement("div");
      grid.className = "card-grid";
      repos.slice(0, 3).forEach(function (repo) { grid.appendChild(card(repo)); });
      box.appendChild(grid);

      var rest = repos.slice(3);
      if (rest.length) {
        var d = document.createElement("details");
        d.innerHTML = "<summary>More repositories (" + rest.length + ")</summary>";
        var g2 = document.createElement("div");
        g2.className = "card-grid";
        rest.forEach(function (repo) { g2.appendChild(card(repo)); });
        d.appendChild(g2);
        box.appendChild(d);
      }
    })
    .catch(function (err) {
      console.error("GitHub API error", err);
      box.innerHTML = '<p class="state-msg">Couldn\'t load repositories.</p>';
    });
})();
