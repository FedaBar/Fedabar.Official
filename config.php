<?php
$servername = "192.168.0.100"; // Ersetze mit deinem Hostname
$username = "fedabarc_fedabarofficial"; // Ersetze mit deinem Benutzernamen
$password = "11250Fflo!; // Ersetze mit deinem Passwort
$dbname = "fedabarc_fedabarofficial"; // Ersetze mit deinem Datenbanknamen

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
