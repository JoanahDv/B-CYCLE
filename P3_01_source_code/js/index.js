//getting local storage
var f_name = localStorage.getItem("first_name");
$("#first_name").val(f_name);
var l_name = localStorage.getItem("last_name");
$("#last_name").val(l_name);

  




mapboxgl.accessToken =  mapAccessToken
var map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    center: [4.360625, 50.873156],
    zoom: 10

});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


// map not to zoom while scrolling
  
var maxMobileWidth = 768;   
if(window.innerWidth >= maxMobileWidth) { // if width is lower or equal to number, disable zoom if mobile.do
    map.scrollZoom.disable();
}

// add cluster to map

 
//MAP MARKER
map.on('click',"locations", function(event) {
    // $("#boutonAnnuler").css("display", "none");

    var canvas_signature = $("#canvas");
    var canvas_info = $(".canvas_info");
    var action_clear = $("#buttonclear");
    var action_save = $("#buttonsave");
    var action_cancel= $("#buttoncancel");

    var features = map.queryRenderedFeatures(event.point); // find features at coordinates
    //  
    $(".station-info p").css("display", "block");
    $(".informations").css("display", "block");
    $(".info_text").css("display", "none");
    $(".station-info").css("display", "block");
    // $("#prefooter").css("display","none");

    // $(".instructions").css("display","block");

    // $(".signature").css("display", "block");

    var feature = features[0]; // select first feature
    var status = feature.properties.status;
    $('#status').html(status);

    var name = feature.properties.name;
    $('#name').html(name);

    var address = feature.properties.address;
    $('#station_address').html(address);

    var available_bike_stands = feature.properties.available_bike_stands; // access marker properties
    $('#available_bike_stands').html(available_bike_stands); // update html

    var available_bikes = feature.properties.available_bikes;
    $('#available_bikes').html(available_bikes); 

    $(".informations").css("display", "block");

    $(".noreserve_info").css("display", "none");


    canvas_signature.hide();
    canvas_info.hide();
    action_clear.hide();
    action_save.hide();
    action_cancel.hide();
});

   
   
//CURSOR FOR MOUSE

map.on('mousemove', "locations", (e) => {
  map.getCanvas().style.cursor = 'pointer';
      // $("station-info").css("display", "block")
});

map.on("mouseleave", "locations", function() {
  map.getCanvas().style.cursor = '';
});

    // var info_title = feature.properties.info_title;  
    // $('#info_title').html(info_title);


//SLIDER  DIAPORAMA
$('#timer').css({'display': 'block'});

setInterval(updateTimer, interval); // update time every 1 second
function updateTimer() {
    var seconds = (reservationTime % 60000) / 1000;
    var minutes = Math.floor(reservationTime / 60000);
    $('#seconds').html(seconds);
    $('#minutes').html(minutes);
    reservationTime = reservationTime - interval;
}


map.on('load', function(e) { // wait for map to be loaded
    $.get(bikeApiUrl, function(stations) {
        // add stations to source
        var featuresList = []; // empty array of features
        // for each station
        stations.forEach(function(station) {
            // add station to features
            featuresList.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.position.lng, station.position.lat, ]
                },
                "properties": {
                    "number": station.number,
                    "name": station.name,
                    "address": station.address,
                    "bike_stands": station.bike_stands,
                    "available_bike_stands": station.available_bike_stands,
                    "available_bikes": station.available_bikes,
                    "available_bikes_str": String(station.available_bikes),
                    "status": station.status,
                }

                

            });
        });

        var geojson = {
            "type": "FeatureCollection",
            "features": featuresList,
        };
        map.addLayer({
            "id": "locations",
            "type": "symbol",
            /* Add a GeoJSON source containing place coordinates and information. */
            "source": {
                "type": "geojson",
                "data": geojson,
            },
            "layout": {
                // "icon-image": "bicycle-15",
                'icon-image': ['match', ['get', 'available_bikes_str'], '0', 'bike-pin-red', '1', 'bike-pin-orange', '2', 'bike-pin-orange', '3', 'bike-pin-orange', 'bike-pin-green'],
                "icon-allow-overlap": true,
            }
        });
        // add geojson to source, see mapbox documentation
        // link source to layer and add layer to map, see mapbox documentation
    });
});


$(document).ready(function() {
    $("#next").click(function() {
        pause();
        nextSlide();
    });


    

        $("#previous").click(function() {
            var sliderImages = $(".slideshow-container figure.sliderimages");
            var current = $(".active");
            var last = sliderImages[sliderImages.length - 1];
            var first = sliderImages[0];
            if(current[0] == first) { // if current image is first image
                var previous = $(last); // go back to last image
            } else {
                var previous = $(".active").prev(".sliderimages"); // go to previous image
            }
            previous.addClass("active");
            previous.removeClass("inactive");
            current.removeClass("active");
            current.addClass("inactive");
        });

    function nextSlide() {
        var sliderImages = $(".slideshow-container figure.sliderimages");
        var current = $(".active");

        if(sliderImages[sliderImages.length - 1] == current[0]) { // if current image is last image
            var next = $(sliderImages[0]); // go back to first image
        } else {
            var next = $(".active").next(".sliderimages"); // go to next image
        }
        next.addClass("active");
        next.removeClass("inactive");
        current.removeClass("active");
        current.addClass("inactive");
    }
    // SLIDER TIME COUNTER
    var timeCounter = 1000;
    var sliderInterval = setInterval(nextSlide, timeCounter);
    //Pause Slider
    $("#pause").click(function() {
        pause();
    });

    //Play Slider
    $("#play").click(function() {
        sliderInterval = setInterval(nextSlide, timeCounter);
        $("#play").css("display", "none");
        $("#pause").css("display", "block");
    });
    //PAUSE AND PLAY
    var playPause = document.getElementById("pause_play");

    function pause(){
        clearInterval(sliderInterval);
        $("#play").css("display", "block");
        $("#pause").css("display", "none");
    };
});



//FORM
$("#signup_form").on("submit", function(e) {
    e.preventDefault();
    var f_name = $("#first_name").val();
    var l_name = $("#last_name").val();
    var text_error_fname = $(".text_error_fname");
    var text_error_lname = $(".text_error_lname");
    var canvas_signature = $("#canvas");
    var canvas_info = $(".canvas_info");
    var action_clear = $("#buttonclear");
    var action_save = $("#buttonsave");
    var action_cancel= $("#buttoncancel");
    var action_reservation = $ (".station-info p")

    if(f_name == "" && l_name == "") { // if firstname is empty OR lastname is empty      
        text_error_fname.addClass("text_error_visible");
        text_error_lname.addClass("text_error_visible");
    } else if(f_name != "" && l_name == "") { // if firstname is empty OR lastname is not empty       
        text_error_lname.addClass("text_error_visible");
        text_error_fname.removeClass("text_error_visible");
    } else if(l_name != "" && f_name == "") { // if last name is not empty and  first name is empty
        text_error_fname.addClass("text_error_visible");
        text_error_lname.removeClass("text_error_visible");
    } else { // if last name is not empty and  first name is not  empty
        text_error_fname.removeClass("text_error_visible"); // remove texts
        text_error_lname.removeClass("text_error_visible");
        // display canvas for signature
        canvas_signature.show();
        canvas_info.show();
        action_clear.show();
        action_save.show();
        action_cancel.show();
        action_reservation.hide();
    }

    //saving names in localstorage
    localStorage.setItem("first_name", f_name);
    localStorage.setItem("last_name", l_name);
});
 
// // getting session storage
// //  getting session storage



//TIMER 
if(sessionStorage.getItem('minutes') != null) {
    $('#timer').css({
        'display': 'block'
    });
    let secondes = sessionStorage.getItem('secondes');
    $('#secondes').html(secondes);
    let minutes = sessionStorage.getItem('minutes');
    $('#minutes').html(minutes);
    var timerOn = setInterval(timer.decompte, 1000);

}

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
