<?php
$username = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$textarea = $_POST['message'];

if (!empty($username) || !empty($email) || !empty($phone) || !empty($textarea)){
  $host = "localhost";
  $dbUsername = "root";
  $dbPassword = "";
  $dbname = "feedb";

  // Create Connection
  $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

  if (mysqli_connect_error()){
    die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
  } else{
    $SELECT = "SELECT email from feedback where email = ? limit 1";
    $INSERT = "INSERT Into feedback (username, email, phone, message)
    values(?, ?, ?, ?)";

    //prepare statement
    $stmt = $conn->prepare($SELECT);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($email);
    $stmt->store_result();
    $rnum = $stmt->num_rows;


    if($rnum ==0){
      $stmt->close();

      $stmt = $conn->prepare($INSERT);
      $stmt->bind_param("ssis", $username, $email, $phone, $textarea);
      $stmt->execute();
      echo "Thank you for your feedback";

    } else{
      echo "please change your email";
    }
    $stmt->close();
    $conn->close();
  }
} else{
  echo "All field are required";
  die();
}

?>