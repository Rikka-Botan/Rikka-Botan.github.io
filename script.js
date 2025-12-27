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
  
          // 表示後の演出
          entry.target.classList.add("sway");
  
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  targets.forEach(el => observer.observe(el));
  