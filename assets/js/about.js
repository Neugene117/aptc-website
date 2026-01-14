// Smooth scroll for Discover button
document.querySelector(".discover-btn").addEventListener("click", function () {
  document.querySelector(".content-section").scrollIntoView({
    behavior: "smooth",
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all cards for animation
document
  .querySelectorAll(".mv-card, .unit-card, .partners-image, .partners-list")
  .forEach((card) => {
    observer.observe(card);
  });

// Add hover effects to business units
document.querySelectorAll(".unit-card").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    this.style.transition = "transform 0.3s ease, background-color 0.3s ease";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effects to fact cards
document.querySelectorAll(".fact-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// Add hover effects to partner items
document.querySelectorAll(".partner-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(10px)";
    this.style.transition = "transform 0.3s ease";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0)";
  });
});

// Parallax effect for business units background
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const unitsBackground = document.querySelector(".units-background");
  if (unitsBackground) {
    const rate = scrolled * 0.5;
    unitsBackground.style.transform = `translateY(${rate}px)`;
  }
});
