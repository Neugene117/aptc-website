// ===== DROPDOWN MENU HANDLING =====

// Handle dropdown interactions on desktop
function initDropdowns() {
  const dropdowns = document.querySelectorAll(".navbar-item.dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    // Hover effect on desktop
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("active");
    });

    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("active");
    });

    // Click effect for mobile and accessibility
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = dropdown.classList.contains("active");

        // Close all other dropdowns
        document
          .querySelectorAll(".navbar-item.dropdown.active")
          .forEach((item) => {
            if (item !== dropdown) {
              item.classList.remove("active");
            }
          });

        // Toggle current dropdown
        if (isActive) {
          dropdown.classList.remove("active");
        } else {
          dropdown.classList.add("active");
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar-item.dropdown")) {
      document
        .querySelectorAll(".navbar-item.dropdown.active")
        .forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
    }
  });
}

// ===== MOBILE MENU HANDLING =====

// Mobile Menu Button
document.getElementById("mobileMenuBtn").addEventListener("click", function () {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");
  this.querySelector("i").classList.toggle("fa-bars");
  this.querySelector("i").classList.toggle("fa-times");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", function () {
    // Only close if it's not a dropdown toggle
    if (!this.classList.contains("dropdown-toggle")) {
      const nav = document.getElementById("mainNav");
      nav.classList.remove("active");
      document
        .getElementById("mobileMenuBtn")
        .querySelector("i")
        .classList.add("fa-bars");
      document
        .getElementById("mobileMenuBtn")
        .querySelector("i")
        .classList.remove("fa-times");
    }
  });
});

// Add active class to clicked nav link
document.querySelectorAll("nav a:not(.dropdown-toggle)").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll("nav a:not(.dropdown-toggle)").forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});
