function formatNumber(num) {
  return num.toLocaleString("hu-HU", {
    maximumFractionDigits: 2,
  });
}

// ===== 1. ALAP SZÁZALÉK =====
function calculatePercentage() {
  const number = Number(document.getElementById("number").value);
  const percent = Number(document.getElementById("percent").value);

  if (!number || !percent) {
    document.getElementById("result1").innerText = "–";
    return;
  }

  const result = number * (percent / 100);

  document.getElementById("result1").innerText = formatNumber(result);
}

// ===== 2. NÖVEKEDÉS =====
function calculateIncrease() {
  const oldVal = Number(document.getElementById("oldValue").value);
  const newVal = Number(document.getElementById("newValue").value);

  if (!oldVal || !newVal) {
    document.getElementById("result2").innerText = "–";
    return;
  }

  const change = ((newVal - oldVal) / oldVal) * 100;

  document.getElementById("result2").innerText = formatNumber(change) + " %";
}

// ===== 3. CSÖKKENÉS =====
function calculateDecrease() {
  const oldVal = Number(document.getElementById("oldValue2").value);
  const newVal = Number(document.getElementById("newValue2").value);

  if (!oldVal || !newVal) {
    document.getElementById("result3").innerText = "–";
    return;
  }

  const change = ((oldVal - newVal) / oldVal) * 100;

  document.getElementById("result3").innerText = formatNumber(change) + " %";
}

// ===== AUTO =====
document.addEventListener("DOMContentLoaded", () => {
  const inputs = [
    "number",
    "percent",
    "oldValue",
    "newValue",
    "oldValue2",
    "newValue2",
  ];

  inputs.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
      calculatePercentage();
      calculateIncrease();
      calculateDecrease();
    });
  });
});
