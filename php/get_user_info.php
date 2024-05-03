<?php
    session_start();
    error_log(print_r($_SESSION, TRUE));

    require_once('preflight.php');
    require_once('cors.php');
    require_once('db_connection.php');


    if(isset($_SESSION['user'])) {
       
        $username = $_SESSION['user'];

        $sql = "SELECT Email, Street, `First Name`, `Last Name`,`Phone Number`, `State`, Country, Username FROM User WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            echo json_encode($user);
        } else {
            echo json_encode(array("error" => "User could not be found in database"));
        } 
    } else {
        echo json_encode(array("error" => "User Not Logged In"));
    }
    $conn->close();
?>