<?php
$servername = "sqlXXX.infinityfree.net"; // Ersetze mit deinem Hostname
$username = "your_username"; // Ersetze mit deinem Benutzernamen
$password = "your_password"; // Ersetze mit deinem Passwort
$dbname = "your_database_name"; // Ersetze mit deinem Datenbanknamen

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
