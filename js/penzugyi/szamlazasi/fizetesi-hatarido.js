// ===== DÁTUM FORMÁZÁS =====
function formatDate(date) {
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ===== SZÁMOLÁS =====
function calculateDeadline() {
  const invoiceDateValue = document.getElementById("invoiceDate").value;
  const days = Number(document.getElementById("days").value);

  const resultEl = document.getElementById("result-value");

  // validáció
  if (!invoiceDateValue || !days) {
    resultEl.innerText = "–";
    return;
  }

  const invoiceDate = new Date(invoiceDateValue);

  // új dátum számítása
  const deadline = new Date(invoiceDate);
  deadline.setDate(deadline.getDate() + days);

  // megjelenítés
  resultEl.innerHTML = `
    ${formatDate(deadline)}
    <br>
    <span style="font-size:14px; color:#666;">
      (${days} napos határidő)
    </span>
  `;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const invoiceDate = document.getElementById("invoiceDate");
  const days = document.getElementById("days");

  // automatikus számolás
  invoiceDate.addEventListener("input", calculateDeadline);
  days.addEventListener("input", calculateDeadline);

  // első betöltés
  calculateDeadline();
});
