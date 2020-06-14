<?php
include_once 'config.php';
$sql = "SELECT * FROM employees ORDER by id DESC";
$query = $link->query($sql);
if($query->num_rows > 0){
    while($row = $query->fetch_array()){
        $id = $row['id'];
        $name = $row['name'];
        $address = $row['address'];
        $salary = $row['salary'];
        $result[] = array('id'=>$id, 'name'=>$name, 'address'=>$address, 'salary'=>$salary);
    }
    $json = array('status' => 1, 'info' => $result);
} else {
    $json = array('status' => 0, 'message' => 'Employee not found.');
}
@mysqli_close($link);
header('Content-type: application/json');
echo json_encode($json);