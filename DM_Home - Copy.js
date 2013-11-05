<!--<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>-->


$(document).ready(function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://maps.google.com/maps/api/js?key=AIzaSyC92fdUb1bjJUNn5DqujGNriCsO6V0cTvA&sensor=true";
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
	$('#menuButtons').hide();
	$('#selectDisasters').hide();
	//alert("Starting Map");
	startMap();
	alert("Start Map returned");
}

function startMap()
{	
	//alert("Inside Start Map");
	var mapOptions = 
	{
    	center: new google.maps.LatLng(-34.397, 150.644),
    	zoom: 8,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        
    //alert("after mapoptions __>" +  mapOptions);

    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);

    alert("after var map");
    //google.maps.event.addDomListener(window, 'load', initialize);
    $('#map_canvas').show();
}