<?php require_once('components/classes/login.php');

require("components/classes/template.php");
require("adminbar.php");

$template = new Template();
$template->file("components/themes/theme/admin.tpl"); // route

$htmlhead = '<link rel="stylesheet" href="components/themes/theme/css/style.css" type="text/css" media="all" />'
.'<link rel="stylesheet" href="components/themes/theme/css/tables.css" type="text/css" media="all" />'
.'<link rel="stylesheet" href="components/themes/theme/css/fields.css" type="text/css" media="all" />'
.'<link rel="stylesheet" href="components/themes/theme/css/forms.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>'
.'<script src="components/themes/theme/js/style.js"></script>'
.'<script src="components/js/content.js"></script>'
.'<script src="components/js/config.js"></script>';

$adminbar = '<div id="adminbar">'.getAdminbar().'</div>';

$htmlfoot = '';


$template->assign("htmlhead", $htmlhead );

$template->assign("adminbar", $adminbar );

$template->assign("header", '<div id="logotitle">Theme Admin header</div>');

$template->assign("title", "Admin configurations");
$template->assign("intro", "Profiel en login beheer");

$template->assign("content", "Admin theme content");
$template->assign("footer", "Admin theme footer");

$template->assign("htmlfoot", $htmlfoot );
$template->render();
