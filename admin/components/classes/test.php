<?php

require_once('rwdata.php');
$source = new rwdata;
$filename = 'config.json';
$datalist = array();

$arr = $source->dataFromFile( $filename );


if( is_array($arr) && isset($arr['fields']) ){
    $datalist = $arr;

    $chk = 0;
    $msg = '';
    foreach($datalist as $key => $val){
      if( $key != 'fields'){
        foreach($datalist[$key] as $f => $c ){
          if( $f == 'admin_name' && $c == $_REQUEST['name']){
            if( $datalist[$key]['admin_pass'] == $_REQUEST['pass']){
              $chk = 1;
              $msg = 'Login!';
              $_SESSION['adminname'] = $_REQUEST['name'];
              break;
            }else{
              $msg = 'Password does not match';
              break;
            }
          }else{
            $msg = 'Name does not match';
          }
        }
      }
    }
    $arr = ['chk' => $chk, 'msg' => $msg];
    //$this->result['chk'] = $chk;
    //$this->result['msg'] = $msg;

}
//print json_encode($arr);

/*
$sUrl = 'config.php';
$params = array('http' => array(
    'method'  => 'POST',
    'content' => 'name=admin&pass=admin&action=login'
));

$ctx = stream_context_create($params);
$fp = @fopen($sUrl, 'rb', false, $ctx);
if(!$fp) {
    throw new Exception("Problem with $sUrl, $php_errormsg");
}

$response = @stream_get_contents($fp);
if($response === false) {
    throw new Exception("Problem reading data from $sUrl, $php_errormsg");
}
 */
/*
$postdata = array(
    'name' => 'admin',
    'pass' => 'admin',
    'action' => 'login'
);

$opts = array('http' =>
    array(
        'method' => 'POST',
        'header' => 'Content-type: application/json',
        'content' => $postdata
    )
);

$context = stream_context_create($opts);
$result = file_get_contents('config.php', false, $context);
*/






/*
function httpPost($url, $data){
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    echo $response;
}

$result = httpPost('config.php', $postdata);
*/

//header('Content-Type: application/json');
//header('Content-Type: application/json; charset=utf-8');
//print json_encode($result);
//print_r(json_encode($this->datalist[$key]))


/*

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

*/
