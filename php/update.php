<?php
include 'config.php';

$id = $_GET['id'];
$sql = "SELECT * FROM employees WHERE id = ?;";
$stmt = mysqli_stmt_init($link);

if(!mysqli_stmt_prepare($stmt, $sql)){
    $json = array('status' => 0, 'msg' => 'Employee not found!');
} else {
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $mySqlResult = mysqli_stmt_get_result($stmt);

    while ($row = mysqli_fetch_assoc($mySqlResult)) {
        $id = $row['id'];
        $name = $row['name'];
        $address = $row['address'];
        $salary = $row['salary'];
        $result = array('id' => $id, 'name' => $name, 'address' => $address, 'salary' => $salary);
    }
    $json = $result;
}

$name = $_POST['name'] ;
$address =  $_POST['address'];
$salary = $_POST['salary'];

$sql = "UPDATE employees SET name = ?, address = ?, salary = ? WHERE id = ?";
//$sql = "UPDATE employees SET name = '$name', address = '$address', salary = '$salary' WHERE id = '$id'";

$stmt = mysqli_stmt_init($link);

if(!mysqli_stmt_prepare($stmt, $sql)){
    echo "Failed to update employee.";
} else {
    mysqli_stmt_bind_param($stmt, "sss", $name, $address, $salary);
    mysqli_stmt_execute($stmt);
    echo "Employee updated successfully!";
}

@mysqli_close($link);
header('Content-type: application/json');
echo json_encode($json);