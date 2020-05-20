mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kZXYiLCJhIjoiY2s5cGdibnJ1MGE2eTNnbWU5aWtoajVyMyJ9.YS-wUziFFQp2KTEou0-9GA';
var bikeApiUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=bruxelles&apiKey=c33c8c2fbe740a485ad20f094c5631810e5855b7";

// init map ADDING MAP
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/jodev/cka3rr03703k51ip5ensewp61',
	center: [4.360625, 50.873156],
	zoom: 10
});

		//MAP MARKER

map.on('click', function(event) {
	var features = map.queryRenderedFeatures(event.point); // find features at coordinates
	var feature = features[0]; // select first feature
	
	var address = feature.properties.address;  
	$('#address').html(address); 

	var available_bike_stands = feature.properties.available_bike_stands; // access marker properties
	$('#available_bike_stands').html(available_bike_stands); // update html

	var available_bikes = feature.properties.available_bikes;  
	$('#available_bikes').html(available_bikes);
	
	// var info_title = feature.properties.info_title;  
	// $('#info_title').html(info_title);
	

});

 


map.on('load', function(e) { // wait for map to be loaded
	$.get(bikeApiUrl, function(stations){
		// add stations to source
		/* build source
		   use geojson format
		   geojson structure example
		  	{
		  		"type": "FeatureCollection",
    			"features": [{
			 		"type": "Feature",
			 		"geometry": {
						"type": "Point",
			 			"coordinates": [125.6, 10.	1]
			 		},
					"properties": {
					    "name": "Dinagat Islands"
					}
			 	}]
			}
		*/
		
		var featuresList = [];  // empty array of features
		// for each station
		stations.forEach(function(station){
			// add station to features
			featuresList.push(
				{ 
					"type":"Feature",
					"geometry":
					{
						"type":"Point",
						"coordinates":[station.position.lng,station.position.lat,]

					},
					"properties":
					{
						"number":station.number,
						"name":station.name,
						"address":station.address,
						"bike_stands":station.bike_stands,
						"available_bike_stands":station.available_bike_stands,
						"available_bikes":station.available_bikes,
						"status":station.status,
					}
				}
			)

		});
		var geojson = {
			"type": "FeatureCollection",
			"features": featuresList,	
		};
		map.addLayer(
			{
			    "id": "locations",
			    "type": "symbol",
			    /* Add a GeoJSON source containing place coordinates and information. */
			    "source":
			     {
			    	"type": "geojson",
			     	"data": geojson,
			     },
				"layout": 
				{
			    	"icon-image": "bicycle-15",
			    	"icon-allow-overlap": true,
			    }
		    }
	   	);

		// add geojson to source, see mapbox documentation
		// link source to layer and add layer to map, see mapbox documentation
	});
});

	
	// SLIDER IMAGES 

$(".next").on("click", function(){
	nextSlide();
});



$(".previous").on("click", function(){
	var div = $(".slideshow-container div");
	var current = $(".active");
	var last = div[div.length-1];
	var first = div[0];
	if (current[0] == first) {  // if current image is first image
		var previous = $(last); // go back to last image
	} else {
		var previous = $(".active").prev(); // go to previous image
	}
	previous.addClass("active");
	previous.removeClass("sliderimages");
	current.removeClass("active");
	current.addClass("sliderimages");
});

function nextSlide()
{
	var div = $(".slideshow-container div");
	var current = $(".active");
	if (div[div.length-1] == current[0]) {  // if current image is last image
		var next = $(div[0]); // go back to first image
	} else {
		var next = $(".active").next(); // go to next image
	}
	next.addClass("active");
	next.removeClass("sliderimages");
	current.removeClass("active");
	current.addClass("sliderimages");
}
// SLIDER TIME COUNTER

var timeCounter = 5000;
function playCarousel()
{
	nextSlide();
	setTimeout(playCarousel, timeCounter); 

}
setTimeout(playCarousel, timeCounter);


//FORM
 
$("#buttonReserv") .on("click", function(){
	var f_name = $("#first_name").val(); 
	var l_name = $("#last_name").val();
	var text_error_fname = $(".text_error_fname");
	var text_error_lname = $(".text_error_lname");

	if (f_name == ""  && l_name == "") { // if firstname is empty OR lastname is empty	    
	    text_error_fname.addClass("text_error_visible")
	    text_error_lname.addClass("text_error_visible")
	} 
	else if (f_name != "" && l_name == "") { // if firstname is empty OR lastname is not empty		 
	    text_error_lname.addClass("text_error_visible")
	    text_error_fname.removeClass("text_error_visible")
	}
	else if (l_name != "" && f_name == "") { // if last name is not empty and  first name is empty
	    text_error_fname.addClass("text_error_visible")
	   	text_error_lname.removeClass("text_error_visible")
	}
	else if (l_name != "" && f_name != "") { // if last name is not empty and  first name is not  empty
	    text_error_fname.removeClass("text_error_visible") // remove texts
	    text_error_lname.removeClass("text_error_visible")
	}
	else {
		// display canvas for signature
	}

});
