<?php
session_start();

require_once('preflight.php');
require_once('db_connection.php');
require_once('cors.php');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$username = $data['username'];
$password = $data['password'];


$sql = "SELECT * FROM User WHERE username = '$username'";
$result = $conn->query($sql);

if ($result !== False && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['Password'];

    if (password_verify($password, $hashed_password)) {
        
        $_SESSION['name'] = $username;


        $sql = "SELECT Email, Street, `First Name`, `Last Name`,`Phone Number`, `State`, Country, Username FROM User WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            echo json_encode($user);
        } else {
            echo json_encode(array("error" => "User could not be found in database"));
        }

    } else {
        echo json_encode(array("error" => "There was an error in your submission"));
    }

} else {
    echo json_encode(array("error" => "There was an error in your submission"));
    
}


$conn->close();
?>