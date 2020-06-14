<?php
// Include config file
                    require_once "config.php";

                    // Attempt select query execution
                    $sql = "SELECT * FROM employees";
                    if($result = mysqli_query($link, $sql)){
                        if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_array($result)){

                    $id = $row['id'];
                    $name = $row['name'];
                    $address = $row['address'];
                    $salary = $row['salary'];
                    $result[] = array('id'=>$id, 'name'=>$name, 'address'=>$address, 'salary'=>$salary);
                }
                $json = array('status' => 1, 'info' => $result);
                // Free result set
                mysqli_free_result($result);
                } else{
                $json = array('status' => 0, 'message' => 'No records were found.');
                }
                } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                }

                // Close connection
                mysqli_close($link);