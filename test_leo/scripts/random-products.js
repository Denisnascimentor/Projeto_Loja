const categorias = ["cpu", "fonte", "gabinete", "gpu", "motherboard", "ram", "ssd"];

function getRandomCategoria() {
    return categorias[Math.floor(Math.random() * categorias.length)];
}

async function fetchRandomProduct() {
    const categoria = getRandomCategoria();
    try {
        const response = await fetch(`../components/img/products/${categoria}/data.json`);
        if (!response.ok) throw new Error('Arquivo não encontrado: ' + response.url);
        const produtos = await response.json();
        const produto = produtos[Math.floor(Math.random() * produtos.length)];
        return { ...produto, categoria };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function montarListaProdutos(qtd = 10) {
    const lista = document.getElementById("random-product-list");
    lista.innerHTML = "<h2>Mais </h2><div class='lista-produtos'></div>";
    const container = lista.querySelector(".lista-produtos");

    const promises = [];
    for (let i = 0; i < qtd; i++) {
        promises.push(fetchRandomProduct());
    }
    const produtos = await Promise.all(promises);

    produtos.filter(Boolean).forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-item';
        card.innerHTML = `
            <img src="../components/img/products/${produto.categoria}/${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <span>${produto.preco}</span>
            <a href="${produto.link}"class="comprar-btn">Comprar</a>
        `;
        container.appendChild(card);
    });
}

window.onload = () => {
    montarListaProdutos(10);
};