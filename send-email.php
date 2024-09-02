 <?php

// $name = $_POST["name"];
// $email = $_POST["email"];
// $subject = $_POST["subject"];
// $message = $_POST["message"];


$name="Barry";
$email="cyberhome101@gmail.com";
$subject="Simone's Boutique - Order Confirmation";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "vendor/autoload.php";

// header("Location: cart.html?confirm=true");

function embed_images(&$body) {
	// get all img tags
	preg_match_all('/<img.?>/', $body, $matches);
	if (!isset($matches[0])) return;
	// foreach tag, create the cid and embed image
	$i = 1;
	foreach ($matches[0] as $img) {
		// make cid
		$id = 'img'.($i++);
		// replace image web path with local path
		preg_match('/src="(.?)"/', $body, $m);
		if (!isset($m[1])) continue;
        $arr = parse_url($m[1]);
        if (!isset($arr['host']) || !isset($arr['path']))continue;
        // add
        // $this->AddEmbeddedImage('images/'.$arr['host'].'/public'.$arr['path'], $id, 'attachment', 'base64', 'image/jpeg');
        $this->AddEmbeddedImage('images/'.$arr['host'], $id);
		$body = str_replace($img, '', $body);
	}
}

$message = file_get_contents("generated_page.html");

$mail = new PHPMailer(true);
$mail->SMTPDebug=1;
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->isHTML();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->WordWrap = 70; // set word wrap

$mail->Username = "cyberhome101@gmail.com";
$mail->Password = "upuatxjkertudjtv";

$mail->setFrom($email, $name);
$mail->addAddress("cyberhome101@gmail.com", "Barry");

$mail->Subject = $subject;

$csvFile = fopen("data.csv","r");
$i=0;
while (($array = fgetcsv($csvFile)) !== FALSE) {
    $file="images" . $array[0];
    $file = str_replace('%20', ' ', $file);
    $cid="image_cid" . $i;
    $mail->addEmbeddedImage($file, $cid);
    $i=$i+1;
}
$mail->Body = $message;

// $mail->addAttachment('path/to/invoice1.pdf', 'invoice1.pdf');
// $mail->addEmbeddedImage('images/Leggings1.jpeg', 'image_cid3');
// embed_images($message);
// $mail-> "Content-Type: text/html; charset=UTF-8\r\n"
// send data array
// $mysql_data = $mysql_row['blob_data'];
// $mail->addStringAttachment($mysql_data, 'db_data.db');
// or
// $mail->addStringAttachment(file_get_contents($url), 'myfile.pdf');
// mail(to,subject,message,headers,parameters);

$mail->send();

// if(!$mail->send()) {
//    echo 'Message could not be sent.';
//    echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//    echo 'Message has been sent';
// }

// if( mail($email, $subject, $message, $subject) ){
//    echo "Sent";
// } else { 
//    echo "Error, check your logs"; 
// }


exit;
