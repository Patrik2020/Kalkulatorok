(function () {
  // =========================
  // ELEMEK
  // =========================
  const amountInput = document.getElementById("amount");
  const yieldInput = document.getElementById("yield");
  const yearsInput = document.getElementById("years");
  const resultContainer = document.querySelector(".result");

  formatInputNumber(amountInput);

  // Ha nem ezen az oldalon vagyunk → kilép
  if (!amountInput || !yieldInput || !yearsInput || !resultContainer) return;

  // =========================
  // FŐ SZÁMOLÁS
  // =========================
  function calculate() {
    const amount = parseNumber(amountInput.value);
    const yieldRate = parseFloat(yieldInput.value);
    const years = parseFloat(yearsInput.value);

    // ===== VALIDÁCIÓ =====
    if (!amount || amount <= 0) {
      resultContainer.innerHTML = `
        <div class="result-box">
          <p class="result-sub">👉 Adj meg egy befektetési összeget</p>
        </div>
      `;
      return;
    }

    if (!yieldRate || yieldRate <= 0) {
      resultContainer.innerHTML = `
        <div class="result-box">
          <p class="result-sub">👉 Adj meg osztalék hozamot (%)</p>
        </div>
      `;
      return;
    }

    if (!years || years <= 0) {
      resultContainer.innerHTML = `
        <div class="result-box">
          <p class="result-sub">👉 Adj meg időtávot (év)</p>
        </div>
      `;
      return;
    }

    // =========================
    // SZÁMÍTÁS
    // =========================
    const yearlyDividend = amount * (yieldRate / 100);
    const totalDividend = yearlyDividend * years;
    const monthlyDividend = yearlyDividend / 12;

    // =========================
    // EREDMÉNY (EGYSÉGES DESIGN)
    // =========================
    const resultHTML = `
      <div class="result-box">
        <p class="result-main">
          ${format(yearlyDividend)} Ft / év
        </p>

        <p class="result-main">
          ${format(totalDividend)} Ft összesen
        </p>

        <hr style="margin:10px 0; border:none; border-top:1px solid #e2e8f0;" />

        <p class="result-sub">
          ${format(monthlyDividend)} Ft / hó
        </p>
      </div>
    `;

    resultContainer.innerHTML = resultHTML;

    // CTA (ha van)
    if (typeof showLinks === "function") {
      showLinks();
    }
  }

  // =========================
  // GOMB (onclick miatt)
  // =========================
  window.calculateDividend = calculate;

  // =========================
  // AUTO SZÁMOLÁS 🔥
  // =========================
  amountInput.addEventListener("input", calculate);
  yieldInput.addEventListener("input", calculate);
  yearsInput.addEventListener("input", calculate);

  document.addEventListener("DOMContentLoaded", calculate);
})();
