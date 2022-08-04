<?php require_once('protected.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../lib/PHPMailer/src/Exception.php';
require '../lib/PHPMailer/src/PHPMailer.php';
//require '../lib/PHPMailer/src/SMTP.php';

$result = [];
$chk = false;

if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'send' ){

      if(  isset($_REQUEST['data']['fromname'])
        && isset($_REQUEST['data']['fromemail'])
        && isset($_REQUEST['data']['toemail'])
        && isset($_REQUEST['data']['subject'])
        && isset($_REQUEST['data']['htmlcontent'])

      ){

        $fromName = $_REQUEST['data']['fromname'];
        $fromEmail = $_REQUEST['data']['fromemail'];
        $toEmail = $_REQUEST['data']['toemail'];
        $subject = $_REQUEST['data']['subject']; // $fromWebsite;
        $htmlContent = $_REQUEST['data']['htmlcontent'];
        $chk = true;

      }

}

if($chk){

  //Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  /* Open the try/catch block. */
  try {
     /* Set the mail sender. */
     $mail->setFrom($fromEmail, $fromName);

     /* Add a recipient. */
     $mail->addAddress( $toEmail, 'Email test participant');

     $mail->isHTML(true);

     /* Set the subject. */
     $mail->Subject = $subject;

     /* Set the mail message body. */
     $mail->Body = $htmlContent;

     /* Finally send the mail. */
     //$mail->send();
  	 if (!$mail->send()) {
  	     //echo 'Mailer Error: ' . $mail->ErrorInfo;
      $result['status'] = 'failed';
      $result['msg'] = 'Error: '. $mail->ErrorInfo;
  	 } else {
       $result['status'] = 'failed';
       $result['msg'] = 'Message sent to '.$toEmail.'!';
  	 }
  }
  catch (Exception $e)
  {
     /* PHPMailer exception. */
     //echo $e->errorMessage();
     $result['status'] = 'failed';
     $result['msg'] = 'Error: '. $e->errorMessage();
  }

}else{
  $this->result['status'] = 'failed';
  $this->result['msg'] = 'Error: Not enough or incorrect data to send an email.';
}

header('Content-Type: application/json');
print json_encode($result);

/*
$sendEmail = new sendHTMLEmail;

class sendHTMLEmail{

    private $fromName;
    private $fromEmail;
    private $toEmail;
    private $subject;
    private $htmlcontent;

    public $result = array();

    public  function __construct(){

      // check request action
      $chk = false;

      if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'send' ){

            if(  isset($_REQUEST['data']['fromname'])
              && isset($_REQUEST['data']['fromemail'])
              && isset($_REQUEST['data']['toemail'])
              && isset($_REQUEST['data']['subject'])
              && isset($_REQUEST['data']['htmlcontent'])

            ){

              $this->fromName = $_REQUEST['data']['fromname'];
              $this->fromEmail = $_REQUEST['data']['fromemail'];
              $this->toEmail = $_REQUEST['data']['toemail'];
              $this->subject = $_REQUEST['data']['subject']; // $fromWebsite;
              $this->htmlContent = $_REQUEST['data']['htmlcontent'];
              $chk = true;

            }



      }

      if($chk){
         //echo 'Mailer Error: ' . $mail->ErrorInfo;
         $this->sendThisEmail();
      } else {
        $this->result['status'] = 'failed';
        $this->result['msg'] = 'Error: Not enough or incorrect data to send an email.';
        $this->endResponse();
      }

    }

    private function sendThisEmail(){

      //Create a new PHPMailer instance
      $mail = new PHPMailer(true);

      // Open the try/catch block.
      try {
         // Set the mail sender.
         $mail->setFrom($this->fromEmail, $this->fromName);
         $mail->addReplyTo($this->fromEmail, $this->fromName);

         // Add a recipient.
         $mail->addAddress($this->toEmail, 'Emperor');

         $mail->isHTML(true);

         // Set the subject.
         $mail->Subject = $this->subject;

         // Set the mail message body.
         $mail->Body = $this->htmlContent;

         // attachtment
         //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');

         // Finally send the mail.
         //$mail->send();
         if (!$mail->send()) {
      	   //echo 'Mailer Error: ' . $mail->ErrorInfo;
           $this->result['status'] = 'failed';
           $this->result['msg'] = 'Error: '. $mail->ErrorInfo;
      	 } else {
           $this->result['status'] = 'succes';
           $this->result['msg'] = 'De email is verstuurd aan '.$this->toEmail;
      	 }

         // output json response
         $this->endResponse();

      }
      catch (Exception $e)
      {
         // PHPMailer exception.
         echo $e->errorMessage();
      }

    }

    private function endRespsone(){

      // output json response
      header('Content-Type: application/json');
      print json_encode($this->result);

    }


}

*/




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
