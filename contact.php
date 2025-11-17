<?php
// Einfacher Formular-Handler für PhysioVital

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#kontakt');
    exit;
}

// Felder einsammeln und etwas säubern
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$concern = trim($_POST['concern'] ?? '');
$message = trim($_POST['message'] ?? '');

// Honeypot-Feld (Spamschutz)
$website = trim($_POST['website'] ?? '');
if ($website !== '') {
    // Bot – einfach still zurück
    header('Location: index.html#kontakt');
    exit;
}

// Basis-Validierung
if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html#kontakt?status=error');
    exit;
}

// >>> HIER die Zieladresse später anpassen <<< 
$to = 'pixelmensch@mail.de';

$subject = 'Neue Terminanfrage über die Website';
$body = "Neue Anfrage von der Website:\n\n"
      . "Name: $name\n"
      . "E-Mail: $email\n"
      . "Telefon: $phone\n"
      . "Behandlungswunsch: $concern\n\n"
      . "Nachricht:\n$message\n";

$headers = "From: PhysioVital Website <no-reply@physiovital.de>\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    header('Location: index.html#kontakt?status=ok');
} else {
    header('Location: index.html#kontakt?status=error');
}
exit;
