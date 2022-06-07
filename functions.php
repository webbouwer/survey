<?php

// find current file folder
function get_current_file_url($Protocol='http://') {
   return $Protocol.$_SERVER['HTTP_HOST'].str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath(__DIR__));
}
$thislink = get_current_file_url($Protocol='https://');

function encrypt($key, $payload) {
    // php mcrypt_encrypt alternative:
      $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
      $encrypted = openssl_encrypt($payload, 'aes-256-cbc', $key, 0, $iv);
      return base64_encode($encrypted . '::' . $iv);
}
function decrypt($key, $garble) {
    // php mcrypt_decrypt alternative:
    list($encrypted_data, $iv) = explode('::', base64_decode($garble), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
}

function getSurveyFileList(){
  // get all survey (library) files
  $arrFiles = glob('lib/*.json'); // ( [0] => lib/list1.json [1] => lib/list2.json ) etc.
  $lst = [];
  // print_r($arrFiles);
  while (list($key, $file) = each($arrFiles)) {
    $json = file_get_contents($file); // $file = 'lib/list'.$_POST['sr'].'.json';
    $json_data = json_decode($json,true);
    $key++;
    $lst[$key] = [];
    $lst[$key]['file'] = $file;
    $lst[$key]['json'] = $json_data;
  }
  return  $lst;
}

function makeSurveySelectBox(){
  $lib = getSurveyFileList();
  $html = '<select id="sr" name="sr">'.'<option value="0" selected="selected">'._SELECTSURVEY.'</option>';
    while (list($key, $var) = each($lib)) {
      $html .= '<option value="'.$key.'">'.$var['json']['title'].' ('.$var['json']['lang'].')</option>';
    }
  $html .= '</select>';
  echo $html;
}
