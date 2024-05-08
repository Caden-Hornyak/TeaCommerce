<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    
    require_once('cors.php');
    exit;
}

?>