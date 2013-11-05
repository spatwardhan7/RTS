<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>


$(document).ready(function(){
	//alert("document.ready");
	var script = document.createElement('script');
	//alert("document.ready.1");
	script.type = 'text/javascript';
	//alert("document.ready.2");
	script.src = "http://maps.google.com/maps/api/js?key=AIzaSyCmmvyzLDJPwGZGgzyBprJDtrTBALBTBYE&sensor=false&callback=initialize";
	//alert("document.ready.3");
	document.body.appendChild(script);
	//alert("document.ready.4");
	
																								//document.ready function to include google map api
/*	var image = document.createElement('img');
	image.id='dyn1'
	image.src="images/TSRB/1/image.jpg";
	image.usemap="#dyna";
	image.alt="My Dynamic Image";
	alert(image.src);*/
	
	//jQuery('#usemap').attr('usemap','#dyna');
	
	$('#restaurant').hide();
	
});

function loadHome(){
		//alert('My Home');										
																			//over riding home button
		
		$('#all_restaurants').hide();
			$('#restaurant').hide();
			$('#subway').hide();
			$('#pizzahut').hide();
			$('#chicfilla').hide();																		
			$('#greatwraps').hide();
			$('#indianplace').hide();
				$('#all_facilities').hide();
			$('#facilities').hide();											
			$('#floors').hide();
			$('#floor1').hide();
			$('#floor2').hide();
			
			
			$('#all_restaurants').hide();
			$('#menuButtons').show();
}

function populateRest(){
	$.ajax({
		url: "api/restaurants",
		context: document.body,
		dataType: "json",
		success: function(data){
			
			$('#all_facilities').hide();
			$('#facilities').hide();											//function to display map after clicking on restaurant
			$('#floors').hide();
			$('#floor1').hide();
			$('#floor2').hide();
			
			
			$('#all_restaurants').show();
			$('#menuButtons').hide();
			startMap(data);
		}
	});
}



var RestaurantCompleteData=null;
function startMap(data){
//alert(data.length);
RestaurantCompleteData = data;
//alert(data);

if (navigator.geolocation) {																						//starting map, getting current location
			//	alert("inside if");
               navigator.geolocation.getCurrentPosition(onSuccess, onError);
          } else {
			//alert("inside else");															
               // If location is not supported on this platform, disable it
               $('#getLocation').value = "Geolocation not supported";
               $('#getLocation').unbind('click');
          }

}

function onSuccess(position)
{
    // alert('in onSuccess');
	 
	 //var lat=position.coords.latitude;
	 //var lng=position.coords.longitude;
	 var lat=33.773614;
	 var lng=-84.399248;
	 var marker = [];
	 //alert('1');
	 var markerCounter = 0;
	 var latlng = new google.maps.LatLng(lat, lng);															//actual map and pointers are poulated. 
	 var mapOptions = {};
	 
	 mapOptions.zoom = 15;
	 //alert('2');
    
	 //alert('3');
     mapOptions.center = latlng;
	 
	 //alert('3');
	 mapOptions.mapTypeId= google.maps.MapTypeId.ROADMAP;
	 //alert('4');
	 var map = new google.maps.Map(document.getElementById("map_canvas"),
				mapOptions);	
		//		alert('5');SS
		
		//alert(RestaurantCompleteData.length);
				
	$.each(RestaurantCompleteData, function(index) {
                    //items.push('<li id="' + key + '">' + val + '</li>');
                 //   $('body').append('<li id="' + RestaurantCompleteData.user + '">' + RestaurantCompleteData.user + '</li>');
						
						//var latlng = new google.maps.LatLng(, lng);
						
							
							var latlng = new google.maps.LatLng(RestaurantCompleteData[index].Latitude, RestaurantCompleteData[index].Longitude);
							marker[markerCounter] = new google.maps.Marker({
									position: latlng, 
									map: map, 
									title:RestaurantCompleteData[index].BuildingName
							
							});
								
								google.maps.event.addListener(marker[markerCounter], 'click', function() {
							//alert("onclick");
							//infowindow.open(map, marker);
							getNearRest(RestaurantCompleteData[index].BuildingId);
							
							});
						markerCounter++;
						
                 });
	
	var marker = new google.maps.Marker({
              position: latlng, 
              map: map, 
              title:"Your current location",
			  icon:"http://www.google.com/mapfiles/arrow.png"
          });
				
	//alert('5');
	
	var infowindow = new google.maps.InfoWindow({
	content: "Restaurants Available. <a href='' onclick='getNearRest()'>Pizza Hut</a>"
	});
	
		//	alert('6');
			
			//google.maps.event.addListener(marker, 'click', function() {
				//alert("onclick");
				//infowindow.open(map, marker);
				//getNearRest(77);
//  });
  
  $('#map_canvas').show();
			
	//	alert('7');
			
	
}
function getNearRest(buildingID){
	//alert('getting nearby rests');
	//alert(buildingID);
	$("#id_restaurants").find('option').remove();
	$("#id_restaurants").append("<option value='0'>Select Restaurant</option>");
	$.each(RestaurantCompleteData, function(index) {															//Populating restaurant after clicking on map building icon.
		if(RestaurantCompleteData[index].BuildingId ==buildingID){
			var rid = RestaurantCompleteData[index].ID;
			var rname = RestaurantCompleteData[index].Name;
			//alert(rname);
			//$("#id_restaurants").html("<option value='"+RestaurantCompleteData[index].ID+"'>"+RestaurantCompleteData[index].Name+"</option>");
			$("#id_restaurants").append("<option value='"+rid+"'>"+rname+"</option>");
		}
	});
	
	$('#restaurant').show();
	$('#map_canvas').hide();
		

}
function getRestaurants(){
	var restaurant_id = $("#id_restaurants").val();
	$('#menu').empty();
	
 	$.ajax({
		url: "api/restaurants/"+restaurant_id,
		dataType: "json",
		context: document.body,//populate menu of restaurand id selected in drop down box
		success: function(data){
			var StartTime = null;
			var EndTime = null;
			$('#RestTimings').empty();
			$('#PaymentMethods').empty();
			$('#menu').empty();
			
			$('#menu').append('<div align="center"><table id="menuTable" class="menuTable123"></table></div>');
			var table = $('#menuTable');
			table.append( '<tr><th scope="col">Sr. No</th><th scope="col">Product Name</th><th scope="col">Price</th><th scope="col">Is Veg</th></tr>' );
			
			$.each(data, function(index) {
			var food = data[index].FoodItem;
			var price = data[index].Price;
			var isVeg=data[index].isVeg=="0"?"No":"Yes";
			$("#id_menus").append("<option>"+food+"</option>");
			table.append( '<tr><td>'+(index+1)+'</td><td>' + food +  '</td><td>'+price+'</td><td>'+isVeg+'</td></tr>' );
			});
			
			$('#menu').show();
			

var buzz = data[0].acceptBuzz == "0"? "": "Buzzcard";
var cash = data[0].acceptCash == "0"? "": "Cash";
var credit = data[0].acceptCredit == "0"? "": "Credit-Card";
StartTime = data[0].StartTime;
EndTime = data[0].EndTime;
$('#RestTimings').append("Timings: "+StartTime +" - " +EndTime);

$('#PaymentMethods').append("Payment by: " + buzz + "   " + cash + "   " + credit);
			
		}
		
	});
}

// Error function for Geolocation call
function onError(msg)
{
     //alert('in on Error');
	 alert(msg);
}
//---------------------------------------------------------------------------Facilities-----------------------------------------------------------------------

function ShowOnImageClick(wendingID){
	$.ajax({
		url: "api/vendingmachines/"+wendingID,
		context: document.body,
		dataType: "json",																				//function to display wending machine data
		success: function(data){
		
			$('#WendingItems').empty();
			
			$('#WendingItems').append('<div align="center"><table id="WendingTable"></table></div>');
			var table = $('#WendingTable');
			table.append( '<tr><th scope="col">Sr. No</th><th scope="col">Items</th></tr>' );//function to display items in wending machine
					
			$.each(data, function(index) {
		
			
			var ProductName = data[index].ProductName;
			
			table.append( '<tr><td>'+(index+1)+'</td><td>' + ProductName +  '</td></tr>' );
			});
			$('#WendingItems').show();
		}
	});
}

function populateFac(){
	
	$.ajax({
		url: "http://m2.cip.gatech.edu/widget/gtplaces/content/api/buildings",
		context: document.body,
		dataType: "json",
		success: function(data){
			$('#all_restaurants').hide();
			$('#restaurant').hide();
			$('#subway').hide();
			$('#pizzahut').hide();
			$('#chicfilla').hide();
			$('#greatwraps').hide();
			$('#indianplace').hide();
			$('#menuButtons').hide();
			//$('#map_canvas').hide();
			//alert(data);
			getGTBuildings(data);
			$('#all_facilities').show();
		//	$('#facilities').show();
			
			}
	});
			
	
}

function getGTBuildings(buildingData){
	//alert('getting nearby rests');
	//alert(buildingID);
	$("#facilities").find('option').remove();
	$("#places").find('option').remove();
	$("#places").append("<option value='0'>Select Building</option>");								//function to populate GTBuilding drop down box
	$.each(buildingData, function(index) {
		
			var bid = buildingData[index].b_id;
			var bname = buildingData[index].name;
			//alert(rname);
			//$("#id_restaurants").html("<option value='"+RestaurantCompleteData[index].ID+"'>"+RestaurantCompleteData[index].Name+"</option>");
			$("#places").append("<option value='"+bid+"'>"+bname+"</option>");
		
	});
	
	$('#facilities').show();
	var places = $("#places");
	console.log(places);
	places.sort(function(a,b) {
		if(a.text > b.text) return 1;
		else if(a.text < b.text) return -1;
		else return 0;
	})
	console.log(places);
	$('#places').show();
	
	$('#map_canvas').hide();

}





function getFloors(){
	var randomNum = Math.ceil(Math.random()*5);	
	
	$('#facilities').show();																	//  populating random number of floors drop down box
			$('#floors').show();
	
	$("#floorsdropdown").find('option').remove();
	$("#floorsdropdown").append("<option value='0'>Select Floor</option>");
			
	for(var i = 1;i<=randomNum;i++)
	{
		$("#floorsdropdown").append("<option value='"+i+"'>"+i+"</option>");
		
	}
	
}


function getFloorData(){
	$.ajax({
		url: "api/vendingmachines",
		context: document.body,
		dataType: "json",
		success: function(data){
			$('#restaurant').hide();
			$('#facilities').show();																		//function to populate Image map
			$('#floors').show();
			$('#WendingTable').hide();
			var FloorSelected = document.getElementById('floorsdropdown');
			FloorNo = FloorSelected.value
			//alert(FloorNo.value);
			var BuildingName = "Technology Square Research Building";							//get From Drop Down
		//	alert('inside getFloorData()');
			$.each(data, function(index) {
				//	alert(data[index].BuildingName +"  :   "+data[index].FloorNumber)
				//	alert(data[index].BuildingName==BuildingName);
					if(data[index].BuildingName ==BuildingName && data[index].FloorNumber==FloorNo){
						
						
						var wID = data[index].ID;
						var wCords = data[index].Coordinates;
						
						//alert(wID);
						var imageURL = "images/TSRB/"+FloorNo+"/image.jpg"
						var areaURL = "javascript:ShowOnImageClick("+wID+")"
						$("#dyn1").attr("src",imageURL);
						
						var map = document.createElement('map');
						map.id="_dyna";
						map.name="dyna"
		
							//$('#myarea').remove();
						var area = document.createElement('area');
						
						//alert(area.href);
						area.id="myarea";
						area.shape="rect";
						area.coords="";				//get from database
						area.href="";	
						
						area.alt=wID;
						area.title="Vending Machine";
	
						map.appendChild(area);
						$('#dynamicFloor').append(map);
						//$('#dynamicFloor').append(image);
						$('#legend123').show();
						$('#dynamicFloor').show();
						changeAreaAttr(areaURL,wCords);
	

			}	
		});
			
		}
	});
}
function changeAreaAttr(areaURL,wCords){
	
	$("#myarea").attr("href",areaURL);
	$("#myarea").attr("coords",wCords);									//Dynamically changing area coords and href url
				
	
}



