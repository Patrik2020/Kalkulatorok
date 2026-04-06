// ===== HELPER: szám formázás =====
function formatNumber(num) {
  return num.toLocaleString("hu-HU");
}

// ===== HELPER: input tisztítás =====
function parseNumber(value) {
  return Number(value.replace(/\s/g, "")) || 0;
}

// ===== AUTOMATIKUS SZÁMOLÁS =====
function calculateMillionaire() {
  const current = parseNumber(document.getElementById("current").value);
  const monthly = parseNumber(document.getElementById("monthly").value);
  const rate = Number(document.getElementById("rate").value) / 100;
  const goal = parseNumber(document.getElementById("goal").value);

  let balance = current;
  let months = 0;

  // védelem végtelen loop ellen
  if (monthly <= 0 && rate <= 0) {
    document.getElementById("result").innerHTML =
      "<p>Add meg a havi befizetést vagy hozamot.</p>";
    return;
  }

  while (balance < goal && months < 1000 * 12) {
    balance += monthly;
    balance *= 1 + rate / 12;
    months++;
  }

  if (months >= 1000 * 12) {
    document.getElementById("result").innerHTML =
      "<p>Nem érhető el a cél a megadott adatokkal.</p>";
    return;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  document.getElementById("result").innerHTML = `
    <p>Ennyi idő alatt éred el:</p>
    <strong>${years} év ${remainingMonths} hónap</strong>
  `;
}

// ===== INPUT FORMATÁLÁS (pl: 1 000 000) =====
function formatInput(input) {
  input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    input.value = formatNumber(Number(value || 0));
  });
}

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["current", "monthly", "goal", "rate"];

  inputs.forEach((id) => {
    const el = document.getElementById(id);

    // automatikus számolás
    el.addEventListener("input", calculateMillionaire);

    // formázás csak pénzes mezőknél
    if (id !== "rate") {
      formatInput(el);
    }
  });

  // első betöltéskor is számol
  calculateMillionaire();
});
