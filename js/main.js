// Jahr im Footer automatisch setzen
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Mobile Navigation ein und ausklappen
const navToggle = document.querySelector(".mobile-nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
    });
  });
}
// Formular-Status anzeigen, wenn ?status=ok oder ?status=error in der URL
const statusBox = document.getElementById("form-status");
if (statusBox) {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "ok") {
    statusBox.textContent =
      "Vielen Dank! Ihre Anfrage wurde erfolgreich versendet. Wir melden uns schnellstmöglich bei Ihnen.";
    statusBox.classList.add("form-status--visible", "form-status--success");
  } else if (status === "error") {
    statusBox.textContent =
      "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.";
    statusBox.classList.add("form-status--visible", "form-status--error");
  }
}
