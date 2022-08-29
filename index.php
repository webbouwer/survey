<?php // public survey page
if( isset($_GET['s']) ){
  require("admin/components/classes/survey.php");
}

if( $activesurvey['pn'] ){

  $content = 'Hi '. $activesurvey['pn'];
  $content .= 'Survey title: '. $surveydata['title'];

  $script = '';//'<script>alert( JSON.stringify( '.json_encode($activesurvey).') );</script>';

}else{

  $content = "No survey available at this moment.";

}

require("admin/components/classes/template.php");
$template = new Template();
$template->file("public/themes/theme/index.tpl"); // route

$htmlhead = '<link rel="stylesheet" href="public/themes/theme/css/style.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'
.'<script src="public/themes/theme/js/style.js"></script>'
.'<script src="public/themes/theme/js/survey.js"></script>'
.$script;

$htmlfoot = '';


$template->assign("title", "Theme frontend title");
$template->assign("header", '<div id="logotitle">Theme Frontend header</div>');
$template->assign("htmlhead", $htmlhead);


$template->assign("content", $content );
$template->assign("footer", "Theme footer");
$template->assign("htmlfoot", $htmlfoot );
$template->render();
