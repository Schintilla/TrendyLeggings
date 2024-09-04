 <?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "vendor/autoload.php";

$mail = new PHPMailer(true);
$mail->SMTPDebug=3;

$mail->isSMTP();
$mail->isHTML(false);
$mail->SMTPAuth = true;
$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->Username = "cyberhome101@gmail.com";
$mail->Password = "upuatxjkertudjtv";

$mail->setFrom($email, $name);
$mail->addAddress("cyberhome101@gmail.com", "Barry");

$mail->Subject = $subject;

$mail->Body = $message;

$mail->send();

// if(!$mail->send()) {
//    echo 'Message could not be sent.';
//    echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//    echo 'Message has been sent';
// }

header("Location: contact.php?confirm=true");
exit;
