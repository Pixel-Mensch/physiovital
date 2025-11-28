document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     Jahr im Footer
  ----------------------------------------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------
     Mobile Navigation
  ----------------------------------------- */
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
    });

    // Navigation schließt, wenn man auf einen Link klickt
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
      });
    });

    // Navigation schließt sich automatisch beim Wechsel in Desktop-Ansicht
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mainNav.classList.remove("is-open");
      }
    });
  }

  /* -----------------------------------------
     Smooth Scroll Upgrade (optional nice UX)
  ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href").slice(1);
      const target = document.getElementById(id);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* -----------------------------------------
     Formular-Status (Erfolg / Fehler)
  ----------------------------------------- */
  const statusBox = document.getElementById("form-status");

  if (statusBox) {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "ok") {
      statusBox.textContent =
        "Vielen Dank! Ihre Terminanfrage wurde erfolgreich versendet.";
      statusBox.classList.add("form-status--visible", "form-status--success");
    }

    if (status === "error") {
      statusBox.textContent =
        "Ihre Nachricht konnte leider nicht versendet werden. Bitte prüfen Sie Ihre Eingaben oder versuchen Sie es später erneut.";
      statusBox.classList.add("form-status--visible", "form-status--error");
    }

    // Automatisches Ausblenden nach 6 Sekunden
    if (status) {
      setTimeout(() => {
        statusBox.classList.remove("form-status--visible");
      }, 6000);
    }
  }
});
