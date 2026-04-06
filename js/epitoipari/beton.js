// ===== SEGÉD: SZÁM FORMÁZÁS =====
function formatNumber(num) {
  return num.toLocaleString("hu-HU", {
    maximumFractionDigits: 2,
  });
}

// ===== FŐ SZÁMOLÁS =====
function calculateConcrete() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  const resultEl = document.getElementById("result-value");

  // ===== VALIDÁCIÓ =====
  if (!length || !width || !heightCm) {
    resultEl.innerText = "–";
    return;
  }

  if (length <= 0 || width <= 0 || heightCm <= 0) {
    resultEl.innerText = "Hibás adat";
    return;
  }

  // ===== SZÁMOLÁS =====
  const heightM = heightCm / 100;

  const volume = length * width * heightM;

  // +10% tartalék
  const volumeWithExtra = volume * 1.1;

  // ===== MEGJELENÍTÉS =====
  resultEl.innerHTML = `
    ${formatNumber(volume)} m³
    <br>
    <span style="font-size:14px; color:#666;">
      +10% tartalékkal: ${formatNumber(volumeWithExtra)} m³
    </span>
  `;
}

// ===== AUTO SZÁMOLÁS =====
document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["length", "width", "height"];

  inputs.forEach((id) => {
    const el = document.getElementById(id);

    el.addEventListener("input", calculateConcrete);
  });

  calculateConcrete();
});
