<?php
include('config.php');
$timezone = date_default_timezone_set('Europe/Amsterdam');
$date = date('Y-m-d', time());
$send = false; // check befor sending

if( isset($_POST['sid']) && isset($_POST['sr']) ){

  // .. validate emailaddress etc.
  $udata = array(
    "sid" => $_POST['sid'],
    "sr" => $_POST['sr'],
    "pn" => $_POST['pn'],
    "pe" => $_POST['pe'],
    "ed" => $date,
  );
  $sdata = urlencode( encrypt($key, json_encode( $udata ) ) );
  $expiredate = date('Y-m-d', strtotime('+7 days', strtotime($date)));

  $lib = getSurveyFileList();
  $json_data = $lib[$_POST['sr']]['json'];
  //$file = 'lib/list'.$_POST['sr'].'.json';
  //$json = file_get_contents($file);
  //$json_data = json_decode($json,true);
  //print_r( $json_data );
  // ..
  $send = true;   // send first email with survey nr - first question
}
?>

<?php
if($send){

  $subject = _SUBJECT_SURVEYEMAIL .' '._FROM.' '.$fromName .' '._AT.' '.$_SERVER['HTTP_HOST'];  // $fromWebsite;

  $answers = '';
  if( isset( $json_data['questions'][0]['answers'] ) ){
    while(list($key, $val) = each($json_data['questions'][0]['answers'])){
      $answers .= '<a href="'.$thislink. '/survey.php?qa='.$key.'&s='.$sdata.'">'.$val.'</a>';
    }
  }

  $htmlContent = '
    <div style="background-color:#dedede;">
      <h2>'.$json_data['title'].'</h2>

      <!-- header html -->
      <p>'._DEAR.' '.$_POST['pn'].',</p>

      <!-- body html -->

      <div>'._EXPIRESON.' '.$expiredate.'</div>

      <div>'.$json_data['questions'][0]['question'].'</div>
      <div>'.$answers.'</div>

      <!-- footer html -->
    </div>
  ';

  // set content-type headers
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From:'.$fromName.' <'.$formEmail.'>' . "\r\n";
  // Send email
  $retval = mail ($_POST['pe'],$subject,$htmlContent,$headers);


  $result = array();
  if( $retval == true ) {
    $result['status'] = 'success';
    $result['msg'] = _MSG_SURVEYSEND;
  }else{
    $result['status'] = 'failed';
    $result['msg'] = _MSG_ERROR.' '. $retval;
  }

  // confirm mail
  if( $retval == true ) {

    $subject2 = _SUBJECT_SURVEYCONFIRMEMAIL.' '._FROM.' '.$fromName .' '._AT.' '.$_SERVER['HTTP_HOST']; // $fromWebsite;
    $htmlContent2 = '<div>'._SURVEYLIST.' '.$_POST['sr'].' '._ISSENDTO.' '.$_POST['pn'].' - '.$_POST['pe'].'.</div>'.
      '<div>'._SURVEYEXPIRESON.' '.$expiredate.'</div>';

    // set content-type headers
    $headers2 = "MIME-Version: 1.0" . "\r\n";
    $headers2 .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers2 .= 'From:'.$fromName.' <'.$formEmail.'>' . "\r\n";
    // Send email
    $retval2 = mail ($formEmail,$subject2,$htmlContent2,$headers2);

    if( $retval2 == true ) {
      $result['status2'] = 'success';
      $result['msg2'] = _MSG_SURVEYCONFIRMSEND;
    }else{
      $result['status2'] = 'failed';
      $result['msg2'] = _MSG_ERROR.' '. $retval2;
    }

    // conclude
    echo '<p>'._MSG_SENDINGSURVEYEMAIL.' '.$result['status'].'</p>';
    echo $result['msg'];
    echo '<p>'._MSG_SENDINGSURVEYCONFIRMEMAIL.' '.$result['status2'].'</p>';
    echo $result['msg2'];
    echo '<p><a href="index.php">'._BACK.'</a></p>';

  }else{
    echo '<p>'._MSG_SENDINGFAILED.'</p>';
    echo '<p><a href="index.php">'._BACK.'</a></p>';
  }
  // output json response
  //header('Content-Type: application/json');
  //print json_encode($result);


}else{

  echo '<p>'._MSG_SOMETHINGWRONG.'</p>';
  echo '<p><a href="index.php">'._BACK.'</a></p>';

}

?>
