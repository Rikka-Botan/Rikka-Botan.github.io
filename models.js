/* Hugging Face models — fetched live, sorted by likes, top 3 + expandable rest */
(function () {
  "use strict";
  var USER = "RikkaBotan";
  var box = document.getElementById("hf-list");
  if (!box) return;

  function card(m) {
    var el = document.createElement("div");
    el.className = "hf-card";
    el.innerHTML =
      '<h3><a href="https://huggingface.co/' + m.modelId + '" target="_blank" rel="noopener">' +
        m.modelId + '</a></h3>' +
      (m.pipeline_tag ? '<p>' + m.pipeline_tag + '</p>' : '') +
      '<p>❤️ ' + (m.likes || 0) + ' Likes' +
        (m.downloads ? ' &nbsp;·&nbsp; ⬇ ' + m.downloads : '') + '</p>';
    if (window.SiteFX) window.SiteFX.reveal(el);
    return el;
  }

  fetch("https://huggingface.co/api/models?author=" + USER)
    .then(function (r) { return r.json(); })
    .then(function (models) {
      box.innerHTML = "";
      if (!Array.isArray(models) || !models.length) {
        box.innerHTML = '<p class="state-msg">No models found.</p>';
        return;
      }
      models.sort(function (a, b) { return (b.likes || 0) - (a.likes || 0); });

      var grid = document.createElement("div");
      grid.className = "card-grid";
      models.slice(0, 3).forEach(function (m) { grid.appendChild(card(m)); });
      box.appendChild(grid);

      var rest = models.slice(3);
      if (rest.length) {
        var d = document.createElement("details");
        d.innerHTML = "<summary>More models (" + rest.length + ")</summary>";
        var g2 = document.createElement("div");
        g2.className = "card-grid";
        rest.forEach(function (m) { g2.appendChild(card(m)); });
        d.appendChild(g2);
        box.appendChild(d);
      }
    })
    .catch(function (err) {
      console.error("HF API error", err);
      box.innerHTML = '<p class="state-msg">Couldn\'t load models.</p>';
    });
})();
