
$(document).ready(function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	document.body.appendChild(script);	
});

var rectangle;

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


function displayDisasterType()
{
	populatedropdown("daydropdown","monthdropdown","yeardropdown","daydropdown_start","monthdropdown_start","yeardropdown_start");
	$('#selectButtons').hide();
	$('#selectDisasters').show();
	//$('#checkboxWrapper').css({'text-align': 'center', 'float': 'left'});
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


    var initialLocation;
    var browserSupportFlag =  new Boolean();

    // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) 
  {
   	 	browserSupportFlag = true;
    	navigator.geolocation.getCurrentPosition(function(position) 
    	{
      		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	      	map.setCenter(initialLocation);
    	}, function() 
    	{
      		handleNoGeolocation(browserSupportFlag);
    	});
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

	
	var dayfield=document.getElementById("daydropdown");
	var monthfield=document.getElementById("monthdropdown");
	var yearfield=document.getElementById("yeardropdown");
	var end_day = dayfield.value;
	var end_month = monthfield.value;
	var end_year = yearfield.value;
	
	var dayfield_start = document.getElementById("daydropdown_start");
	var monthfield_start = document.getElementById("monthdropdown_start");
	var yearfield_start = document.getElementById("yeardropdown_start");
	var start_day = dayfield_start.value;
	var start_month = monthfield_start.value;
	var start_year = yearfield_start.value;
	
	if($('#checkbox1').prop('checked'))
	{
		$.ajax({
		url: "service1.php?start="+start_year+"-"+start_month+"-"+start_day+"&end="+end_year+"-"+end_month+"-"+end_day,
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
		url: "service3.php?start="+start_year+"-"+start_month+"-"+start_day+"&end="+end_year+"-"+end_month+"-"+end_day,
		context: document.body,
		dataType: "json",
		success: function(data){
			startMap(data,map,checkbox3);
	}});
	}
	
	if($('#checkbox4').prop('checked'))
	{
		//create rectangle object
		
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
			google.maps.event.trigger(map, 'resize');
			var recenter = new google.maps.LatLng(0,0);
			map.setCenter(recenter);
		}
		if($('#checkbox4').prop('checked'))
		{
			$('#AreaApplyButton').show();
		}
}

var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function populatedropdown(dayfield, monthfield, yearfield, dayfield_start, monthfield_start, yearfield_start)
{
        var today=new Date();
		var start_date=new Date();;
		start_date.setDate(start_date.getDate()-7);
         
        var dayfield=document.getElementById(dayfield);
        var monthfield=document.getElementById(monthfield);
        var yearfield=document.getElementById(yearfield);
        
        for (var i=1; i<=31; i++)
                dayfield.options[i]=new Option(i, i);

        dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true); //select today's day
        
        for (var m=0; m<12; m++)
                monthfield.options[m]=new Option(monthtext[m], m+1);
        
        monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], (today.getMonth()+1), true, true); //select today's month

        var thisyear=today.getFullYear();
        for (var y=0; y<20; y++)
        {
                yearfield.options[y]=new Option(thisyear, thisyear);
                thisyear-=1;
        }
        yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year


/*-----Start Date Populate-----*/

        var dayfield_start = document.getElementById(dayfield_start);
        var monthfield_start=document.getElementById(monthfield_start);
        var yearfield_start=document.getElementById(yearfield_start);

        for (var i=1; i<=31; i++)
                dayfield_start.options[i]=new Option(i, i);

        dayfield_start.options[start_date.getDate()]=new Option(start_date.getDate(), start_date.getDate(), true, true); //select start_date's day
        
        for (var m=0; m<12; m++)
                monthfield_start.options[m]=new Option(monthtext[m], m+1);
        
        monthfield_start.options[start_date.getMonth()]=new Option(monthtext[start_date.getMonth()], (start_date.getMonth()+1), true, true); //select start_date's month

        var thisyear=start_date.getFullYear();
        for (var y=0; y<20; y++)
        {
                yearfield_start.options[y]=new Option(thisyear, thisyear);
                thisyear-=1;
        }
        yearfield_start.options[0]=new Option(start_date.getFullYear(), start_date.getFullYear(), true, true); //select start_date's year
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
		$('#AreaApplyButton').hide();
	    $('#selectDisasters').show();
	    $('#map_canvas').hide();
		$('#map_canvas').empty();
}

function applyarea()
{
		if($('#checkbox4').prop('checked'))
		{
			bounds = rectangle.getBounds();
			sw = bounds.getSouthWest();
			sw_lat = encodeURIComponent(sw.lat());
			sw_lng = encodeURIComponent(sw.lng());
			ne = bounds.getNorthEast();
			ne_lat = encodeURIComponent(ne.lat());
			ne_lng = encodeURIComponent(ne.lng());
			$('#map_canvas').empty();
			
			var mapOptions = 
			{
				center: new google.maps.LatLng(0,0),
				zoom: 1,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			};
				
			var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
			var url_options = "&sw_lat="+sw_lat+"\u0026sw_lng="+sw_lng+"\u0026ne_lat="+ne_lat+"\u0026ne_lng="+ne_lng;
				
			var dayfield=document.getElementById("daydropdown");
			var monthfield=document.getElementById("monthdropdown");
			var yearfield=document.getElementById("yeardropdown");
			var end_day = dayfield.value;
			var end_month = monthfield.value;
			var end_year = yearfield.value;
			
			var dayfield_start = document.getElementById("daydropdown_start");
			var monthfield_start = document.getElementById("monthdropdown_start");
			var yearfield_start = document.getElementById("yeardropdown_start");
			var start_day = dayfield_start.value;
			var start_month = monthfield_start.value;
			var start_year = yearfield_start.value;	
			
			if($('#checkbox1').prop('checked'))
			{
			$.ajax({
				url: "service1.php?start="+start_year+"-"+start_month+"-"+start_day+"&end="+end_year+"-"+end_month+"-"+end_day+url_options,
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
				url: "service3.php?start="+start_year+"-"+start_month+"-"+start_day+"&end="+end_year+"-"+end_month+"-"+end_day+url_options,
				context: document.body,
				dataType: "json",
				success: function(data){
					startMap(data,map,checkbox3);
			}});
			}
			$('#AreaApplyButton').hide();
		}
}