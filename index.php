<?php if( isset($_GET['s']) ){
  require("admin/components/classes/survey.php");
}
require("admin/components/classes/template.php");

$template = new Template();

$template->file("public/themes/theme/index.tpl"); // route

$htmlhead = '<link rel="stylesheet" href="public/themes/theme/css/style.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'
.'<script src="public/themes/theme/js/style.js"></script>';

$htmlhead .= '<script src="components/js/content.js"></script>'
.'<script src="components/js/survey.js"></script>'
.'<script src="components/js/email.js"></script>'
.'<script src="components/js/validate.js"></script>';

$htmlfoot = '';


$template->assign("title", "Theme frontend title");
$template->assign("header", '<div id="logotitle">Theme Frontend header</div>');
$template->assign("htmlhead", $htmlhead);

$template->assign("content", "Public content setup" );
$template->assign("footer", "Theme footer");
$template->assign("htmlfoot", $htmlfoot );
$template->render();
