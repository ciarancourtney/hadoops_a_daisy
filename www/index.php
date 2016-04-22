<?php
If ($_POST["pig"])
{
	$execType = "pig";
}
If ($_POST["spark"])
{
	$execType = "spark";
}
switch ($execType) {
        case "pig":
        $pigOutput = shell_exec("../bin/run_csv2json_noaa_snow.sh 2>&1");
        $myfile = file_put_contents('pigOutput.txt', $pigOutput.PHP_EOL);
        $userOutput = "PIG Executed... Please wait 6min, refresh and check \"PIG Output\" tab for further details..." ;
        break;

        case "spark":
        $sparkOutput = shell_exec("../bin/run_spark.sh 2>&1");
        file_put_contents('sparkOutput.txt', $sparkOutput.PHP_EOL);
        $userOutput = "SPARK Executed... See \"SPARK Output\" tab for further details...";
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
	<script type="text/javascript" src="src/js/tm2.js"></script>

    <link type="text/css" href="src/css/examples.css" rel="stylesheet"/>
</head>
<body>

<!--
<?php
	ECHO $execType;
?>
-->

<div class="container">
  <h2>Top Locations For Snowfall Based On NOAA Data For Last 10 Years</h2>
  <br />
  <h3>Run PIG followed by SPARK to update data...</h3>
  <form action="index.php" method="post">   
	<input type="submit" name="pig" value ="PIG">
	<br />
	<input type="submit" name="spark" value ="SPARK">		
	<br />
	</form>

<?php
        ECHO $userOutput;
?>

<br />
  
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#snowFallTimeLineMap">Snowfall Timeline & Map</a></li>
    <li><a data-toggle="tab" href="#outputPig">PIG Output</a></li>
	<li><a data-toggle="tab" href="#outputSpark">Spark Output</a></li>
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
    <div id="outputPig" class="tab-pane fade">
		<?php		
			$pigFile = fopen("pigOutput.txt", "r");
			$pigText = fread($pigFile, filesize("pigOutput.txt"));
			fclose($pigFile);
			ECHO nl2br($pigText);				
		?>
    </div>
	<div id="outputSpark" class="tab-pane fade">
		<?php		
			$sparkFile = fopen("sparkOutput.txt", "r");
			$sparkText = fread($sparkFile, filesize("sparkOutput.txt"));
			fclose($sparkFile);
			ECHO nl2br($sparkText);			
		?>
    </div>
  </div>
</div>

</body>
</html>
