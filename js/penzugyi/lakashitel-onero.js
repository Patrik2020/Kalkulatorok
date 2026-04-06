(function () {
  // =========================
  // ELEMEK
  // =========================
  const priceInput = document.getElementById("propertyPrice");
  const percentInput = document.getElementById("downPaymentPercent");
  const resultDiv = document.getElementById("result");

  // Ha nem ezen az oldalon vagyunk → kilép
  if (!priceInput || !percentInput || !resultDiv) return;

  // =========================
  // FŐ FÜGGVÉNY
  // =========================
  function calculate() {
    const price = parseFloat(priceInput.value);
    const percent = parseFloat(percentInput.value);

    // ===== VALIDÁCIÓ =====
    if (!price || price <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes ingatlan árat.";
      return;
    }

    if (isNaN(percent) || percent <= 0 || percent > 100) {
      resultDiv.innerHTML =
        "👉 Kérjük, adjon meg egy 0 és 100 közötti önerő százalékot.";
      return;
    }

    // =========================
    // SZÁMÍTÁS
    // =========================
    const downPayment = price * (percent / 100);
    const loanAmount = price - downPayment;

    // =========================
    // EREDMÉNY (PRO DESIGN)
    // =========================
    const html = `
  <div class="result-box">
    <p class="result-main">
      Szükséges önerő: ${format(downPayment)} Ft
    </p>

    <p class="result-main">
      Hitel összege: ${format(loanAmount)} Ft
    </p>

    <hr style="margin:10px 0; border:none; border-top:1px solid #e2e8f0;" />

    <p style="font-size:13px; color:#64748b;">
      Önerő arány: ${percent}%
    </p>
  </div>

  <div class="related-box">
    <p class="related-title">Kapcsolódó kalkulátorok 👇</p>

    <div class="related-links">
      <a href="hitel-torleszto-kalkulator.html">🏦 Hitel törlesztő kalkulátor</a>
      <a href="hitelkepesseg-kalkulator.html">📊 Hitelképesség kalkulátor</a>
      <a href="netto-brutto-kalkulator.html">💰 Nettó–bruttó kalkulátor</a>
    </div>
  </div>
`;

    resultDiv.innerHTML = html;

    // CTA megjelenítés (ha van)
    if (typeof showLinks === "function") {
      showLinks();
    }
  }

  // =========================
  // GLOBÁLIS (button miatt)
  // =========================
  window.calculateDownPayment = calculate;

  // =========================
  // AUTO SZÁMOLÁS (UX 🔥)
  // =========================
  priceInput.addEventListener("input", calculate);
  percentInput.addEventListener("input", calculate);

  document.addEventListener("DOMContentLoaded", calculate);
})();
