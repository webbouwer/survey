<?php require_once('index.php');

$sendEmail = new sendHTMLEmail;

class sendHTMLEmail{

  private $fromName;
  private $fromEmail;
  private $toEmail;
  private $subject;
  private $htmlcontent;

  public $result = array();

  public  function __construct(){

    // set default variables
    /*
    $this->fromName = 'Webbouwer';
    $this->fromEmail = 'support@webdesigndenhaag.net';

    $this->toEmail = 'project@oddsized.org';
    $this->subject = 'Basic email test v2'; // $fromWebsite;
    $this->htmlContent = '<div><h1>HTML</h1><p>content message</p></div>';
    */

    // check request action
    $chk = false;
    if( isset($_REQUEST['action']) ){

      // prepare data
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

    }

    if($chk){

      $this->sendThisEmail();

    }else{

      $this->result['status'] = 'failed';
      $this->result['msg'] =  'Error: Not enough or incorrect data to send an email.';
      $this->endResponse();

    }

  }

  private function sendThisEmail(){

    // set content-type headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From:'.$this->fromName.' <'.$this->fromEmail.'>' . "\r\n";
    // Send email
    $retval = mail ($this->toEmail,$this->subject,$this->htmlContent,$headers);

    if( $retval == true ) {
      $this->result['status'] = 'success';
      $this->result['msg'] = 'De email is verstuurd aan '.$this->toEmail;
    }else{
      $this->result['status'] = 'failed';
      $this->result['msg'] =  'Error: '. $retval;
    }

    // output json response
    $this->endResponse();

  }

  private function endResponse(){

    // output json response
    header('Content-Type: application/json');
    print json_encode($this->result);

  }

}
