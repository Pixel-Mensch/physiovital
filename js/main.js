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

  /* -----------------------------------------
     Scroll-Animationen mit Intersection Observer
  ----------------------------------------- */
  const animatedElements = document.querySelectorAll(
    ".card, .team-card, .testimonial-card, .faq-item, .blog-card, .section-title, .section-intro"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.classList.add("fade-ready");
    observer.observe(el);
  });

  /* -----------------------------------------
     Counter-Animation für Hero-Panel
  ----------------------------------------- */
  const ratingElement = document.querySelector(".hero-panel-value");
  if (ratingElement && ratingElement.textContent.includes("4,9")) {
    const animateCounter = (element, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent =
            target.toFixed(1).replace(".", ",") + " / 5 Sterne";
          clearInterval(timer);
        } else {
          element.textContent =
            current.toFixed(1).replace(".", ",") + " / 5 Sterne";
        }
      }, 16);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(ratingElement, 4.9);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterObserver.observe(ratingElement);
  }

  /* -----------------------------------------
     Back-to-Top Button
  ----------------------------------------- */
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.setAttribute("aria-label", "Zurück nach oben");
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("back-to-top--visible");
    } else {
      backToTopBtn.classList.remove("back-to-top--visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* -----------------------------------------
     Erweiterte Formular-Validierung
  ----------------------------------------- */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    contactForm.addEventListener("submit", function (e) {
      // Entferne alte Fehlermeldungen
      document.querySelectorAll(".form-error").forEach((err) => err.remove());

      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      let hasError = false;

      // Name-Validierung
      if (!name.value.trim()) {
        showError(name, "Bitte geben Sie Ihren Namen ein.");
        hasError = true;
      }

      // E-Mail-Validierung
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError(email, "Bitte geben Sie Ihre E-Mail-Adresse ein.");
        hasError = true;
      } else if (!emailRegex.test(email.value)) {
        showError(email, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
        return;
      }

      // Loading-State
      submitBtn.disabled = true;
      submitBtn.textContent = "Wird gesendet...";
      submitBtn.style.opacity = "0.6";
    });

    function showError(input, message) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "form-error";
      errorDiv.textContent = message;
      input.parentElement.appendChild(errorDiv);
      input.classList.add("form-input--error");
      input.focus();
    }

    // Fehler entfernen beim Tippen
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("form-input--error");
        const error = this.parentElement.querySelector(".form-error");
        if (error) error.remove();
      });
    });
  }

  /* -----------------------------------------
     Cookie-Banner
  ----------------------------------------- */
  if (!localStorage.getItem("cookiesAccepted")) {
    const cookieBanner = document.createElement("div");
    cookieBanner.className = "cookie-banner";
    cookieBanner.innerHTML = `
      <div class="cookie-banner-content">
        <p class="cookie-banner-text">
          Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. 
          <a href="#datenschutz" class="cookie-banner-link">Mehr erfahren</a>
        </p>
        <button class="cookie-banner-btn">Akzeptieren</button>
      </div>
    `;
    document.body.appendChild(cookieBanner);

    const acceptBtn = cookieBanner.querySelector(".cookie-banner-btn");
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.add("cookie-banner--hidden");
      setTimeout(() => cookieBanner.remove(), 300);
    });
  }
});
