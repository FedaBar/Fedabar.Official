<!DOCTYPE html>
<html>
<head>
    <title>Event Calendar</title>
</head>
<body>
    <h1>Event Calendar</h1>
    <?php
    include 'config.php';

    $sql = "SELECT * FROM events";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "Event: " . $row["event_name"] . " - Date: " . $row["event_date"] . " - Description: " . $row["event_description"] . "<br>";
        }
    } else {
        echo "No events found";
    }

    $conn->close();
    ?>
</body>
</html>
