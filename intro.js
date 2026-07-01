/* =====================================================================
   Rikka Botan | Portfolio — star-warp intro (home page only)
   Plays once per browser session, respects reduced-motion, and always
   cleans itself up (safety timeout + try/catch) so it can never leave
   the visitor stuck on a black screen.
   ===================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("intro-canvas");
  if (!canvas) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem("rb-intro-seen") === "1"; } catch (e) {}

  /* skip entirely if not wanted */
  if (reduce || seen) { canvas.remove(); return; }
  try { sessionStorage.setItem("rb-intro-seen", "1"); } catch (e) {}

  var ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }

  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    document.body.classList.remove("intro-playing");
    if (canvas && canvas.parentNode) canvas.remove();
  }
  /* absolute failsafe — no matter what happens, restore the page */
  window.setTimeout(finish, 6500);

  try {
    document.body.classList.add("intro-playing");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var stars = [];
    var speed = 2, warp = false, flashRadius = 0, flashActive = false;
    var rotation = 0, rotationSpeed = 0.01, rotating = true;

    function makeStar() {
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      return {
        x: Math.sin(phi) * Math.cos(theta) * canvas.width,
        y: Math.sin(phi) * Math.sin(theta) * canvas.height,
        z: Math.random() * canvas.width + 1
      };
    }
    for (var i = 0; i < 1400; i++) stars.push(makeStar());

    var bgShift = 0;
    function drawBackground() {
      bgShift += warp ? 0.9 : 0.1;
      var g = ctx.createLinearGradient(
        0, bgShift % canvas.height,
        canvas.width, canvas.height + (bgShift % canvas.height)
      );
      g.addColorStop(0, "#050014");
      g.addColorStop(0.4, "#0b1d3a");
      g.addColorStop(0.7, "#2b1055");
      g.addColorStop(1, "#050014");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawStars() {
      drawBackground();
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      for (var s = 0; s < stars.length; s++) {
        var st = stars[s];
        st.z -= speed * (0.6 + Math.random() * 0.8);
        if (st.z <= 1) st.z = 1000;
        var scale = 500 / st.z;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(st.x * scale, st.y * scale, scale * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    function drawFlash() {
      flashRadius += 60;
      var g = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, flashRadius * 0.2,
        canvas.width / 2, canvas.height / 2, flashRadius
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function animate() {
      if (finished) return;
      drawStars();
      if (warp) speed += 0.15;
      if (flashActive) drawFlash();
      if (rotating) {
        rotation += rotationSpeed;
        rotationSpeed *= 0.98;
        if (rotationSpeed < 0.0001) rotating = false;
      }
      requestAnimationFrame(animate);
    }
    animate();

    window.setTimeout(function () { warp = true; }, 2000);
    window.setTimeout(function () { flashActive = true; }, 4700);
    window.setTimeout(finish, 5400);

    window.addEventListener("resize", function () {
      if (finished) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  } catch (err) {
    finish();
  }
})();
