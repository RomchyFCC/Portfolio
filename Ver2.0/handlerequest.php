<?php 
	$myemail = 'roman.struna.amway@gmail.com';

	if (empty($_POST['email']) || empty($_POST['comment'])) {
		die();
	}

	$email_address = $_POST['email'];
	$message = $_POST['comment'];

	if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
		die();
	}
	$to = $myemail;
	$email_subject = "Portoflio - contact form message";
	$email_body = "Email: $email_address\n\n\n$message";
	$headers = "From: $myemail\n";
	$headers .= "Reply-To: $email_address";

	mail($to, $email_subject, $email_body, $headers);
	// redirect to the 'thank you' page
	header('Location: success.html');
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
	<head>
		<title>Contact form</title>
		<meta http-equiv="refresh" content="5;URL=https://www.romanstruna.com">
	</head>
	<body>
		<!-- This page is displayed only if there is some error -->
		<p>Please use the form as intended :)</p>
	</body>
</html>