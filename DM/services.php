<?php

		$jemin = json_decode(file_get_contents
	                ("http://bruiser3.cc.gatech.edu:8080/grait-dm/feed_usgs_m25_week.php"),
	                TRUE);
		echo json_encode($jemin);
		return $jemin;

?>