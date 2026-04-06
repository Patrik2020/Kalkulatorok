(function () {
  // =========================
  // ELEMEK
  // =========================
  const loanAmountInput = document.getElementById("loanAmount");
  const interestInput = document.getElementById("interestRate");
  const yearsInput = document.getElementById("years");
  const resultDiv = document.getElementById("result");

  formatInputNumber(loanAmountInput);

  // Ha nem ezen az oldalon vagyunk → kilép
  if (!loanAmountInput || !interestInput || !yearsInput || !resultDiv) return;

  // =========================
  // FŐ SZÁMOLÁS
  // =========================
  function calculate() {
    const P = parseNumber(loanAmountInput.value);
    const annualRate = parseFloat(interestInput.value);
    const years = parseFloat(yearsInput.value);

    // ===== VALIDÁCIÓ =====
    if (!P || P <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes hitelösszeget.";
      return;
    }

    if (!annualRate || annualRate <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes kamatot.";
      return;
    }

    if (!years || years <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes futamidőt.";
      return;
    }

    const r = annualRate / 100 / 12; // havi kamat
    const n = years * 12; // hónapok

    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const total = monthly * n;
    const interestTotal = total - P;

    // ===== EREDMÉNY =====
    let html = `
      <p><strong>Havi törlesztő:</strong> ${format(monthly)} Ft</p>
      <p>Teljes visszafizetés: ${format(total)} Ft</p>
      <p>Teljes kamat: ${format(interestTotal)} Ft</p>
    `;

    // ===== KAMAT SZIMULÁCIÓ 🔥 =====
    const scenarios = [annualRate, annualRate + 1, annualRate + 2];

    html += `<br><strong>Mi történik, ha nő a kamat?</strong><br>`;

    scenarios.forEach((rate) => {
      const rSim = rate / 100 / 12;

      const monthlySim =
        (P * rSim * Math.pow(1 + rSim, n)) / (Math.pow(1 + rSim, n) - 1);

      html += `${rate.toFixed(1)}% → ${format(monthlySim)} Ft / hó<br>`;
    });

    // ===== FIGYELMEZTETÉS =====
    html += `
      <p style="margin-top:10px; font-size:13px; color:#666;">
        ⚠️ A számítás fix kamatozású hitel feltételezésével történt.
      </p>
    `;

    resultDiv.innerHTML = html;

    // CTA megjelenítés
    if (typeof showLinks === "function") {
      showLinks();
    }
  }

  // =========================
  // EVENTEK
  // =========================
  loanAmountInput.addEventListener("input", calculate);
  interestInput.addEventListener("input", calculate);
  yearsInput.addEventListener("input", calculate);

  document.addEventListener("DOMContentLoaded", calculate);
})();
