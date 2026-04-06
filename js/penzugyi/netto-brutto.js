(function () {
  // =========================
  // ELEMEK
  // =========================
  const amountInput = document.getElementById("amount");
  const modeInput = document.getElementById("mode");
  const under25Input = document.getElementById("under25");
  const childrenInput = document.getElementById("children");

  formatInputNumber(amountInput);

  const resultBox = document.getElementById("result-value");
  const breakdownBox = document.getElementById("breakdown");

  // Ha nem ezen az oldalon vagyunk → kilép
  if (!amountInput || !modeInput || !resultBox || !breakdownBox) return;

  // =========================
  // Családi kedvezmény
  // =========================
  function getFamilyBenefit(children) {
    if (children === 1) return 20000;
    if (children === 2) return 80000;
    if (children >= 3) return children * 66000;
    return 0;
  }

  // =========================
  // Bruttóból nettó
  // =========================
  function calculateFromGross(gross, under25, children) {
    const tb = gross * 0.185;
    const szja = under25 ? 0 : gross * 0.15;

    const baseNet = gross - tb - szja;
    const family = getFamilyBenefit(children);

    const finalNet = baseNet + family;

    return {
      net: finalNet,
      baseNet,
      tb,
      szja,
      family,
    };
  }

  // =========================
  // Nettóból bruttó (iteráció)
  // =========================
  function calculateFromNet(targetNet, under25, children) {
    let guess = targetNet * 1.5;

    for (let i = 0; i < 60; i++) {
      const calc = calculateFromGross(guess, under25, children);
      const diff = calc.net - targetNet;

      guess -= diff * 0.5;
    }

    return {
      gross: guess,
      ...calculateFromGross(guess, under25, children),
    };
  }

  // =========================
  // FŐ FÜGGVÉNY
  // =========================
  function calculate() {
    const amount = parseNumber(amountInput.value);
    const mode = modeInput.value;
    const under25 = under25Input?.value === "yes";
    const children = parseInt(childrenInput?.value) || 0;

    if (!amount || amount <= 0) {
      resultBox.innerHTML = "👉 Kérjük, adjon meg egy érvényes összeget.";
      breakdownBox.innerHTML = "";
      return;
    }

    if (mode === "gross") {
      const result = calculateFromGross(amount, under25, children);

      resultBox.innerHTML = `
        Nettó: <strong>${format(result.net)} Ft</strong>
      `;

      breakdownBox.innerHTML = `
        Bruttó: ${format(amount)} Ft<br>
        TB (18.5%): ${format(result.tb)} Ft<br>
        SZJA (15%): ${format(result.szja)} Ft<br>
        Alap nettó: ${format(result.baseNet)} Ft<br>
        Családi kedvezmény: +${format(result.family)} Ft<br>
        <strong>Összesen: ${format(result.net)} Ft</strong>
      `;
    } else {
      const result = calculateFromNet(amount, under25, children);

      resultBox.innerHTML = `
        Bruttó: <strong>${format(result.gross)} Ft</strong>
      `;

      breakdownBox.innerHTML = `
        Nettó: ${format(amount)} Ft<br>
        TB (18.5%): ${format(result.tb)} Ft<br>
        SZJA (15%): ${format(result.szja)} Ft<br>
        Alap nettó: ${format(result.baseNet)} Ft<br>
        Családi kedvezmény: +${format(result.family)} Ft<br>
        <strong>Számolt bruttó: ${format(result.gross)} Ft</strong>
      `;
    }

    // CTA megjelenítés
    showLinks();
  }

  // =========================
  // EVENTEK
  // =========================
  amountInput.addEventListener("input", calculate);
  modeInput.addEventListener("change", calculate);
  under25Input?.addEventListener("change", calculate);
  childrenInput?.addEventListener("input", calculate);

  document.addEventListener("DOMContentLoaded", calculate);
})();
