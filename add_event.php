<?php
include 'config.php';

$event_name = $_POST['event_name'];
$event_date = $_POST['event_date'];
$event_description = $_POST['event_description'];

$sql = "INSERT INTO events (event_name, event_date, event_description) VALUES ('$event_name', '$event_date', '$event_description')";

if ($conn->query($sql) === TRUE) {
    echo "New event created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
