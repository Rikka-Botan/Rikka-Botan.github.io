/* =====================================================================
   Diary — entries are a plain array. To add one, copy a block and edit.
   Sorted newest-first automatically. date: "YYYY-MM-DD".
   ===================================================================== */
(function () {
  "use strict";

  var ENTRIES = [
    {
      date: "2026-06-28",
      title: "Tuning NexteraBERT a little further",
      body: "Spent the afternoon poking at inference speed. A small change to the normalization made the encoder noticeably snappier without hurting accuracy. Tiny wins like this keep me going.",
      tags: ["research", "NexteraBERT"]
    },
    {
      date: "2026-06-15",
      title: "Baked cheesecake for a study break",
      body: "When experiments stall, I bake. Today's baked cheesecake came out perfectly creamy. Paired it with a cup of Earl Grey and read a paper on state space models. A good, gentle day.",
      tags: ["baking", "tea"]
    },
    {
      date: "2026-05-30",
      title: "Thinking about representation spaces",
      body: "Been sketching ideas about how to regularize embedding spaces without slowing things down. Filled a whole notebook page with little diagrams. Not sure yet which will survive contact with real data.",
      tags: ["research", "notes"]
    },
    {
      date: "2026-05-12",
      title: "A new pastel cardigan",
      body: "Found the softest lilac cardigan with lace trim. It made my whole week brighter. Sometimes a little frill is exactly the motivation you need before a long training run.",
      tags: ["daily"]
    }
  ];

  var SPARK = (window.RBIcons && window.RBIcons.spark) || "";

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.getElementById("diary-list");
    if (!box) return;

    var list = ENTRIES.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    if (!list.length) { box.innerHTML = '<p class="state-msg">No diary entries yet.</p>'; return; }

    box.innerHTML = "";
    list.forEach(function (e) {
      var entry = document.createElement("article");
      entry.className = "diary-entry";
      var tags = (e.tags || []).map(function (t) { return "<span>#" + t + "</span>"; }).join("");
      entry.innerHTML =
        '<div class="diary-head">' +
          '<span class="diary-date">' + fmt(e.date) + '</span>' +
          '<span class="diary-spark">' + SPARK + '</span>' +
        '</div>' +
        '<h3>' + e.title + '</h3>' +
        '<p>' + e.body + '</p>' +
        (tags ? '<div class="diary-tags">' + tags + '</div>' : "");
      box.appendChild(entry);
      if (window.SiteFX) window.SiteFX.reveal(entry);
    });
  });

  function fmt(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
})();
