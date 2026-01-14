// ===== HERO CAROUSEL DATA =====
const HERO_SLIDES = [
  {
    title: "Milk is a nutritious drink, take care your body.",
    subtitle: "Premium dairy products for healthier living",
  },
  {
    title: "API Agriculture Mechanization",
    subtitle: "Modern technology for sustainable farming",
  },
  {
    title: "We Deliver Good Service With Good Quality",
    subtitle: "Excellence in every aspect of our work",
  },
  {
    title: "Fertilizers and Seeds Distribution",
    subtitle: "Quality seeds for better harvests",
  },
  {
    title: "Songa Dairy Farm",
    subtitle: "Building a sustainable dairy future",
  },
  { title: "Fresh Vegetables", subtitle: "Direct from farm to your table" },
];

// Hero Carousel State
let heroCarouselState = {
  currentSlide: 0,
  totalSlides: 6,
  isAutoPlaying: true,
  autoPlayTimer: null,
  isPaused: false,
};

// Initialize Hero Carousel
function initHeroCarousel() {
  const nextBtn = document.getElementById("heroNext");
  const prevBtn = document.getElementById("heroPrev");
  const heroCarouselEl = document.getElementById("heroCarousel");
  const dots = document.querySelectorAll(".hero-dot");

  // Start auto-play
  startHeroAutoPlay();

  // Navigation event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToHeroSlide(
        (heroCarouselState.currentSlide + 1) % heroCarouselState.totalSlides
      );
      resetHeroAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToHeroSlide(
        (heroCarouselState.currentSlide - 1 + heroCarouselState.totalSlides) %
          heroCarouselState.totalSlides
      );
      resetHeroAutoPlay();
    });
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      goToHeroSlide(slideIndex);
      resetHeroAutoPlay();
    });
  });

  // Pause on hover
  if (heroCarouselEl) {
    heroCarouselEl.addEventListener("mouseenter", pauseHeroAutoPlay);
    heroCarouselEl.addEventListener("mouseleave", resumeHeroAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener("keydown", handleHeroKeyboard);
}

// Go to specific hero slide
function goToHeroSlide(slideIndex) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const titleEl = document.querySelector(".hero-title");
  const subtitleEl = document.getElementById("heroSubtitle");

  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");

  // Update text content
  if (titleEl && subtitleEl) {
    titleEl.textContent = HERO_SLIDES[slideIndex].title;
    subtitleEl.textContent = HERO_SLIDES[slideIndex].subtitle;
  }

  // Update aria-selected attributes
  dots.forEach((dot) => {
    dot.setAttribute("aria-selected", "false");
  });
  dots[slideIndex].setAttribute("aria-selected", "true");

  // Update state
  heroCarouselState.currentSlide = slideIndex;
}

// Start hero auto-play
function startHeroAutoPlay() {
  if (heroCarouselState.isAutoPlaying) return;

  heroCarouselState.isAutoPlaying = true;

  heroCarouselState.autoPlayTimer = setInterval(() => {
    if (!heroCarouselState.isPaused) {
      goToHeroSlide(
        (heroCarouselState.currentSlide + 1) % heroCarouselState.totalSlides
      );
    }
  }, 5000); // 5 seconds per slide
}

// Stop hero auto-play
function stopHeroAutoPlay() {
  if (heroCarouselState.autoPlayTimer) {
    clearInterval(heroCarouselState.autoPlayTimer);
    heroCarouselState.autoPlayTimer = null;
    heroCarouselState.isAutoPlaying = false;
  }
}

// Pause hero auto-play temporarily
function pauseHeroAutoPlay() {
  heroCarouselState.isPaused = true;
}

// Resume hero auto-play
function resumeHeroAutoPlay() {
  heroCarouselState.isPaused = false;
}

// Reset hero auto-play timer
function resetHeroAutoPlay() {
  stopHeroAutoPlay();
  startHeroAutoPlay();
}

// Hero keyboard navigation
function handleHeroKeyboard(event) {
  if (event.key === "ArrowLeft") {
    const prevBtn = document.getElementById("heroPrev");
    if (prevBtn) prevBtn.click();
  } else if (event.key === "ArrowRight") {
    const nextBtn = document.getElementById("heroNext");
    if (nextBtn) nextBtn.click();
  }
}

// Simple animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".subsidiary-card, .news-card, .client-logo")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

// Initialize carousel when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initHeroCarousel();
    initDropdowns();
  });
} else {
  initHeroCarousel();
  initDropdowns();
}
