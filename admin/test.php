<?php

$fromName = 'Webbouwer';
$fromEmail = 'support@webdesigndenhaag.net';

$toEmail = 'project@oddsized.org';
$subject = 'Basic email test v3'; // $fromWebsite;
$htmlContent = '<div><h1>HTML</h1><p>content message</p></div>';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From:'.$fromName.' <'.$fromEmail.'>' . "\r\n";
// Send email
$retval = mail ($toEmail,$subject,$htmlContent,$headers);

if( $retval == true ) {
  $result['msg'] = 'De email is verstuurd aan '.$toEmail;
}else{
  $result['msg'] =  'Error: '. $retval;
}
header('Content-Type: application/json');
print json_encode($result);
