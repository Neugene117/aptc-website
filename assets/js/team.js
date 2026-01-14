// Discover button scrolls to team section
document.querySelector(".discover-btn").addEventListener("click", function () {
  document.querySelector(".team-section").scrollIntoView({
    behavior: "smooth",
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".stat-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("count-up");
            const counter = card.querySelector("h3");
            const target = parseInt(counter.getAttribute("data-target"));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent =
                  Math.floor(current) + (target >= 1000 ? "+" : "+");
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + "+";
              }
            };
            updateCounter();
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(document.querySelector(".stats-section"));
