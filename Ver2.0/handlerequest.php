<?php 
	$myemail = 'roman.struna.amway@gmail.com';

	if (empty($_POST['email']) || empty($_POST['comment'])) {
		echo '{"result":"ERROR"}';
		die();
	}

	$email_address = $_POST['email'];
	$message = $_POST['comment'];

	if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
		echo '{"result":"ERROR"}';
		die();
	}
	$to = $myemail;
	$email_subject = "Portoflio - contact form message";
	$email_body = "Email: $email_address\n\n\n$message";
	$headers = "From: $myemail\n";
	$headers .= "Reply-To: $email_address";

	mail($to, $email_subject, $email_body, $headers);
	echo '{"result":"OK"}';
?>