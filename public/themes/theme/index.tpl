<!DOCTYPE html>
<html lang="en">
<head>
<!-- HTML meta -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="icon" type="image/x-icon" href="/images/favicon.ico">
<!-- HTML doc title -->
<title>{title}</title>

<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;800&display=swap" rel="stylesheet">

{htmlhead}
</head>
<body>

  <div id="pagecontainer">
    <div id="headcontainer">
        <div class="outermargin">
          <div id="headcontent">
            {header}
            <div id="themetoggle" onclick="toggleDarkLightTheme();">
            		<div class="slider">
            			<div class="nob"></div>
            		</div>
            </div>
          </div>
        </div>
      </div>

    <div id="contentcontainer">
      <div class="outermargin">

        <div class="content-title"><h2>{title}</h2></div>

        <div id="maincontent">
          <!-- main content -->
          {content}
        </div>

      </div>
    </div>
    <div id="footcontainer">
      <div class="outermargin">
        <div id="footcontent">
          {footer}
        </div>
      </div>
    </div>
  </div>
</body>
{htmlfoot}
</html>
