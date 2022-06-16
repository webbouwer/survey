<?php require_once('components/classes/login.php');

require("components/classes/template.php");
$template = new Template();
$template->file("components/themes/theme/admin.tpl"); // route

$htmlhead = '<link rel="stylesheet" href="components/themes/theme/css/style.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'
.'<script src="components/js/content.js"></script>'
.'<script src="components/js/datalist.js"></script>'
.'<script src="components/js/email.js"></script>'
.'<script src="components/js/validate.js"></script>'
.'<script src="components/js/config.js"></script>';

$adminbar = '<div id="adminbar"></div>';

$htmlfoot = '';

$template->assign("title", "Admin example Title");

$template->assign("htmlhead", $htmlhead );

$template->assign("adminbar", $adminbar );


$template->assign("header", "<div>Admin theme header</div>");
$template->assign("content", "Admin theme content");
$template->assign("footer", "Admin theme footer");

$template->assign("htmlfoot", $htmlfoot );
$template->render();
