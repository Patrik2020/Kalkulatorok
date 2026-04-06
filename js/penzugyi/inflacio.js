// ===== SEGÉD: SZÁM FORMÁZÁS =====
function formatNumber(num) {
  return num.toLocaleString("hu-HU");
}

// ===== SEGÉD: INPUT TISZTÍTÁS =====
function parseNumber(value) {
  return Number(value.replace(/\s/g, "")) || 0;
}

// ===== FŐ SZÁMOLÁS =====
function calculateInflation() {
  const amount = parseNumber(document.getElementById("money").value);
  const rate = Number(document.getElementById("inflation").value) / 100;
  const years = Number(document.getElementById("years").value);

  const resultEl = document.getElementById("result-value");

  // validáció
  if (!amount || !rate || !years) {
    resultEl.innerText = "–";
    return;
  }

  // számítás
  const futureValue = amount / Math.pow(1 + rate, years);
  const loss = amount - futureValue;

  // megjelenítés
  resultEl.innerHTML = `
    ${formatNumber(Math.round(futureValue))} Ft
    <br>
    <small style="color:#666;">
      Értékvesztés: ${formatNumber(Math.round(loss))} Ft
    </small>
  `;
}

// ===== INPUT FORMÁZÁS (pl: 1 000 000) =====
function formatInput(input) {
  input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    input.value = formatNumber(Number(value || 0));
  });
}

// ===== AUTOMATIKUS MŰKÖDÉS =====
document.addEventListener("DOMContentLoaded", () => {
  const moneyInput = document.getElementById("money");
  const inflationInput = document.getElementById("inflation");
  const yearsInput = document.getElementById("years");

  // pénz mező formázása
  formatInput(moneyInput);

  // automatikus számolás
  moneyInput.addEventListener("input", calculateInflation);
  inflationInput.addEventListener("input", calculateInflation);
  yearsInput.addEventListener("input", calculateInflation);

  // első betöltés
  calculateInflation();
});
