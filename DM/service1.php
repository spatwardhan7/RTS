<?php

		$start_date = $_GET['start'];
		$end_date = $_GET['end'];
		$jemin = json_decode(file_get_contents("http://bruiser3.cc.gatech.edu:8080/grait-dm/feed_usgs_m25_week.php?start=$start_date&end=$end_date"),
	                TRUE);
					
		echo json_encode($jemin);
		return $jemin;

?>