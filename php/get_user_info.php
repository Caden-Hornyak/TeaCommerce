<?php
    session_start();

    if(isset($_SESSION['username'])) {
        require_once 'db_connection.php';

        $username = $_SESSION['username'];

        $sql = "SELECT Email, Street, First Name, Last Name, Phone Number, State, Country FROM User WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows === 0) {
            $user = $result->fetch_assoc();
            echo json_encode($user);
        } else {
            echo "User not found in the database.";
        }

        $conn->close();
    } else {
        echo "User not logged in.";
    }
?>