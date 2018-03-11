<?php 
	$errors = '';
	$myemail = 'admin@romanstruna.com';

	if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['comment'])) {
		$errors .= "\n Error: all fields are required";
	}

	$name = $_POST['name'];
	$email_address = $_POST['email'];
	$message = $_POST['comment'];
	$company = $_POST['company'];
	$type = $_POST['type'];

	if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
		$errors .= "\n Error: Invalid email address";
	}
	if (empty($errors)) {
		$to = $myemail;
		$email_subject = "$type, From: $name";
		$email_body = "Name: $name\nType: $type\nEmail: $email_address\nCompany: $company\n\n\n$message";
		$headers = "From: $myemail\n";
		$headers .= "Reply-To: $email_address";

		mail($to, $email_subject, $email_body, $headers);
		// redirect to the 'thank you' page
		header('Location: success.html');
	}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
	<head>
		<title>Contact form</title>
		<meta http-equiv="refresh" content="5;URL=http://www.romanstruna.com">
	</head>
	<body>
		<!-- This page is displayed only if there is some error -->
		<p>Please use the form as intended :)</p>
		<?php
			echo nl2br($errors);
		?>
	</body>
</html>