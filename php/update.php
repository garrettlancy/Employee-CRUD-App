<?php
include 'config.php';

$id = isset($_GET['id']) ? $_GET['id'] : '';
$name = $_POST['name'];
$address = $_POST['address'];
$salary = $_POST['salary'];

$sql = "UPDATE employees SET name = '".$name."', address = '".$address."', salary = '".$salary."' WHERE id = '".$id."'";

if (mysqli_query($link, $query)) {
    echo 'Employee updated successfully!';
} else {
    echo 'Failed to update Employee.';
}

@mysqli_close($link);