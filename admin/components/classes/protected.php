<?php session_start();
if( !isset( $_SESSION['adminname'] ) && !isset($_POST['name']) ) exit;

$pos = strpos($_SERVER['HTTP_REFERER'],getenv('HTTP_HOST'));
if($pos===false)
die('Restricted access');
