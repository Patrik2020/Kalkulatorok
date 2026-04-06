// ===== FORMAT =====
function formatNumber(num) {
  return num.toLocaleString("hu-HU");
}

// ===== PARSE =====
function parseNumber(value) {
  return Number(value.replace(/\s/g, "")) || 0;
}

// ===== SZÁMOLÁS =====
function calculateCompoundInterest() {
  const principal = parseNumber(document.getElementById("principal").value);
  const rate = Number(document.getElementById("rate").value) / 100;
  const years = Number(document.getElementById("years").value);

  const resultEl = document.getElementById("result-value");

  if (!principal || !rate || !years) {
    resultEl.innerText = "–";
    return;
  }

  // képlet: P * (1 + r)^t
  const finalAmount = principal * Math.pow(1 + rate, years);
  const profit = finalAmount - principal;

  resultEl.innerHTML = `
    ${formatNumber(Math.round(finalAmount))} Ft
    <br>
    <span style="font-size:14px; color:#666;">
      Nyereség: ${formatNumber(Math.round(profit))} Ft
    </span>
  `;
}

// ===== INPUT FORMÁZÁS =====
function formatInput(input) {
  input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    input.value = formatNumber(Number(value || 0));
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const principal = document.getElementById("principal");
  const rate = document.getElementById("rate");
  const years = document.getElementById("years");

  // pénz input formázás
  formatInput(principal);

  // automatikus számolás
  principal.addEventListener("input", calculateCompoundInterest);
  rate.addEventListener("input", calculateCompoundInterest);
  years.addEventListener("input", calculateCompoundInterest);

  // első betöltés
  calculateCompoundInterest();
});
