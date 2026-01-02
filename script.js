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
    const flower = document.createElement("div");
    flower.className = "falling-flower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  
    const size = 24 + Math.random() * 32;
    const duration = 3 + Math.random() * 6;
  
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.fontSize = size + "px";
    flower.style.animationDuration = `${duration}s, ${3 + Math.random() * 4}s`;
  
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
