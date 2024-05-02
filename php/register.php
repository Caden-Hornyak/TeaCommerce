<?php
require_once('cors.php');
require_once('db_connection.php');

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$street = $_POST['street'];
$state = $_POST['state'];
$country = $_POST['country'];

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone_number = $_POST['phone_number'];

$hashed_password = password_hash($password, PASSWORD_DEFAULT);


$sql = "INSERT INTO users (Email, Password, Street, State, Country, First Name, Last Name, Phone Number)
 VALUES ('$email', '$hashed_password', '$street', '$state', '$country', '$fname', '$lname', '$phone_number')";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>