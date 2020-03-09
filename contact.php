<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$formcontent = " <b>От:</b> $name - $email <br><br> \n <b>Тема:</b> $subject <br><br> \n <b>Съобщение:</b> $message";
$recipient = "vfxmatrix@gmail.com";
$header = 'From: ' . $email . "\r\n";
$header .= 'Content-Type: text/html; charset=utf-8' . "\r\n";
mail($recipient, $subject, $formcontent, $header);

?>