<?php require("admin/components/classes/rwdata.php");

$magic = new rwdata(); // get rwdata encrypt class
$udata = $magic->decryptstring( $_GET['s'] ); // decrypt and decode

$filename = 'datalist.json';
$data = file_get_contents( 'admin/components/data/' . $filename );
$json = $magic->decryptstring( $data );
$list = json_decode( $json, true );
$activesurvey = json_decode( $udata, true );
$surveydata = $list[$activesurvey['sid']];

//print_r($list[$activesurvey['sid']]);
