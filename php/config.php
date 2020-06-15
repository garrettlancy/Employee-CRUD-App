<?php

//define('DB_SERVER', 'localhost');
//define('DB_USERNAME', 'root');
//define('DB_PASSWORD', 'root');
//define('DB_NAME', 'employee_db');

define('DB_SERVER', 'us-cdbr-east-05.cleardb.net');
define('DB_USERNAME', 'b8ca4a4bfc8fb5');
define('DB_PASSWORD', '749b6271');
define('DB_NAME', 'employee_db');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
