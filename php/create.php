<?php
include_once('config.php');

$name = $_POST['name'] ;
$address =  $_POST['address'];
$salary = $_POST['salary'];

$sql = "INSERT INTO employees(name, address, salary) VALUES (?, ?, ?)";

$stmt = mysqli_stmt_init($link);

if(!mysqli_stmt_prepare($stmt, $sql)){
    echo "Failed to add employee";
} else {
    mysqli_stmt_bind_param($stmt, "sss", $name, $address, $salary);
    mysqli_stmt_execute($stmt);
    echo "Employee Added Successfully";
}

@mysqli_close($link);

