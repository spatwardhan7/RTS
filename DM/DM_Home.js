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

   var jsonData = $.ajax( "services.php" )
                       .done(function() { alert("success"); })
                       .fail(function() { alert("error"); })
                       .always(function() { alert("complete"); });

   alert(jsonData.content);

/*
	$.ajax
	({
		url: "http://bruiser3.cc.gatech.edu:8080/grait-dm/feed_usgs_m25_week.php",
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

*/
}

function startMap()
{	
	var mapOptions = 
	{
    	center: new google.maps.LatLng(0,0),
    	zoom: 1,
    	mapTypeId: google.maps.MapTypeId.TERRAIN
    };
        
    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    alert("after var map");
    


   var jsondata = 
   				   {
   				   	"type":"FeatureCollection","metadata":{"title":"Earthquakes: 2.5+\/week"},
   				    "features":
   				      [{"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 01:58:35, magnitude: 2.700000, latitude: 44.656200, longitude: -110.423800","properties":{"mag":"2.7"},"geometry":{"type":"Point","coordinates":["44.6562","-110.4238"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 11:47:27, magnitude: 4.800000, latitude: 23.593700, longitude: 121.492500","properties":{"mag":"4.8"},"geometry":{"type":"Point","coordinates":["23.5937","121.4925"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 11:39:39, magnitude: 5.100000, latitude: -25.014600, longitude: -70.919500","properties":{"mag":"5.1"},"geometry":{"type":"Point","coordinates":["-25.0146","-70.9195"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 11:01:02, magnitude: 5.300000, latitude: 38.286000, longitude: 142.829600","properties":{"mag":"5.3"},"geometry":{"type":"Point","coordinates":["38.286","142.8296"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 08:02:08, magnitude: 6.600000, latitude: 23.590600, longitude: 121.440600","properties":{"mag":"6.6"},"geometry":{"type":"Point","coordinates":["23.5906","121.4406"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 06:11:57, magnitude: 4.400000, latitude: 9.798900, longitude: 124.235800","properties":{"mag":"4.4"},"geometry":{"type":"Point","coordinates":["9.7989","124.2358"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-31 05:02:03, magnitude: 4.900000, latitude: -18.678400, longitude: 65.259900","properties":{"mag":"4.9"},"geometry":{"type":"Point","coordinates":["-18.6784","65.2599"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 23:10:08, magnitude: 4.800000, latitude: 44.566100, longitude: 124.215500","properties":{"mag":"4.8"},"geometry":{"type":"Point","coordinates":["44.5661","124.2155"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 23:03:35, magnitude: 5.400000, latitude: 44.637600, longitude: 124.081300","properties":{"mag":"5.4"},"geometry":{"type":"Point","coordinates":["44.6376","124.0813"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 20:34:00, magnitude: 5.200000, latitude: -9.073400, longitude: 119.605900","properties":{"mag":"5.2"},"geometry":{"type":"Point","coordinates":["-9.0734","119.6059"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 18:58:42, magnitude: 4.000000, latitude: -35.384000, longitude: -73.297000","properties":{"mag":"4"},"geometry":{"type":"Point","coordinates":["-35.384","-73.297"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 18:40:31, magnitude: 4.000000, latitude: 38.699500, longitude: 43.240200","properties":{"mag":"4"},"geometry":{"type":"Point","coordinates":["38.6995","43.2402"]}},
	                   {"type":"Feature","title":"Earthquake of 2.5 magnitude or higher","content":"Date: 2013-10-30 17:45:36, magnitude: 4.800000, latitude: -7.960600, longitude: 107.826400","properties":{"mag":"4.8"},"geometry":{"type":"Point","coordinates":["-7.9606","107.8264"]}}
	                  ]
	                } ; 
           



    for (var i = 0; i < jsondata.features.length; i++){

 		//console.log("latitude: " + parseFloat(jsondata.features[i].content.split(',')[2].split(':')[1]));
 		//console.log("longitude: "+parseFloat(jsondata.features[i].content.split(',')[3].split(':')[1]));

 		//console.log("--");



	   var latlng = new google.maps.LatLng( parseFloat(jsondata.features[i].content.split(',')[2].split(':')[1]), 
	   	                                    parseFloat(jsondata.features[i].content.split(',')[3].split(':')[1])
	   	                                   );

		var marker = new google.maps.Marker({
			position: latlng, 
			map: map, 
			title: 'blank',					
		});


	}


    $('#map_canvas').show();
}

google.maps.event.addDomListener(window,'load',startMap);