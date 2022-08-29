<?php require("admin/components/classes/rwdata.php");
$magic = new rwdata(); // get rwdata encrypt class
$udata = $magic->decryptstring( $_GET['s'] ); // decrypt and decode
$activesurvey = json_decode( $udata, true );
