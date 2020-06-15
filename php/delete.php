<?php
include 'config.php';

$id = $_GET['id'];

    $sql = "DELETE FROM employees WHERE id = '$id'";

    $stmt = mysqli_stmt_init($link);

    if(!mysqli_stmt_prepare($stmt, $sql)){
        echo "Failed to update employee.";
    } else {
        mysqli_stmt_bind_param($stmt, "i", $ida);
        mysqli_stmt_execute($stmt);
    }


@mysqli_close($link);
header('Content-type: application/json');

