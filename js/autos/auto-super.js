function calcAll() {
  const distance = parseFloat(document.getElementById("distance").value);
  const fuel = parseFloat(document.getElementById("fuel").value);

  const tripDistance = parseFloat(
    document.getElementById("tripDistance").value,
  );
  let consumption = parseFloat(document.getElementById("consumption").value);

  const price = parseFloat(document.getElementById("fuelPrice").value);

  // ===== FOGYASZTÁS =====
  if (distance && fuel) {
    consumption = (fuel / distance) * 100;
    document.getElementById("consumption-result").innerText =
      consumption.toFixed(2) + " l/100km";

    // átadjuk a másik kalkulátornak
    document.getElementById("consumption").value = consumption.toFixed(2);
  }

  // ===== ÜZEMANYAG =====
  if (tripDistance && consumption) {
    const neededFuel = (tripDistance * consumption) / 100;

    document.getElementById("fuel-result").innerText =
      neededFuel.toFixed(2) + " liter";

    // ===== KÖLTSÉG =====
    if (price) {
      const cost = neededFuel * price;

      document.getElementById("cost-result").innerText =
        Math.round(cost) + " Ft";
    }
  }
}

// ===== AUTO =====
document.addEventListener("input", calcAll);
