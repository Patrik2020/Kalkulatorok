function format(num) {
  return num.toFixed(1);
}

function getCategory(bmi) {
  if (bmi < 18.5) return { text: "Soványság", class: "bmi-under" };
  if (bmi < 25) return { text: "Normál", class: "bmi-normal" };
  if (bmi < 30) return { text: "Túlsúly", class: "bmi-over" };
  return { text: "Elhízás", class: "bmi-obese" };
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  const resultEl = document.getElementById("result-value");

  if (!weight || !heightCm) {
    resultEl.innerText = "–";
    return;
  }

  if (weight <= 0 || heightCm <= 0) {
    resultEl.innerText = "Hibás adat";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  const category = getCategory(bmi);

  resultEl.className = category.class;

  resultEl.innerHTML = `
    ${format(bmi)}
    <br>
    <span style="font-size:14px; color:#666;">
      ${category.text}
    </span>
  `;
}

// ===== AUTO =====
document.addEventListener("DOMContentLoaded", () => {
  ["weight", "height"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calculateBMI);
  });

  calculateBMI();
});
