<?php

require_once('cors.php');
require_once('db_connection.php');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$orderID = $data['OrderID'];
$sql = "DELETE FROM `Order` WHERE OrderID = '$orderID'";
$result = $conn->query($sql);

require_once('get_orders.php');
?>