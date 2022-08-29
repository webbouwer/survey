<?php require_once('protected.php');

//require('config.php'); // $activeConfig
//require('datalist.php'); // $activeData
/* PHP Mailer
 * verification emailadresses (google etc.)
 * https://support.google.com/mail/answer/81126#authentication
 *
*/
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../lib/PHPMailer/src/Exception.php';
require '../lib/PHPMailer/src/PHPMailer.php';
//require '../lib/PHPMailer/src/SMTP.php';
require '../lib/util/markupSurvey.php';

$result = []; // result of sending email
$chk = false; // checked email variables default false

// check vars, markup html and send with phpmailer
if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'send' ){

  if( isset($_REQUEST['data']['formtype']) && $_REQUEST['data']['formtype'] == 'email'){

      if(  isset($_REQUEST['data']['fromname'])
        && isset($_REQUEST['data']['fromemail'])
        && isset($_REQUEST['data']['toname'])
        && isset($_REQUEST['data']['toemail'])
        && isset($_REQUEST['data']['subject'])
        && isset($_REQUEST['data']['htmlcontent'])

      ){

        $fromName = $_REQUEST['data']['fromname'];
        $fromEmail = $_REQUEST['data']['fromemail'];
        $toName = $_REQUEST['data']['toname'];
        $toEmail = $_REQUEST['data']['toemail'];
        $subject = $_REQUEST['data']['subject']; // $fromWebsite;

        $htmlContent = markupEmailHTML( $_REQUEST['data']['htmlcontent'] );
        $chk = true;
      }

  }

  if( isset($_REQUEST['data']['formtype']) && $_REQUEST['data']['formtype'] == 'survey' ){

    if(  isset($_REQUEST['data']['fromname'])
      && isset($_REQUEST['data']['fromemail'])
      && isset($_REQUEST['data']['toname'])
      && isset($_REQUEST['data']['toemail'])
      && isset($_REQUEST['data']['subject'])
      && isset($_REQUEST['data']['htmlcontent'])
      && isset($_REQUEST['data']['surveyid'])
      && isset($_REQUEST['data']['profileid'])
      && isset($_REQUEST['data']['survey'])
      && isset($_REQUEST['data']['profile'])
    ){

      $fromName = $_REQUEST['data']['fromname'];
      $fromEmail = $_REQUEST['data']['fromemail'];
      $toName = $_REQUEST['data']['toname'];
      $toEmail = $_REQUEST['data']['toemail'];
      $subject = $_REQUEST['data']['subject']; // $fromWebsite;

      $surveyid = $_REQUEST['data']['surveyid'];
      $profileid = $_REQUEST['data']['profileid'];
      $survey = $_REQUEST['data']['survey'];
      $profile = $_REQUEST['data']['profile'];

      // get survey html
      $activeid = uniqid();
      $htmlContent =  markupSurveyHTML( $activeid, $toName, $toEmail, $profileid, $profile, $surveyid, $survey ); //'Survey title: '.$survey['title'].' - Profile name: '.$profile['profile'].' .. '.$_REQUEST['data']['htmlcontent'];

      $chk = true;


    }
  }

}

if($chk){

  //Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  // Open the try/catch block.
  try {
     // Set the mail sender.
     $mail->setFrom($fromEmail, $fromName);

     // Add a recipient.
     $mail->addAddress( $toEmail, $toName);

     $mail->isHTML(true);

     // Set the subject.
     $mail->Subject = $subject;

     // Set the mail message body.
     $mail->Body = $htmlContent;

     // Finally send the mail.
     //$mail->send();
  	 if (!$mail->send()) {
  	     //echo 'Mailer Error: ' . $mail->ErrorInfo;
      $result['status'] = 'failed';
      $result['msg'] = 'Error: '. $mail->ErrorInfo;
  	 } else {
       $result['status'] = 'succes';
       $result['msg'] = 'Message sent to '.$toEmail.'!';
  	 }
  }
  catch (Exception $e)
  {
     // PHPMailer exception.
     //echo $e->errorMessage();
     $result['status'] = 'failed';
     $result['msg'] = 'Error: '. $e->errorMessage();
  }

}else{
  $result['status'] = 'failed';
  $result['msg'] = 'Error: Not enough or incorrect data to send an email.';
}

header('Content-Type: application/json');
print json_encode($result);





/*
//Set PHPMailer to use the sendmail transport
$mail->isSendmail();
//Set who the message is to be sent from
//$mail->setFrom('project@oddsized.org', 'Oddsized Projects');
$mail->From       = "project@oddsized.org";
$mail->FromName   = "Oddsized Projects";

//Set an alternative reply-to address
$mail->addReplyTo('project@oddsized.org', 'Oddsized Projects');
//Set who the message is to be sent to
$mail->addAddress('oddsized@gmail.com', 'Oddsized Interactive');
//Set the subject line
$mail->Subject = 'PHPMailer sendmail test';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->MsgHTML(file_get_contents('contents.html'), __DIR__);

//Replace the plain text body with one created manually
$mail->AltBody = '<div><h1>PHPMailer sendmail test titel</h1><p>PHPMailer sendmail test html text</p></div>';
$mail->IsHTML(true);

//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');
echo 'Sending test email';

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}
*/
