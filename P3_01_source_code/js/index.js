//getting local storage
var f_name = localStorage.getItem("first_name");
$("#first_name").val(f_name);
var l_name = localStorage.getItem("last_name");
$("#last_name").val(l_name);

// //getting session storage
// var address = sessionStorage.getItem("name");
// $('#user_name').html(address);


$(document).ready(function() {
    var slider = new Slider();

    $("#next").click(function() {  
        slider.pause();
        slider.nextSlide();
    });

    $("#previous").click(function() {
        slider.previousSlide();
    });

    //Pause Slider
    $("#pause").click(function() {
        slider.pause();
    });

    //Play Slider
    $("#play").click(function() {
        slider.play();
    });
});


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
//  if click on save hide canvas
   
   
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
    var action_reservation = $(".station-info p");
    var station = $("#station_address").html();

    if(f_name == "" && l_name == "") { // if firstname is empty OR lastname is empty      
            text_error_fname.addClass("text_error_visible");
        text_error_lname.addClass("text_error_visible");
    } 
    else if(f_name != "" && l_name == "") { // if firstname is empty OR lastname is not empty       
        text_error_lname.addClass("text_error_visible");
        text_error_fname.removeClass("text_error_visible");
    } 
    else if(l_name != "" && f_name == "") { // if last name is not empty and  first name is empty
        text_error_fname.addClass("text_error_visible");
        text_error_lname.removeClass("text_error_visible");
    } 
    else 
    { // if last name is not empty and  first name is not  empty
        text_error_fname.removeClass("text_error_visible"); // remove texts
        text_error_lname.removeClass("text_error_visible");
        // display canvas for signature

        canvas_signature.show();
        canvas_info.show();
        action_clear.show();
        action_save.show();
        action_cancel.show();
        action_reservation.hide();
        $('#prefooter').show    ();


        
        // $('#instructions').show();
        
        //saving names in localstorage
        localStorage.setItem("first_name", f_name);
        localStorage.setItem("last_name", l_name);
        localStorage.setItem("station_address" ,station);
        setReservationUsername();
        setUserStation();

        
    }

});

if(sessionStorage.getItem('minutes') != null) {  // if active reservation
    // resume timer
    let seconds = sessionStorage.getItem('seconds');
    $("#seconds").html(seconds);
    let minutes = sessionStorage.getItem('minutes');
    $("#minutes").html(minutes);
    startTimer(minutes, seconds);
  
    // display timer
    $('#bicyleInfo').css({'display': 'block'});
    $('.noreserve_info').css({'display': 'none'});
    setReservationUsername();
    setUserStation();
}

function setReservationUsername() {
    var firstname = localStorage.getItem("first_name");    
    var lastname = localStorage.getItem("last_name");
    $("#user_name").html(firstname + " " + lastname);
}

function setUserStation() {
    var station = localStorage.getItem("station_address");
    $("#user_station").html(station);
}

function cancelReservation(){


    var canvas_signature = $("#canvas");
    var canvas_info = $(".canvas_info");
    var action_clear = $("#buttonclear");
    var action_save = $("#buttonsave");
    var action_cancel= $("#buttoncancel");
    var action_reservation = $(".station-info p");
    

    canvas_signature.hide();
    canvas_info.hide();
    action_clear.hide();
    action_save.hide();
    action_cancel.hide();
    action_reservation.show();

    $('#instructions').hide();
        
    //saving names in localstorage
    localStorage.clear();
    //sessionStorage.clear();
    setTimertoZero();  
        
}

//Get the button
var mybutton = document.getElementById("myBtn");

// CANCEL BUTTON

$('#cancel_it').on('click', function() 
{
   
    var canvas_signature = $("#canvas");
    var canvas_info = $(".canvas_info");
    var action_clear = $("#buttonclear");
    var action_save = $("#buttonsave");
    var action_cancel= $("#buttoncancel");
    var action_reservation = $(".station-info p");

    canvas_signature.hide();
    canvas_info.hide();
    action_clear.hide();
    action_save.hide();
    action_cancel.hide();
    action_reservation.show();
    localStorage.clear();
    $("#user_station").html(" ");
    console.log("cancel button on click");
    $('#prefooter').hide();



});

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }
