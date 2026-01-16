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

// Modal functionality
const modal = document.getElementById("teamModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalBio = document.getElementById("modalBio");
const modalPhone = document.getElementById("modalPhone");
const modalEmail = document.getElementById("modalEmail");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".card-image").forEach((card) => {
  card.addEventListener("click", function () {
    const teamCard = this.closest(".team-card");
    const imgSrc = this.querySelector("img").src;
    const name = teamCard.querySelector(".card-info h3").textContent;
    const title = teamCard.querySelector(".card-info p").textContent;
    const bio = teamCard.getAttribute("data-bio");
    const phone = teamCard.getAttribute("data-phone");
    const email = teamCard.getAttribute("data-email");

    modalImg.src = imgSrc;
    modalName.textContent = name;
    modalTitle.textContent = title;
    modalBio.textContent = bio;
    modalPhone.textContent = phone;
    modalEmail.textContent = email;

    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
