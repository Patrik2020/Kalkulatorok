// ===== FORMÁZÁS =====
function formatNumber(num) {
  return num.toLocaleString("hu-HU", {
    maximumFractionDigits: 2,
  });
}

// ===== SZÁMOLÁS =====
function calculateTiles() {
  const roomLength = parseFloat(document.getElementById("roomLength").value);
  const roomWidth = parseFloat(document.getElementById("roomWidth").value);

  const tileLength = parseFloat(document.getElementById("tileLength").value);
  const tileWidth = parseFloat(document.getElementById("tileWidth").value);

  const waste = parseFloat(document.getElementById("waste").value) || 0;

  const resultEl = document.getElementById("result-value");

  // ===== VALIDÁCIÓ =====
  if (!roomLength || !roomWidth || !tileLength || !tileWidth) {
    resultEl.innerText = "–";
    return;
  }

  if (roomLength <= 0 || roomWidth <= 0 || tileLength <= 0 || tileWidth <= 0) {
    resultEl.innerText = "Hibás adat";
    return;
  }

  // ===== TERÜLET =====
  const area = roomLength * roomWidth;

  // csempe cm → m
  const tileArea = (tileLength / 100) * (tileWidth / 100);

  // darabszám
  const tiles = area / tileArea;

  // ráhagyás
  const tilesWithWaste = tiles * (1 + waste / 100);

  // ===== MEGJELENÍTÉS =====
  resultEl.innerHTML = `
    ${formatNumber(Math.ceil(tiles))} db
    <br>
    <span style="font-size:14px; color:#666;">
      +${waste}% ráhagyással: ${formatNumber(Math.ceil(tilesWithWaste))} db
    </span>
  `;
}

// ===== AUTO SZÁMOLÁS =====
document.addEventListener("DOMContentLoaded", () => {
  const inputs = [
    "roomLength",
    "roomWidth",
    "tileLength",
    "tileWidth",
    "waste",
  ];

  inputs.forEach((id) => {
    const el = document.getElementById(id);

    if (el) {
      el.addEventListener("input", calculateTiles);
    }
  });

  calculateTiles();
});
