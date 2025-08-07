const slides = document.getElementById("slides");
const slideWidth = 230; // largura + gap (~180 + 50)
const slideCount = slides.children.length;

// Duplicar slides pra loop infinito
for (let i = 0; i < slideCount; i++) {
  slides.appendChild(slides.children[i].cloneNode(true));
}

let position = 0;
let speed = 1.5;
let isDragging = false;
let startX = 0;
let dragX = 0;

let totalSlides = slides.children.length;
let totalWidth = slideWidth * totalSlides;

function loopPosition(pos) {
  if (pos <= -totalWidth / 2) {
    return pos + totalWidth / 2;
  }
  if (pos >= 0) {
    return pos - totalWidth / 2;
  }
  return pos;
}

function animate() {
  if (!isDragging) {
    position -= speed;
    position = loopPosition(position);
    slides.style.transition = "none";
    slides.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(animate);
}

// Drag desktop
slides.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - position;
  slides.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  dragX = e.pageX - startX;
  position = loopPosition(dragX);
  slides.style.transition = "none";
  slides.style.transform = `translateX(${position}px)`;
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  slides.style.cursor = "grab";
});

// Drag mobile
slides.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - position;
});

slides.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  dragX = e.touches[0].pageX - startX;
  position = loopPosition(dragX);
  slides.style.transition = "none";
  slides.style.transform = `translateX(${position}px)`;
});

slides.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
});

slides.addEventListener("dragstart", (e) => e.preventDefault());

animate();
