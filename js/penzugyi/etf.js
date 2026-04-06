(function () {
  // =========================
  // ELEMEK
  // =========================
  const initialInput = document.getElementById("initial");
  const monthlyInput = document.getElementById("monthly");
  const rateInput = document.getElementById("rate");
  const yearsInput = document.getElementById("years");
  const resultEl = document.getElementById("result");

  if (!initialInput || !monthlyInput || !rateInput || !yearsInput || !resultEl)
    return;

  // =========================
  // INPUT FORMÁZÁS (EZRES TAGOLÁS 🔥)
  // =========================
  if (typeof formatInputNumber === "function") {
    formatInputNumber(initialInput);
    formatInputNumber(monthlyInput);
  }

  // =========================
  // FŐ SZÁMOLÁS
  // =========================
  function calculateETF() {
    const initial =
      typeof parseNumber === "function"
        ? parseNumber(initialInput.value)
        : parseFloat(initialInput.value) || 0;

    const monthly =
      typeof parseNumber === "function"
        ? parseNumber(monthlyInput.value)
        : parseFloat(monthlyInput.value) || 0;

    const rate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);

    // ===== VALIDÁCIÓ =====
    if (!years || years <= 0) {
      resultEl.innerHTML = `
        <div class="result-box">
          <p class="result-sub">👉 Kérjük, adjon meg egy érvényes időtávot.</p>
        </div>
      `;
      return;
    }

    if (!rate || rate <= 0) {
      resultEl.innerHTML = `
        <div class="result-box">
          <p class="result-sub">👉 Kérjük, adjon meg egy érvényes hozamot.</p>
        </div>
      `;
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    let total = initial;
    let invested = initial;
    let yearlyBreakdown = [];

    // ===== KAMATOS KAMAT =====
    for (let i = 1; i <= months; i++) {
      total = total * (1 + monthlyRate) + monthly;
      invested += monthly;

      if (i % 12 === 0) {
        yearlyBreakdown.push({
          year: i / 12,
          value: total,
        });
      }
    }

    const profit = total - invested;
    const monthlyPassive = (total * (rate / 100)) / 12;

    // ===== EREDMÉNY =====
    let html = `
      <div class="result-box">
        <p class="result-sub">Eredmény:</p>

        <p class="result-main">
          ${format(total)} Ft
        </p>

        <p class="result-sub">
          teljes vagyon
        </p>

        <hr style="margin:10px 0; border:none; border-top:1px solid #e2e8f0;" />

        <p>Összes befizetés: ${format(invested)} Ft</p>
        <p>Nyereség: ${format(profit)} Ft</p>
        <p>Havi passzív jövedelem: ${format(monthlyPassive)} Ft</p>
      </div>
    `;

    // ===== ÉVES BONTÁS 🔥
    html += `<div class="result-box">`;
    html += `<p class="result-sub"><strong>Éves növekedés:</strong></p>`;

    yearlyBreakdown.forEach((y) => {
      html += `<p>${y.year}. év: ${format(y.value)} Ft</p>`;
    });

    html += `</div>`;

    resultEl.innerHTML = html;

    // ===== CTA (ha van) =====
    if (typeof showLinks === "function") {
      showLinks();
    }
  }

  // =========================
  // GOMBHOZ (HTML onclick miatt)
  // =========================
  window.calculateETF = calculateETF;

  // =========================
  // AUTO SZÁMOLÁS 🔥
  // =========================
  initialInput.addEventListener("input", calculateETF);
  monthlyInput.addEventListener("input", calculateETF);
  rateInput.addEventListener("input", calculateETF);
  yearsInput.addEventListener("input", calculateETF);

  // =========================
  // BETÖLTÉSKOR
  // =========================
  document.addEventListener("DOMContentLoaded", calculateETF);
})();
