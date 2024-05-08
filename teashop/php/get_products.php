<?php

require_once('preflight.php');
require_once('cors.php');
require_once('db_connection.php');

$sql = "SELECT * FROM Product";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $products = array();

    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
} else {
    echo "0 results";
}
$conn->close();
?>