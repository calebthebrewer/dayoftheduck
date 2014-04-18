<?php
$url = $_GET['url'];

$ch = curl_init();

// set options
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);

curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);