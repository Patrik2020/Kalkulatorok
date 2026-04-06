function calculateCalories() {
  const weight = parseFloat(document.getElementById("weightCal").value);
  const height = parseFloat(document.getElementById("heightCal").value);
  const age = parseFloat(document.getElementById("age").value);

  const resultEl = document.getElementById("result-value");

  if (!weight || !height || !age) {
    resultEl.innerText = "–";
    return;
  }

  if (weight <= 0 || height <= 0 || age <= 0) {
    resultEl.innerText = "Hibás adat";
    return;
  }

  // Mifflin-St Jeor (férfi alap)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

  // napi kalória (közepes aktivitás)
  const maintenance = bmr * 1.55;

  const deficit = maintenance - 500;
  const surplus = maintenance + 500;

  resultEl.innerHTML = `
    ${Math.round(maintenance)} kcal / nap
    <div class="calorie-info">
      Fogyáshoz: ${Math.round(deficit)} kcal<br>
      Tömegnöveléshez: ${Math.round(surplus)} kcal
    </div>
  `;
}

// ===== AUTO =====
document.addEventListener("DOMContentLoaded", () => {
  ["weightCal", "heightCal", "age"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calculateCalories);
  });

  calculateCalories();
});
