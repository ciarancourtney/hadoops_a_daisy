<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Timemap WIP</title>
    <script src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAASI0kCI-azC8RgbOZzWc3VRRarOQe_TKf_51Omf6UUSOFm7EABRRhO0PO4nBAO9FCmVDuowVwROLo3w"
            type="text/javascript"></script>
    <script type="text/javascript" src="lib/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="lib/mxn/mxn.js?(google)"></script>
    <script type="text/javascript" src="lib/timeline-1.2.js"></script>
    <script type="text/javascript" src="lib/timemap_full.pack.js"></script>
    <script type="text/javascript" src="src/js/tm.js"></script>
    <link type="text/css" href="src/css/examples.css" rel="stylesheet"/>
</head>


<body>

How would you like to execute the filter?<br />

<form action="index.php" method="post">
<select name="ExecutionType">
  <option value="pig">PIG</option>
  <option value="spark">SPARK</option>
</select>
<br />
<input type="submit">
</form>


<?php
$execType = $_POST["ExecutionType"];
switch ($execType) {
	case "pig":
	$output = shell_exec("../bin/run_csv2json.sh 2>&1");
	$commentOutput = $output;
	$visibleOutput = "Executed via PIG...";
	break;

	case "spark":
	$commentOuptput = "";
	$visibleOutput = "SPARK not yet implmemented...";
	break;
}
?>

<br />

<!--
<?php
	ECHO "Not recommended practice, but useful for debugging issues in test...";
	ECHO $commentOutput;
?>
-->

<?php
	ECHO $visibleOutput;
?>
<br />

<div id="timemap">
    <div id="timelinecontainer">
        <div id="timeline"></div>
    </div>
    <div id="mapcontainer">
        <div id="map"></div>
    </div>
</div>





</body>
