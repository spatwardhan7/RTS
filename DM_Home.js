<!--<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>-->


$(document).ready(function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	document.body.appendChild(script);	
});

function displayOptions()
{
	$('#menuButtons').hide();
	$('#selectButtons').show();
}

function displayDisasterType()
{
	$('#selectButtons').hide();
	$('#selectDisasters').show();
}

function displayDisasterMap()
{
	/*
$.getJSON( "http://bruiser3.cc.gatech.edu:8080/grait%C2%ADdm/feed_usgs_m25_week.php")
    .done(function( data ) {
      	console.log(data);
           });

*/
	
	$.ajax
	({
		url: "http://bruiser3.cc.gatech.edu:8080/grait%C2%ADdm/feed_usgs_m25_week.php",
		context: document.body,
		dataType: "json",
		success: function(data)
		{	
	
			alert("inside success");
			$('#menuButtons').hide();
			$('#selectDisasters').hide();
			startMap();
		}
	});

}

function startMap()
{	
	var mapOptions = 
	{
    	center: new google.maps.LatLng(-34.397, 150.644),
    	zoom: 8,
    	mapTypeId: google.maps.MapTypeId.TERRAIN
    };
        
    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    alert("after var map");
    $('#map_canvas').show();
}

//google.maps.event.addDomListener(window,'load',startMap);