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

document.addEventListener('DOMContentLoaded', function() {
  // Destaques
  fetch('../components/produtos_destaque.json')
    .then(response => response.json())
    .then(produtos => {
      const box = document.querySelector('.destaques-box');
      if (box) {
        box.innerHTML = '';
        produtos.forEach(produto => {
          const card = document.createElement('div');
          card.className = 'destaque-card';
          card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="destaque-img" />
            <div class="destaque-info">
              <span class="destaque-nome">${produto.nome}</span>
              <span class="destaque-preco">${produto.preco}</span>
              <span class="destaque-desconto">${produto.desconto}</span>
            </div>
          `;
          box.appendChild(card);
        });
      }
    });

  // Mais Vendidos
  fetch('../components/produtos_mais_vendidos.json')
    .then(response => response.json())
    .then(produtos => {
      const box = document.querySelector('.mais-vendidos-box');
      if (box) {
        box.innerHTML = '';
        produtos.forEach(produto => {
          const card = document.createElement('div');
          card.className = 'destaque-card';
          card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="destaque-img" />
            <div class="destaque-info">
              <span class="destaque-nome">${produto.nome}</span>
              <span class="destaque-preco">${produto.preco}</span>
              <span class="destaque-desconto">${produto.desconto}</span>
            </div>
          `;
          box.appendChild(card);
        });
      }
    });

  // Carregar produtos promoções do JSON
  fetch('../components/produtos_promocoes.json')
    .then(response => response.json())
    .then(produtos => {
      const slides = document.getElementById('slides');
      if (slides) {
        slides.innerHTML = '';
        produtos.forEach(produto => {
          const card = document.createElement('div');
          card.className = 'produto';
          card.innerHTML = `
            <span class="produto-nome" style="display:none">${produto.nome}</span>
            <img src="${produto.imagem}" alt="${produto.nome}" />
            <div class="info">
              <span class="preco-antigo">${produto.preco_antigo}</span>
              <span class="preco-novo">${produto.preco_novo}</span>
              <span class="desconto">${produto.desconto}</span>
            </div>
          `;
          // Adiciona evento de clique para ir para a página do produto
          card.addEventListener('click', function() {
            window.location.href = `product.html?nome=${encodeURIComponent(produto.nome)}`;
          });
          slides.appendChild(card);
        });
      }
    });

  // Slider arrows
  function setupSliderArrows(containerSelector, boxSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const leftArrow = container.querySelector('.destaques-slider-arrow.left');
    const rightArrow = container.querySelector('.destaques-slider-arrow.right');
    const sliderBox = container.querySelector(boxSelector);
    if (!leftArrow || !rightArrow || !sliderBox) return;
    leftArrow.addEventListener('click', function() {
      sliderBox.scrollBy({ left: -250, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', function() {
      sliderBox.scrollBy({ left: 250, behavior: 'smooth' });
    });
  }

  setupSliderArrows('.section-destaques .destaques-slider-container', '.destaques-box');
  setupSliderArrows('.section-mais-vendidos .destaques-slider-container', '.mais-vendidos-box');

  // Adiciona evento nos cards dos produtos para abrir a página do produto
  function setupProductClick(boxSelector, cardSelector, nameSelector) {
    const box = document.querySelector(boxSelector);
    if (!box) return;
    box.addEventListener('click', function(e) {
      const card = e.target.closest(cardSelector);
      if (card) {
        const nome = card.querySelector(nameSelector)?.textContent || 'Produto';
        window.location.href = `product.html?nome=${encodeURIComponent(nome)}`;
      }
    });
  }

  setupProductClick('.destaques-box', '.destaque-card', '.destaque-nome');
  setupProductClick('.mais-vendidos-box', '.destaque-card', '.destaque-nome');
  setupProductClick('#slides', '.produto', '.produto-nome');
});
