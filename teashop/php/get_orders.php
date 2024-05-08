<?php

require_once('preflight.php');
require_once('cors.php');
require_once('db_connection.php');

$sql = "SELECT * FROM `Order`";
$result = $conn->query($sql);

if ($result !== false || $result->num_rows > 0) {
    $orders = array();

    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode($orders);
} else {
    echo "0 results";
}
$conn->close();
?>