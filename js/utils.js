// ===== SEGÉD FÜGGVÉNYEK =====

// Szám formázás
function format(num) {
  return new Intl.NumberFormat("hu-HU").format(Math.round(num));
}

// Vissza gomb
function goBack() {
  window.history.back();
}

// CTA megjelenítés
function showLinks() {
  const calcLinks = document.querySelector(".calc-links");
  if (calcLinks) {
    calcLinks.style.display = "flex";
  }
}
// =========================
// SZÁM INPUT FORMÁZÁS
// =========================
function formatInputNumber(input) {
  let isFormatting = false;

  input.addEventListener("input", (e) => {
    if (isFormatting) return;

    isFormatting = true;

    let value = input.value.replace(/\s/g, "");

    // csak számok
    value = value.replace(/\D/g, "");

    if (value === "") {
      input.value = "";
      isFormatting = false;
      return;
    }

    input.value = new Intl.NumberFormat("hu-HU").format(Number(value));

    isFormatting = false;
  });
}

// =========================
// PARSE SZÁM (szóköz eltávolítás)
// =========================
function parseNumber(value) {
  return parseFloat(value.replace(/\s/g, ""));
}
