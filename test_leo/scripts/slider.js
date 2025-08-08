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
            // Substitui espaços por hífens, remove % e encode para URL
            const nomeUrl = produto.nome.replace(/\s+/g, '-').replace(/%/g, '').toLowerCase();
            window.location.href = `product.html?nome=${encodeURIComponent(nomeUrl)}`;
          });
          slides.appendChild(card);
        });
      }
    });

  // Slider arrows
  function setupSliderArrows(containerSelector, boxSelector, leftArrowSelector = null, rightArrowSelector = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const leftArrow = leftArrowSelector
      ? container.querySelector(leftArrowSelector)
      : container.querySelector('.left');
    const rightArrow = rightArrowSelector
      ? container.querySelector(rightArrowSelector)
      : container.querySelector('.right');
    const sliderBox = container.querySelector(boxSelector);
    if (!leftArrow || !rightArrow || !sliderBox) return;
    leftArrow.addEventListener('click', function() {
      sliderBox.scrollBy({ left: -250, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', function() {
      sliderBox.scrollBy({ left: 250, behavior: 'smooth' });
    });
  }

  // Slider arrows para todas as sections
  setupSliderArrows('.section-destaques .destaques-slider-container', '.destaques-box', '.destaques-slider-arrow.left', '.destaques-slider-arrow.right');
  setupSliderArrows('.section-mais-vendidos .destaques-slider-container', '.mais-vendidos-box', '.destaques-slider-arrow.left', '.destaques-slider-arrow.right');
  setupSliderArrows('.promocoes-slider-container', '.produtos-destaque', '.promocoes-arrow.left', '.promocoes-arrow.right');

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
