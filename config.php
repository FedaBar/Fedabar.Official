<?php
$servername = "sqlXXX.infinityfree.net"; // Ersetze mit deinem Hostname
$username = "if0_36856631"; // Ersetze mit deinem Benutzernamen
$password = "11250Fflo; // Ersetze mit deinem Passwort
$dbname = "if0_36856631_XXX(3306)"; // Ersetze mit deinem Datenbanknamen

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
