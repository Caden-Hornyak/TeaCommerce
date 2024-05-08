<?php

require_once('preflight.php');
require_once('cors.php');
require_once('db_connection.php');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$delivery_status_options = array(
    "Pending",
    "Processing",
    "Shipped",
    "Out for delivery",
    "Delivered"
);
$delivery_status = $delivery_status_options[array_rand($delivery_status_options)];

$shopping_cart = $data['shoppingCart'];

$total_price = 0.0;

foreach ($shopping_cart as $item_pair) {
    $item = $item_pair['0'];
    $quantity = $item_pair['1'];

    $total_price += ($quantity * $item['Price']);
}

$current_date = date("Y-m-d");
$sql_order = "INSERT INTO `Order` (`Date Ordered`, `Total Price`, `Status`) VALUES ('$current_date', '$total_price', '$delivery_status')";
$order = $conn->query($sql_order);
$order_id = $conn->insert_id;


$formData = $data['formData'];

$email = $formData['email'];
$street = $formData['street'];
$state = $formData['state'];
$country = $formData['country'];
$fname = $formData['fname'];
$lname = $formData['lname'];
$phone_number = $formData['phone'];
$cvc = $formData['cvc'];
$debcred_number = $formData['debCredNumber'];

$sql_order_details = "INSERT INTO `Order Details` (Email, Street, `State`, Country, `First Name`, `Last Name`, `Phone Number`, OrderID, CVC, `Credit/Debit Number`)
 VALUES ('$email', '$street', '$state', '$country', '$fname', '$lname', '$phone_number', '$order_id', '$cvc', '$debcred_number')";
$order_details = $conn->query($sql_order_details);


foreach ($shopping_cart as $item_pair) {
    $item = $item_pair['0'];
    $quantity = $item_pair['1'];

    $productID = $item['ProductID'];

    $sql_select = "SELECT ProductID FROM Product WHERE ProductID = '$productID'";
    $matchingID = $conn->query($sql_select);

    $price = floatval($item['Price']) * $quantity;

    $sql_update = "UPDATE Product SET Stock = Stock - $quantity WHERE ProductID = '$productID'";
    $stock_update = $conn->query($sql_update);

    $sql_orderitem = "INSERT INTO OrderItem (OrderID, ProductID, Quantity, Price)
    VALUES ('$order_id', '$productID', '$quantity', '$price')";
    $orderitem = $conn->query($sql_orderitem);
}

require_once('get_orders.php');
?>