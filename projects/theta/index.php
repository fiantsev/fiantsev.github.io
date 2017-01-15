<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once "Server_Scripts/Mobile_Detect.php";
//echo "Redirect...";
/*
$theDetector = new Mobile_Detect();
if($theDetector->isMobile() || $theDetector->isTablet())
{
	header("Location: index_mobile.html",TRUE,307);
}
else
{
	header("Location: index_desktop.html",TRUE,307);
}
*/
header("Location: index_desktop.html",TRUE,307);