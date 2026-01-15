let currentIndex = 0;
const galleryItems = document.querySelectorAll(".gallery-item img");

function openModal(element) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const img = element.querySelector("img");

  currentIndex = Array.from(galleryItems).indexOf(img);
  modalImg.src = img.src;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex >= galleryItems.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = galleryItems.length - 1;

  document.getElementById("modal-img").src = galleryItems[currentIndex].src;
}

window.onclick = function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) closeModal();
};

document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("modal");
  if (modal.style.display === "block") {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
  }
});
