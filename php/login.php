<?php
require_once 'cors.php';
require_once 'db_connection.php';

$username = $_POST['username'];
$password = $_POST['password'];


$sql = "SELECT * FROM User WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password'];

    if (password_verify($password, $stored_hashed_password)) {
        session_start();
        $_SESSION['username'] = $username;
        require_once 'get_user_info.php';
    } else {
        echo "Incorrect Username or Password";
    }

} else {
    echo "More than one user with selected username";
}

$conn->close();
?>