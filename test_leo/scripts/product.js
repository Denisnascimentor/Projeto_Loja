document.addEventListener('DOMContentLoaded', function() {
  // Pega o nome do produto da URL
  const params = new URLSearchParams(window.location.search);
  let nome = params.get('nome');
  if (!nome) {
    // Se não tiver nome, tenta pegar o nome da imagem
    const url = window.location.search;
    const match = url.match(/([\w-]+)\.jpg/);
    if (match && match[1]) {
      nome = match[1].replace(/-/g, ' ').toUpperCase();
    }
  }
  if (nome) {
    document.title = nome;
  }
});
