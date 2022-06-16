<?php
require("admin/components/classes/template.php");

$template = new Template();

$template->file("public/theme/index.tpl"); // route
$htmlhead = '<link rel="stylesheet" href="public/theme/css/style.css" type="text/css" media="all" />'
.'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>';
$htmlfoot = '';

$template->assign("title", "Theme frontend title");
$template->assign("header", "Theme frontend header");
$template->assign("htmlhead", $htmlhead);
$template->assign("content", "Public content setup" );
$template->assign("footer", "Theme footer");
$template->assign("htmlfoot", $htmlfoot );
$template->render();
