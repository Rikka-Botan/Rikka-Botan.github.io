/* About-page photo slider — auto-advance, clickable dots, pause on hover */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var track = document.querySelector(".slider-track");
    var slider = document.querySelector(".slider");
    var dotsBox = document.querySelector(".slider-dots");
    if (!track || !slider) return;

    var imgs = track.querySelectorAll("img");
    var count = imgs.length;
    if (!count) return;

    var index = 0;
    var timer = null;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* build dots */
    var dots = [];
    if (dotsBox) {
      for (var i = 0; i < count; i++) {
        (function (i) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("role", "tab");
          b.setAttribute("aria-label", "Photo " + (i + 1));
          b.addEventListener("click", function () { go(i); restart(); });
          dotsBox.appendChild(b);
          dots.push(b);
        })(i);
      }
    }

    function go(i) {
      index = (i + count) % count;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      for (var k = 0; k < dots.length; k++) {
        dots[k].setAttribute("aria-current", k === index ? "true" : "false");
      }
    }
    function next() { go(index + 1); }
    function start() { if (!reduce) timer = window.setInterval(next, 3000); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    go(0);
    start();

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });
  });
})();
