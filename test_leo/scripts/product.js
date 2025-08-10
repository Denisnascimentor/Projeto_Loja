document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const nomeProduto = params.get("nome");
  if (!nomeProduto) return;

  async function buscarProduto(nome) {
    const arquivos = [
      "/components/produtos_destaque.json",
      "/components/produtos_mais_vendidos.json",
      "/components/produtos_promocoes.json",
    ];
    for (const arquivo of arquivos) {
      try {
        const res = await fetch(arquivo);
        if (!res.ok) continue;
        const produtos = await res.json();
        for (const prod of produtos) {
          if ((prod.nome || "").toLowerCase() === nome.toLowerCase()) {
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
    const img = document.getElementById("product-image");
    if (img) {
      img.src = produto.imagem;
      img.alt = produto.nome;
    }
    const nomeEl = document.getElementById("product-name");
    if (nomeEl) nomeEl.textContent = produto.nome;
    const descEl = document.getElementById("product-description");
    if (descEl)
      descEl.textContent = produto.descricao || "Descrição não disponível.";
    const precoEl = document.getElementById("product-price");

    const buyNowBtn = document.querySelector(".buy-now");

    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", function () {
        window.location.href = "buy.html";
      });
    }
    if (precoEl)
      precoEl.textContent =
        produto.preco_novo || produto.preco || "Preço não disponível";
  }
});

// Checkout (buy.html) behavior
(function () {
  if (!/\/pages\/buy\.html$/.test(window.location.pathname)) return;
  const steps = document.querySelectorAll(".checkout-steps-simple .step");
  const content = document.querySelector(".checkout-content");
  const btn = document.getElementById("btn-continuar");
  const form = document.getElementById("address-form");

  function renderPagamento() {
    if (form && !form.reportValidity()) return;
    steps.forEach((s) => s.classList.remove("active"));
    if (steps[1]) steps[1].classList.add("active");
    content.innerHTML = `
      <section id="step-pagamento">
        <h2>Método de pagamento</h2>
        <form id="payment-form">
          <fieldset class="form-row payment-methods">
            <label><input type="radio" name="payment" value="pix" checked /> Pix</label>
            <label><input type="radio" name="payment" value="card" /> Cartão de crédito</label>
            <label><input type="radio" name="payment" value="boleto" /> Boleto</label>
          </fieldset>

          <div id="pay-pix" class="pay-section">
            <p class="hint"><i class="ri-flashlight-line"></i> Pague com Pix e receba 5% de desconto.</p>
            <div class="form-actions">
              <button type="button" class="btn-ir-confirmacao">Continuar</button>
            </div>
          </div>

          <div id="pay-card" class="pay-section" hidden>
            <div class="form-row">
              <label for="card-name">Nome no cartão</label>
              <input type="text" id="card-name" required />
            </div>
            <div class="form-row">
              <label for="card-number">Número do cartão</label>
              <input type="text" id="card-number" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" required />
            </div>
            <div class="form-row">
              <label for="card-exp">Validade (MM/AA)</label>
              <input type="text" id="card-exp" inputmode="numeric" maxlength="5" placeholder="MM/AA" required />
            </div>
            <div class="form-row">
              <label for="card-cvv">CVV</label>
              <input type="password" id="card-cvv" inputmode="numeric" maxlength="4" placeholder="***" required />
            </div>
            <div class="form-row">
              <label for="installments">Parcelamento</label>
              <select id="installments">
                <option value="1">1x c/ juros</option>
                <option value="2">2x c/ juros</option>
                <option value="3">3x c/ juros</option>
                <option value="4">4x c/ juros</option>
                <option value="5">5x c/ juros</option>
                <option value="6">6x c/ juros</option>
                <option value="7">7x c/ juros</option>
                <option value="8">8x c/ juros</option>
                <option value="9">9x c/ juros</option>
                <option value="10">10x c/ juros</option>
                <option value="11">11x c/ juros</option>
                <option value="12">12x c/ juros</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-ir-confirmacao">Continuar</button>
            </div>
          </div>

          <div id="pay-boleto" class="pay-section" hidden>
            <p class="hint"><i class="ri-file-list-3-line"></i> Geraremos o boleto na próxima etapa.</p>
            <div class="form-actions">
              <button type="button" class="btn-ir-confirmacao">Continuar</button>
            </div>
          </div>
        </form>
      </section>
    `;

    // Toggle entre métodos
    const radios = document.querySelectorAll('input[name="payment"]');
    const sections = {
      pix: document.getElementById("pay-pix"),
      card: document.getElementById("pay-card"),
      boleto: document.getElementById("pay-boleto"),
    };
    function updatePaySection(value) {
      Object.values(sections).forEach((el) => el && (el.hidden = true));
      if (sections[value]) sections[value].hidden = false;
    }
    radios.forEach((r) =>
      r.addEventListener("change", (e) => updatePaySection(e.target.value))
    );
    updatePaySection("pix");

    // Ir para confirmação
    function goToConfirmacao() {
      // Se cartão, valida rapidamente campos principais
      const selected = [...radios].find((r) => r.checked)?.value;
      if (selected === "card") {
        const requiredIds = [
          "card-name",
          "card-number",
          "card-exp",
          "card-cvv",
        ];
        for (const id of requiredIds) {
          const el = document.getElementById(id);
          if (!el || !el.value) {
            el?.focus();
            return;
          }
        }
      }
      steps.forEach((s) => s.classList.remove("active"));
      if (steps[2]) steps[2].classList.add("active");
      content.innerHTML = `
        <section id="step-confirmacao">
          <h2>Confirmação</h2>
          <p>Revise seus dados e finalize a compra.</p>
        </section>
      `;
    }
    document
      .querySelectorAll(".btn-ir-confirmacao")
      .forEach((b) => b.addEventListener("click", goToConfirmacao));
  }

  if (btn) btn.addEventListener("click", renderPagamento);
})();
