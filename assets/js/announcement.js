function toggleDetails(element) {
  const card = element.closest(".announcement-card");
  const details = card.querySelector(".card-details");
  const arrow = card.querySelector(".arrow");

  details.classList.toggle("expanded");
  if (arrow) arrow.classList.toggle("rotated");
}

function filterAnnouncements(category) {
  const cards = document.querySelectorAll(".announcement-card");
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function scrollToAnnouncement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });

    // Highlight the timeline item
    document.querySelectorAll(".timeline-item").forEach((item) => {
      item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  }
}

// Intersection Observer for active state
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const index = id.split("-")[1];
        document.querySelectorAll(".timeline-item").forEach((item, i) => {
          item.classList.toggle("active", i === parseInt(index) - 1);
        });
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".announcement-card").forEach((card) => {
  observer.observe(card);
});
