<!DOCTYPE html>
<html>
<head>

<!-- HTML meta -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- HTML doc title -->
<title>data rw</title>
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!-- <link rel="stylesheet" href="swiper.css" /> -->
<!-- Custom HTML elements -->

<script src="js/configdata.js"></script>

<script>
jQuery(function($){

    const actionmenu = $('#actionmenu');
    const actionbox = $('#actionbox');

    getConfigData( actionbox );


});
</script>

</head>
<body>

    <div id="pagecontainer">

      <div id="headcontainer">Survey header</div>

      <div id="contentcontainer">
        <div id="actionmenu"></div>
        <div id="actionbox"></div>
      </div>

      <div id="footcontainer">Survey footer</div>

    </div>
    
</body>
</html>
