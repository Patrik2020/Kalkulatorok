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
