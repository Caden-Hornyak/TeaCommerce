<?php

require_once('preflight.php');
require_once('cors.php');
require_once('db_connection.php');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

$street = $data['street'];
$state = $data['state'];
$country = $data['country'];

$fname = $data['fname'];
$lname = $data['lname'];
$phone_number = $data['phone'];

$hashed_password = password_hash($password, PASSWORD_DEFAULT);


$sql = "INSERT INTO User (Email, `Password`, Street, `State`, Country, `First Name`, `Last Name`, `Phone Number`, Username)
 VALUES ('$email', '$hashed_password', '$street', '$state', '$country', '$fname', '$lname', '$phone_number', '$username')";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo json_encode(array("success" => "Account Created Successfully"));
} else {
    echo json_encode(array("error" => "There was an error in your submission"));
}

$conn->close();
?>