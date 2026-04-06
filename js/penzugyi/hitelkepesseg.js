(function () {
  // =========================
  // ELEMEK
  // =========================
  const incomeInput = document.getElementById("income");
  const existingLoansInput = document.getElementById("existingLoans");
  const interestInput = document.getElementById("interestRate");
  const yearsInput = document.getElementById("years");
  const resultDiv = document.getElementById("result");

  formatInputNumber(incomeInput);

  // Ha nem ezen az oldalon vagyunk → kilép
  if (
    !incomeInput ||
    !existingLoansInput ||
    !interestInput ||
    !yearsInput ||
    !resultDiv
  )
    return;

  // =========================
  // JTM LOGIKA
  // =========================
  function getJTM(income) {
    if (income < 300000) return 0.3;
    if (income < 600000) return 0.4;
    return 0.5;
  }

  // =========================
  // HITEL VISSZASZÁMOLÁS
  // =========================
  function calculateLoanFromPayment(monthly, rate, months) {
    const r = rate / 100 / 12;

    return (
      monthly * ((Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months)))
    );
  }

  // =========================
  // FŐ FÜGGVÉNY
  // =========================
  function calculate() {
    const income = parseNumber(incomeInput.value);
    const existing = parseFloat(existingLoansInput.value) || 0;
    const rate = parseFloat(interestInput.value);
    const years = parseFloat(yearsInput.value);

    // ===== VALIDÁCIÓ =====
    if (!income || income <= 0) {
      resultDiv.innerHTML =
        "👉 Kérjük, adjon meg egy érvényes nettó jövedelmet.";
      return;
    }

    if (!rate || rate <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes kamatot.";
      return;
    }

    if (!years || years <= 0) {
      resultDiv.innerHTML = "👉 Kérjük, adjon meg egy érvényes futamidőt.";
      return;
    }

    const jtm = getJTM(income);

    const maxPayment = income * jtm;
    const availablePayment = maxPayment - existing;

    if (availablePayment <= 0) {
      resultDiv.innerHTML = `
        ⚠️ A jelenlegi jövedelem és meglévő hitelek mellett nem vehető fel új hitel.
      `;
      return;
    }

    const months = years * 12;

    const loanAmount = calculateLoanFromPayment(availablePayment, rate, months);

    const totalPayback = availablePayment * months;
    const totalInterest = totalPayback - loanAmount;

    // ===== EREDMÉNY =====
    let html = `
  <div class="result-box">
    <p class="result-main">Max havi törlesztő: ${format(availablePayment)} Ft</p>
    <p class="result-main">Felvehető hitel: ${format(loanAmount)} Ft</p>

    <hr style="margin:10px 0; border:none; border-top:1px solid #e2e8f0;" />

    <p class="result-sub">Teljes visszafizetés: ${format(totalPayback)} Ft</p>
    <p class="result-sub">Teljes kamat: ${format(totalInterest)} Ft</p>

    <p style="margin-top:10px; font-size:12px; color:#64748b;">
      JTM alapján (${jtm * 100}% terhelhetőség)
    </p>
  </div>
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
  incomeInput.addEventListener("input", calculate);
  existingLoansInput.addEventListener("input", calculate);
  interestInput.addEventListener("input", calculate);
  yearsInput.addEventListener("input", calculate);

  document.addEventListener("DOMContentLoaded", calculate);
})();
