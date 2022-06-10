<?php include('classes/login.php'); ?>
<!DOCTYPE html>
<html>
<head>

<!-- HTML meta -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- HTML doc title -->
<title>Survey admin</title>

<link rel='stylesheet' href='css/style.css' type='text/css' media='all' />

<!-- jQuery
https://releases.jquery.com/
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ? https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js
-->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Survey -->

<script src="../util/js/pagelayers.js"></script>
<script src="js/configdata.js"></script>
<script src="js/surveydata.js"></script>
<script src="js/emaildata.js"></script>
<script src="js/emailvalidate.js"></script>
<script src="js/adminview.js"></script>

</head>
<body>

  <div id="pagecontainer">

    <div id="headcontainer"><div class="outermargin">Survey header</div></div>

    <div id="contentcontainer">
      <div id="actionmenu" class="outermargin"></div>
      <div id="actionbox" class="outermargin"></div>
    </div>

    <div id="footcontainer"><div class="outermargin">Survey Footer</div></div>

  </div>
</body>
</html>
