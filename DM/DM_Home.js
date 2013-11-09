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
	populatedropdown("daydropdown","monthdropdown","yeardropdown","daydropdown_start","monthdropdown_start","yeardropdown_start");
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
	    $('#backButton').show();
		}
}

var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function populatedropdown(dayfield, monthfield, yearfield, dayfield_start, monthfield_start, yearfield_start)
{
	var today=new Date();
	
	
	var dayfield=document.getElementById(dayfield);
	var monthfield=document.getElementById(monthfield);
	var yearfield=document.getElementById(yearfield);
	
	console.log(dayfield);
	console.log(monthfield);
	console.log(yearfield);
	
	for (var i=0; i<31; i++)
		dayfield.options[i]=new Option(i, i+1);

	dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true); //select today's day
	
	for (var m=0; m<12; m++)
		monthfield.options[m]=new Option(monthtext[m], monthtext[m]);
	
	monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true); //select today's month

	var thisyear=today.getFullYear();
	for (var y=0; y<20; y++)
	{
		yearfield.options[y]=new Option(thisyear, thisyear);
		thisyear+=1;
	}
	yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year


/*-----Start Date Populate-----*/

	var dayfield_start = document.getElementById(dayfield_start);
	var monthfield_start=document.getElementById(monthfield_start);
	var yearfield_start=document.getElementById(yearfield_start);

	console.log(dayfield_start);
	console.log(monthfield_start);
	console.log(yearfield_start);


	for (var i=0; i<31; i++)
		dayfield_start.options[i]=new Option(i, i+1);

	dayfield_start.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true); //select today's day
	
	for (var m=0; m<12; m++)
		monthfield_start.options[m]=new Option(monthtext[m], monthtext[m]);
	
	monthfield_start.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true); //select today's month

	var thisyear=today.getFullYear();
	for (var y=0; y<20; y++)
	{
		yearfield_start.options[y]=new Option(thisyear, thisyear);
		thisyear+=1;
	}
	yearfield_start.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year
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
function backToOptions()
{
	    $('#backButton').hide();
	    $('#selectDisasters').show();
	    $('#map_canvas').hide();

}
