<?php
$url = $_GET['url'];

$fp = fopen($url, "r");

$result = "";
while ($str = fread($fp,1024)) {
    $result .= $str;
}
fclose($fp);
echo $result;