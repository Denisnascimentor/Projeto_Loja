document.addEventListener('DOMContentLoaded', async function() {
  const params = new URLSearchParams(window.location.search);
  const nomeProduto = params.get('nome');
  if (!nomeProduto) return;

  async function buscarProduto(nome) {
    const arquivos = [
      '/components/produtos_destaque.json',
      '/components/produtos_mais_vendidos.json',
      '/components/produtos_promocoes.json'
    ];
    for (const arquivo of arquivos) {
      try {
        const res = await fetch(arquivo);
        if (!res.ok) continue;
        const produtos = await res.json();
        for (const prod of produtos) {
          if ((prod.nome || '').toLowerCase() === nome.toLowerCase()) {
            return prod;
          }
        }
      } catch (e) {}
    }
    return null;
  }

  const produto = await buscarProduto(nomeProduto);
  if (produto) {
    document.title = produto.nome;
    const img = document.getElementById('product-image');
    if (img) {
      img.src = produto.imagem;
      img.alt = produto.nome;
    }
    const nomeEl = document.getElementById('product-name');
    if (nomeEl) nomeEl.textContent = produto.nome;
    const descEl = document.getElementById('product-description');
    if (descEl) descEl.textContent = produto.descricao || 'Descrição não disponível.';
    const precoEl = document.getElementById('product-price');
    if (precoEl) precoEl.textContent = produto.preco_novo || produto.preco || 'Preço não disponível';
  }
});