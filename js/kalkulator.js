function calculateInflation() {
  let money = Number(document.getElementById("money").value);
  let inflation = Number(document.getElementById("inflation").value) / 100;
  let years = Number(document.getElementById("years").value);
  let result = money / Math.pow(1 + inflation, years);

  document.getElementById("result-value").innerText =
    Math.round(result).toLocaleString("hu-HU") + " Ft";
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", calculateInflation);
});

function calculateCompoundInterest() {
  let principal = Number(document.getElementById("principal").value);
  let rate = Number(document.getElementById("rate").value) / 100;
  let years = Number(document.getElementById("years").value);
  let result = principal * Math.pow(1 + rate, years);

  document.getElementById("result-value").innerText =
    Math.round(result).toLocaleString("hu-HU") + " Ft";
}
function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  document.getElementById("cookie-banner").style.display = "none";
}

window.onload = function () {
  if (localStorage.getItem("cookiesAccepted") === "true") {
    document.getElementById("cookie-banner").style.display = "none";
  }
};

function goBack() {
  if (document.referrer && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = "../index.html";
  }
}
function calculateConcrete() {
  let length = Number(document.getElementById("length").value);
  let width = Number(document.getElementById("width").value);
  let height = Number(document.getElementById("height").value) / 100;

  let volume = length * width * height;

  document.getElementById("result-value").innerText = volume.toFixed(2) + " m³";
}

function calculateTiles() {
  let roomLength = Number(document.getElementById("roomLength").value);
  let roomWidth = Number(document.getElementById("roomWidth").value);

  let tileLength = Number(document.getElementById("tileLength").value) / 100;
  let tileWidth = Number(document.getElementById("tileWidth").value) / 100;

  let waste = Number(document.getElementById("waste").value) / 100;

  let roomArea = roomLength * roomWidth;
  let tileArea = tileLength * tileWidth;

  let tiles = roomArea / tileArea;

  let total = tiles * (1 + waste);

  document.getElementById("result-value").innerText = Math.ceil(total) + " db";
}
// BMI
function calculateBMI() {
  let weight = Number(document.getElementById("weight").value);
  let height = Number(document.getElementById("height").value) / 100;

  let bmi = weight / (height * height);

  document.getElementById("result-value").innerText = bmi.toFixed(1);
}

// Kalória
function calculateCalories() {
  let weight = Number(document.getElementById("weightCal").value);
  let height = Number(document.getElementById("heightCal").value);
  let age = Number(document.getElementById("age").value);

  let bmr = 10 * weight + 6.25 * height - 5 * age + 5;

  document.getElementById("result-value").innerText = Math.round(bmr) + " kcal";
}

// Százalék
function calculatePercentage() {
  let number = Number(document.getElementById("number").value);
  let percent = Number(document.getElementById("percent").value);

  let result = number * (percent / 100);

  document.getElementById("result-value").innerText = result;
}

// ÁFA
function calculateVAT() {
  let amount = Number(document.getElementById("amount").value);
  let vat = Number(document.getElementById("vat").value);

  let result = amount * (1 + vat / 100);

  document.getElementById("result-value").innerText =
    Math.round(result) + " Ft";
}

// Üzemanyag
function calculateFuel() {
  let distance = Number(document.getElementById("distance").value);
  let consumption = Number(document.getElementById("consumption").value);

  let fuel = distance * (consumption / 100);

  document.getElementById("result-value").innerText =
    fuel.toFixed(2) + " liter";
}

// Utazás
function calculateTrip() {
  let distance = Number(document.getElementById("tripDistance").value);
  let consumption = Number(document.getElementById("tripConsumption").value);
  let price = Number(document.getElementById("fuelPrice").value);

  let fuel = distance * (consumption / 100);
  let cost = fuel * price;

  document.getElementById("result-value").innerText = Math.round(cost) + " Ft";
}
// alap százalék
function calculatePercentage() {
  let number = Number(document.getElementById("number").value);
  let percent = Number(document.getElementById("percent").value);

  let result = number * (percent / 100);

  document.getElementById("result1").innerText = result;
}

// növekedés
function calculateIncrease() {
  let oldVal = Number(document.getElementById("oldValue").value);
  let newVal = Number(document.getElementById("newValue").value);

  if (oldVal === 0) {
    document.getElementById("result2").innerText = "Hiba";
    return;
  }

  let result = ((newVal - oldVal) / oldVal) * 100;

  document.getElementById("result2").innerText = result.toFixed(2) + " %";
}

// csökkenés
function calculateDecrease() {
  let oldVal = Number(document.getElementById("oldValue2").value);
  let newVal = Number(document.getElementById("newValue2").value);

  if (oldVal === 0) {
    document.getElementById("result3").innerText = "Hiba";
    return;
  }

  let result = ((oldVal - newVal) / oldVal) * 100;

  document.getElementById("result3").innerText = result.toFixed(2) + " %";
}
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}
function calculateDeadline() {
  let date = document.getElementById("invoiceDate").value;
  let days = Number(document.getElementById("days").value);

  if (!date) {
    document.getElementById("result-value").innerText = "Adj meg dátumot";
    return;
  }

  let d = new Date(date);
  d.setDate(d.getDate() + days);

  document.getElementById("result-value").innerText =
    d.toLocaleDateString("hu-HU");
}
function calculatePerformance() {
  let invoiceDate = document.getElementById("invoiceDate").value;
  let deadline = Number(document.getElementById("deadline").value);
  let performanceDate = document.getElementById("performanceDate").value;

  // ha meg van adva a teljesítés → az a nyerő
  if (performanceDate) {
    document.getElementById("result-value").innerText = new Date(
      performanceDate,
    ).toLocaleDateString("hu-HU");
    return;
  }

  // ha nincs, számolunk
  if (!invoiceDate) {
    document.getElementById("result-value").innerText = "Adj meg dátumot";
    return;
  }

  let d = new Date(invoiceDate);
  d.setDate(d.getDate() + deadline);

  document.getElementById("result-value").innerText =
    d.toLocaleDateString("hu-HU");
}
function calculateContinuous() {
  let periodEnd = document.getElementById("periodEnd").value;
  let invoiceDate = document.getElementById("invoiceDate").value;
  let paymentDate = document.getElementById("paymentDate").value;

  if (!periodEnd || !invoiceDate || !paymentDate) {
    document.getElementById("result-value").innerText = "Tölts ki minden mezőt";
    return;
  }

  let period = new Date(periodEnd);
  let payment = new Date(paymentDate);

  // alap: fizetési határidő
  let result = new Date(payment);

  // max 60 nap szabály
  let maxDate = new Date(period);
  maxDate.setDate(maxDate.getDate() + 60);

  if (payment > maxDate) {
    result = maxDate;
  }

  document.getElementById("result-value").innerText =
    result.toLocaleDateString("hu-HU");
}
function calculateConsumption() {
  const distance = parseFloat(document.getElementById("distance").value);
  const fuel = parseFloat(document.getElementById("fuel").value);

  if (!distance || !fuel) {
    document.getElementById("result-value").innerText = "Adj meg adatokat!";
    return;
  }

  const consumption = (fuel / distance) * 100;

  document.getElementById("result-value").innerText =
    consumption.toFixed(2) + " L/100km";
}
