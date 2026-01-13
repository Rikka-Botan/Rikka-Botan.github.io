console.log("Portfolio loaded");
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const targets = document.querySelectorAll(
    "section, .project, .qiita-card, .repo-card, .hf-card, .activity-card"
  );
  
  targets.forEach((el, i) => {
    el.classList.add("scroll-animate");
    el.style.transitionDelay = `${i * 0.05}s`;
  });
  
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          entry.target.classList.add("sway");
  
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  targets.forEach(el => observer.observe(el));

  const flowers = ["🩵", "❄️", "❄️", "❄️", "❄️", "❄️", "❄️", "❄️", "❄️", "❄️"];
    
  function createFlower() {
    if (document.body.classList.contains("intro-playing")) return;
    const flower = document.createElement("div");
    flower.className = "falling-flower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  
    const size = 24 + Math.random() * 32;
    const duration = 2 + Math.random() * 3;
  
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.fontSize = size + "px";
    flower.style.animationDuration = `${duration}s, ${3 + Math.random() * 3}s`;
  
    document.body.appendChild(flower);
  
    setTimeout(() => {
      flower.remove();
    }, duration * 1000);
  }
  setInterval(createFlower, 1000);
  

document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(
    "header h1, section h2"
  );

  headings.forEach(el => {
    el.addEventListener("mouseenter", () => {
      el.classList.remove("rotate-y");
      el.style.animation = "none";

      void el.offsetHeight;

      el.style.animation = "";
      el.classList.add("rotate-y");
    });
  });
});

const canvas = document.getElementById("intro-canvas");
const ctx = canvas.getContext("2d");

function createStar() {
  const r = Math.random();
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  return {
    x: Math.sin(phi) * Math.cos(theta) * canvas.width,
    y: Math.sin(phi) * Math.sin(theta) * canvas.height,
    z: r * canvas.width + 1
  };
}


if (canvas) {
  document.body.classList.add("intro-playing");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let stars = [];
  let speed = 2;
  let warp = false;
  let flashRadius = 0;
  let flashActive = false;
  let rotation = 0;
  let rotationSpeed = 0.01;
  let rotating = true;

  for (let i = 0; i < 1600; i++) {
    stars.push(
      createStar()
    );
  }

  let bgShift = 0;

  function drawBackground() {
    bgShift += warp ? 0.9 : 0.1;

    const grad = ctx.createLinearGradient(
      0,
      bgShift % canvas.height,
      canvas.width,
      canvas.height + (bgShift % canvas.height)
    );

    grad.addColorStop(0, "#050014");
    grad.addColorStop(0.4, "#0b1d3a");
    grad.addColorStop(0.7, "#2b1055");
    grad.addColorStop(1, "#050014");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawStars() {
    drawBackground();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);

    for (let s of stars) {
      s.z -= speed * (0.6 + Math.random() * 0.8);
      if (s.z <= 1) s.z = 1000;

      const scale = 500 / s.z;
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(s.x * scale, s.y * scale, scale * 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFlash() {
    flashRadius += 60;
    const g = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, flashRadius * 0.2,
      canvas.width / 2, canvas.height / 2, flashRadius
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate() {
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

  setTimeout(() => warp = true, 2000);
  setTimeout(() => flashActive = true, 5000);

  setTimeout(() => {
    canvas.remove();
    document.body.classList.remove("intro-playing");
  }, 5500);

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
}
