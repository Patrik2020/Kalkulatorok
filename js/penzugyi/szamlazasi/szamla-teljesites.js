// ===== DÁTUM FORMÁZÁS =====
function formatDate(date) {
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ===== NAPOK HOZZÁADÁSA =====
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ===== SZÁMOLÁS =====
function calculateContinuous() {
  const periodEndValue = document.getElementById("periodEnd").value;
  const invoiceDateValue = document.getElementById("invoiceDate").value;
  const paymentDateValue = document.getElementById("paymentDate").value;

  const resultEl = document.getElementById("result-value");

  // validáció
  if (!periodEndValue || !invoiceDateValue || !paymentDateValue) {
    resultEl.innerText = "–";
    return;
  }

  const periodEnd = new Date(periodEndValue);
  const invoiceDate = new Date(invoiceDateValue);
  const paymentDate = new Date(paymentDateValue);

  let resultDate;
  let note = "";

  // ===== FŐ LOGIKA =====

  // alapeset: fizetési határidő
  resultDate = new Date(paymentDate);

  // max +60 nap szabály
  const maxDate = addDays(periodEnd, 60);

  if (paymentDate > maxDate) {
    resultDate = maxDate;
    note = " (max. 60 nap szabály miatt)";
  }

  // ===== MEGJELENÍTÉS =====
  resultEl.innerHTML = `
    ${formatDate(resultDate)}
    <br>
    <span style="font-size:14px; color:#666;">
      ${note}
    </span>
  `;
}

// ===== AUTO INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["periodEnd", "invoiceDate", "paymentDate"];

  inputs.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("input", calculateContinuous);
  });

  calculateContinuous();
});
