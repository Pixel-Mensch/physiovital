# PhysioVital – Moderne Physiotherapie Website (Demo)

Dies ist eine vollständig ausgearbeitete Demo-Website für eine moderne Physiotherapie-Praxis.  
Sie dient als Referenzprojekt für **Lumencat – Webdesign & Automation** und zeigt, wie eine hochwertige medizinische Website technisch, visuell und strukturell umgesetzt wird.

Die Seite ist vollständig responsive, SEO-optimiert und enthält ein funktionsfähiges Kontaktformular (mit PHP-Mail und Spamschutz).

---

## 🌐 Live-Demo

**Live ansehen:**  
https://pixel-mensch.github.io/physiovital/  
_(oder später die echte Domain des Kunden)_

---

## ✨ Features

- Moderne, klare Design-Ästhetik
- Mobile-first entwickelt
- Hochwertiger Hero-Bereich mit Info-Panels
- Mehrere strukturierte Inhalte (Leistungen, Team, FAQ, Blog etc.)
- Galeriesektion mit semantischen ARIA-Beschreibungen
- Sticky CTA (mobil) für höhere Conversion
- Voll funktionsfähiges Kontaktformular (PHP)
- Spamschutz via Honeypot
- Dynamische Erfolgs-/Fehleranzeige per JavaScript
- Schema.org/JSON-LD (Physician) integriert
- OpenGraph/Twitter Meta für Social Preview
- Saubere Datei- und Code-Struktur
- Barrierearme Navigation

---

## 🧩 Tech-Stack

**Frontend:**

- HTML5
- CSS3 (mobile-first, responsive)
- Vanilla JavaScript (Navigation, Formstatus, Smooth Scroll)

**Backend/Server:**

- PHP (`mail()`-Versand)
- Honeypot Spam-Protection

**SEO/Meta:**

- Meta Description, Titel, Canonical
- OpenGraph / Twitter Cards
- JSON-LD (Schema.org: Physician)

---

## 📂 Projektstruktur

```
/css
└── styles.css
/js
└── main.js
/Bilder
└── (Galerie- und Praxisbilder)
/contact.php
/index.html
```

---

## 📬 Kontaktformular

Das Formular sendet Anfragen direkt über eine einfache PHP-Mail-Funktion:

- `contact.php` sammelt die Felder
- Honeypot-Feld blockt Bots
- Erfolgs- oder Fehlermeldung erscheint automatisch über `main.js`
- Weiterleitung erfolgt via `?status=ok/#kontakt` oder `?status=error/#kontakt`

---

## ⚠️ Rechtlicher Hinweis

Die Angaben für **Impressum** und **Datenschutz** sind Platzhalter.  
Für jeden realen Kunden müssen echte, rechtskonforme Texte bereitgestellt werden (z. B. eRecht24 oder Anwalt).

---

## 🐾 Erstellt von

**Lumencat – Webdesign & Automation**  
https://lumencat.de

---

## 📄 Lizenz

Dieses Projekt ist ein Demo-Projekt und darf nicht ohne Zustimmung kommerziell verwendet oder verkauft werden.
