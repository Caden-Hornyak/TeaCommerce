<?php

require_once('preflight.php');
require_once('cors.php');
require_once('db_connection.php');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$orderID = $data['OrderID'];

$sql_orderitem = "DELETE FROM `OrderItem` WHERE OrderID = '$orderID'";
$orderitem = $conn->query($sql_orderitem);

$sql_orderdetails = "DELETE FROM `Order Details` WHERE OrderID = '$orderID'";
$orderdetails = $conn->query($sql_orderdetails);

$sql = "DELETE FROM `Order` WHERE OrderID = '$orderID'";
$result = $conn->query($sql);

require_once('get_orders.php');
?>