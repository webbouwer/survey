<?php session_start();
require("admin/components/classes/template.php");

$template = new Template();
$template->file("public/themes/theme/index.tpl"); // route

$htmlhead = '<link rel="stylesheet" href="public/themes/theme/css/style.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'
.'<script src="public/themes/theme/js/style.js"></script>';
//.'<script src="admin/components/js/login.js"></script>';


function htmlLoginbox(){

  $loginbox = '<div id="loginbox"><div class="content-title"><h3>login here</h3></div>
  <form action="admin/index.php" method="post">
  <div class="formrow">
      <label class="formfield"><span>Username: </span><input id="name" name="name" type="text" placeholder="Admin name">
      </label>
    </div>
    <div class="formrow">
      <label class="formfield"><span>Password: </span><input id="pass" name="pass" type="password" placeholder="Password">
      </label>
    </div>
    <div class="formend">
      <input id="action" name="action" type="hidden" value="login" />
      <div class="formfield"><span> </span><input id="go" name="go" type="submit" value="login" /></div>
    </div>
    </form>';
    if( isset($_GET['msg']) ){
      $loginbox .= '<div class="loginmessage">'.$_GET['msg'].'</div>';
    }

  $loginbox .= '</div>';
  return $loginbox;
}

$loginbox = htmlLoginbox();

$htmlfoot = '';


$template->assign("htmlhead", $htmlhead);

$template->assign("header", "Theme frontend header");

$template->assign("title", "Admin login");
$template->assign("content", $loginbox );
$template->assign("footer", "Theme footer");
$template->assign("htmlfoot", $htmlfoot );

$template->render();

/*
<!DOCTYPE html>
<html>
<head>
<!-- HTML meta -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- HTML doc title -->
<title>Survey admin login</title>

<link rel='stylesheet' href='admin/css/style.css' type='text/css' media='all' />

<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!-- <link rel="stylesheet" href="swiper.css" /> -->
<script>
jQuery(function($){

});
</script>


</head>
<body>


  <div id="pagecontainer">

    <div id="headcontainer"><div class="outermargin">Survey header</div></div>

    <div id="contentcontainer">
      <div id="loginbox" class="outermargin">

        login here
        <form action="admin/index.php" method="post">
          <label class="formfield">
            <input id="name" name="name" type="text" placeholder="Admin name">
          <label>
            <label class="formfield">
              <input id="pass" name="pass" type="password" placeholder="Password">
            <label>
              <input id="go" name="go" type="submit" value="login" />

        </form>

        <?php
          if( isset($_GET['msg']) ){

            echo '<div>'.$_GET['msg'].'</div>';

          }
        ?>

      </div>
    </div>

    <div id="footcontainer"><div class="outermargin">Survey Footer</div></div>

  </div>


</body>
</html>
*/
