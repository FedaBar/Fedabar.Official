<?php
$servername = "sqlXXX.infinityfree.net"; // Ersetze mit deinem Hostname
$username = "id22417313_fedabar"; // Ersetze mit deinem Benutzernamen
$password = "11250Fflo; // Ersetze mit deinem Passwort
$dbname = "id22417313_fedabar"; // Ersetze mit deinem Datenbanknamen

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
