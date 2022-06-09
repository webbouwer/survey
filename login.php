<?php session_start(); ?>
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
