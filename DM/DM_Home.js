<!--<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>-->


$(document).ready(function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	document.body.appendChild(script);	
});

function getCircle(magnitude, color) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: .3,
    scale: Math.pow(2, magnitude) / Math.PI,
    strokeColor: 'white',
    strokeWeight: .5
  };
}

function displayOptions()
{
	$('#menuButtons').hide();
	$('#map_canvas').hide();
	$('#selectButtons').show();
}

function addDate(id,value,text) {
  var div = document.createElement("div");
  div.className = "divSelectionItem";

  var input = document.createElement("input");
  input.type = "text";
  input.id = id;
  input.value = value;
  input.size = "15";

  var label = document.createElement("label");
  var txt = document.createTextNode(text);
  label.appendChild(txt);

  div.appendChild(label);
  div.appendChild(input);

  document.getElementById("inside_selectDisasters").appendChild(div);
}


function initialize_date()
{
	var end = new Date();
	var start = new Date(end);
	start.setDate(start.getDate() - 7);
	addDate("start",date2string(start),"Start:");
	addDate("end",date2string(end),"End:");

}

function displayDisasterType()
{
	$('#selectButtons').hide();
	$('#selectDisasters').show();
	initialize_date();
}


function date2string(date) {
  var str = date.toISOString();
  return str.substring(0,10)+" "+str.substring(11,19);
}

function displayDisasterMap()
{
	var mapOptions = 
	{
    	center: new google.maps.LatLng(0,0),
    	zoom: 1,
    	mapTypeId: google.maps.MapTypeId.TERRAIN
    };
        
    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
	
	if($('#checkbox1').prop('checked'))
	{
	$.ajax({
		url: "service1.php?start=2013-10-18&end=2013-10-22",
		context: document.body,
		dataType: "json",
		success: function(data){
			startMap(data,map,checkbox1);
	}});
	}
	
	if($('#checkbox2').prop('checked'))
	{
	$.ajax({
		url: "service2.php",
		context: document.body,
		dataType: "json",
		success: function(data){
			startMap(data,map,checkbox2);
	}});
	}
	
	if($('#checkbox3').prop('checked'))
	{
	$.ajax({
		url: "service3.php?start=2013-10-18&end=2013-10-22",
		context: document.body,
		dataType: "json",
		success: function(data){
			startMap(data,map,checkbox3);
	}});
	}
	
	if($('#checkbox4').prop('checked'))
	{
		//create rectangle object
		var rectangle;
		var bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(12.724844669480543, -126.46150200000017),
			new google.maps.LatLng(48.82979438855813, -68.33362700000004)
		  );

		  rectangle = new google.maps.Rectangle({
			bounds: bounds,
			draggable: true,
			editable: true
		  });
		  rectangle.setMap(map);
	}
		if($('#checkbox1').prop('checked') || $('#checkbox2').prop('checked') || $('#checkbox3').prop('checked'))
		{
		$('#menuButtons').hide();
		$('#selectDisasters').hide();
	    $('#map_canvas').show();
		}
}

function startMap(data,map,checkbox_type)
{	
    
   	var jsondata = data;
   				   
    for (var i = 0; i < jsondata.features.length; i++)
    {

		var mag = jsondata.features[i].properties.mag;
		
		var coords = jsondata.features[i].geometry.coordinates;
        var latlng = new google.maps.LatLng(coords[0], coords[1]);

	   	
		var color;									
		if (checkbox_type == checkbox1)
		{
			color = "black";
		}
		
		if (checkbox_type == checkbox2)
		{
			color = "blue";
		}
		
		if (checkbox_type == checkbox3)
		{
			color = "red";
		}
		var marker = new google.maps.Marker({
			position: latlng, 
			map: map, 
			title: 'blank',					
			icon: getCircle(mag, color)
		});
	}

}
