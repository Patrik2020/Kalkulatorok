(function () {
  const banner = document.getElementById("cookie-banner");

  if (!banner) return;

  const accepted = localStorage.getItem("cookieConsent");

  if (!accepted) {
    banner.style.display = "flex";
  } else if (accepted === "accepted") {
    loadAnalytics(); // 💥 EZ HIÁNYZOTT
  }

  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      banner.style.display = "none";
      loadAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      banner.style.display = "none";
    });
  }
})();

/* Analytics */

function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-4JBY0GDC4C";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", "G-4JBY0GDC4C");
}
