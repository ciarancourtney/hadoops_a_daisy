<?php
$execType = $_POST["ExecutionType"];
switch ($execType) {
        case "pig":
        $technicalOutput = shell_exec("../bin/run_csv2json_noaa_snow.sh 2>&1");
        $userOutput = "Executed via PIG...";
        break;

        case "spark":
        $technicalOutput = shell_exec("../bin/run_spark.sh 2>&1");
        $userOutput = "Executed via SPARK...";
        break;
}
?>

<html lang="en">
<head>
	<title>Show Me The Snow: Codename - Hadoops_A_Daisy</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  
	<script src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAASI0kCI-azC8RgbOZzWc3VRRarOQe_TKf_51Omf6UUSOFm7EABRRhO0PO4nBAO9FCmVDuowVwROLo3w" type="text/javascript"></script>
    <script type="text/javascript" src="lib/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="lib/mxn/mxn.js?(google)"></script>
    <script type="text/javascript" src="lib/timeline-1.2.js"></script>
    <script type="text/javascript" src="lib/timemap_full.pack.js"></script>

<?php
//Add reference to js file for pig/spark
switch ($execType) {
		case "pig":
        ECHO "<script type="text/javascript" src="src/js/tm.js"></script>";
        break;
        case "spark":
        ECHO "<script type="text/javascript" src="src/js/tm2.js"></script>";	
        break;
		default:
		ECHO "<script type="text/javascript" src="src/js/tm.js"></script>";
}
?> 
	
    <link type="text/css" href="src/css/examples.css" rel="stylesheet"/>
</head>
<body>

<div class="container">
  <h2>Top Locations For Snowfall Based On NOAA Data For Last 10 Years</h2>
  <br />
  <h3>What technology would you like to execute the filter via?</h3> 
  <form action="index.php" method="post">
		<select name="ExecutionType">
			<option value="pig">PIG</option>
			<option value="spark">SPARK</option>
		</select>
	<br />
	<input type="submit">
	</form>

<?php
        ECHO nl2br($userOutput);
?>
<br />
  
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#snowFallTimeLineMap">Snowfall Timeline & Map</a></li>
    <li><a data-toggle="tab" href="#technicalDetails">Technical Details</a></li>
  </ul>

  <div class="tab-content">
    <div id="snowFallTimeLineMap" class="tab-pane fade in active">
		<h4>Drag the timeline to see the map dynamically update...</h4>
		<div id="timelinecontainer">
			<div id="timeline"></div>
		</div>
		<br />
		<div id="mapcontainer">
			<div id="map"></div>
		</div>
    </div>
    <div id="technicalDetails" class="tab-pane fade">
		<?php
			ECHO "Not recommended practice, but useful for debugging issues in test...";
			ECHO $technicalOutput;
		?>
    </div>
  </div>
</div>

</body>
</html>
