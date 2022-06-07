<?php
include('tokens.php'); // key
include('functions.php'); //


// Survey prepare email sender
$lang = 'nl'; //en
$fromName  = "Webbouwer";
$formEmail = "support@webdesigndenhaag.net";
$fromWebsite = "webdesigndenhaag.net";


// language
if( !isset($lang) ){
  $lang = 'en';
}
include('language/lang_'.$lang.'.php'); //


/*
0. secure access with wordpress
1. create email with first question incl. encrypted link data (id, name, email, firstanswer)
2. send email from survey mailaddress to participant mailaddress
3. participant click on answer link to full survey form with first question anwser
4. validate form, encrypt data, send data to survey mailaddress
5. send data to participant mailaddress
*/
