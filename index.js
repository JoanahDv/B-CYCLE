//getting local storage
var f_name = localStorage.getItem("first_name");
$("#first_name").val(f_name);
var l_name = localStorage.getItem("last_name");
$("#last_name").val(l_name);


// INITIATING AND ADDING MAP
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kZXYiLCJhIjoiY2s5cGdibnJ1MGE2eTNnbWU5aWtoajVyMyJ9.YS-wUziFFQp2KTEou0-9GA';
var bikeApiUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=bruxelles&apiKey=c33c8c2fbe740a485ad20f094c5631810e5855b7";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jodev/cka3x3lp10ua61imynd5hmkfm',
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
//SLIDER  DIAPORAMA
$('#timer').css({'display': 'block'});
var reservationTime = 20 * 60 * 1000; // 20 minutes
var interval = 1000; // 1 second
setInterval(updateTimer, interval); // update time every 1 second
function updateTimer() {
    var seconds = (reservationTime % 60000) / 1000;
    var minutes = Math.floor(reservationTime / 60000);
    $('#seconds').html(seconds);
    $('#minutes').html(minutes);
    reservationTime = reservationTime - interval;
}

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
                        "coordinates": [125.6, 10.  1]
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
                    "available_bikes_str":String(station.available_bikes),
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
                // "icon-image": "bicycle-15",
                'icon-image': [
                    'match',
                    ['get', 'available_bikes_str'],
                    '0',
                    'bike-pin-red',
                    '1',
                    'bike-pin-orange',
                    '2',
                    'bike-pin-orange',
                    '3',
                    'bike-pin-orange',
                    'bike-pin-green'
                ],
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
    var sliderImages = $(".slideshow-container div.sliderimages");
    var current = $(".active");
    var last = sliderImages[sliderImages.length-1];
    var first = sliderImages[0];
    if (current[0] == first) {  // if current image is first image
        var previous = $(last); // go back to last image
    } else {
        var previous = $(".active").prev(".sliderimages"); // go to previous image
    }
    previous.addClass("active");
    previous.removeClass("inactive");
    current.removeClass("active");
    current.addClass("inactive");
});


function nextSlide()
{
    var sliderImages = $(".slideshow-container div.sliderimages");
    var current = $(".active");
    if (sliderImages[sliderImages.length-1] == current[0]) {  // if current image is last image
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
var timeCounter = 5000;
var sliderInterval = setInterval(nextSlide, timeCounter);

//Pause Slider
$("#pause").click(function(){
    clearInterval(sliderInterval);
})

//Play Slider
$("#play").click(function(){
    sliderInterval = setInterval(nextSlide, timeCounter);
})

//FORM
$("#signup_form").on("submit", function(e){
    e.preventDefault();

    var f_name = $("#first_name").val(); 
    var l_name = $("#last_name").val();
    var text_error_fname = $(".text_error_fname");
    var text_error_lname = $(".text_error_lname");
    var canvas_signature = $("#canvas");
    var canvas_info = $(".canvas_info");
    var action_clear = $("#buttonclear")
    var action_save = $("#buttonsave")


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
    else { // if last name is not empty and  first name is not  empty
        text_error_fname.removeClass("text_error_visible") // remove texts
        text_error_lname.removeClass("text_error_visible")
        // display canvas for signature
        canvas_signature.show();
        canvas_info.show();
        action_clear.show();
        action_save.show();
    }
     //saving names in localstorage

    localStorage.setItem("first_name", f_name);
    localStorage.setItem("last_name", l_name);

});

 

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var x = null;//rien
var y = null;//rien
var isDrawing = false;
var clearCanvas = document.getElementById('buttonclear');
var saveCanvas = document.getElementById('buttonsave');
var hasSigned = false;




$("#canvas").on("mousedown", function(e){ //canvas.addEventListener('mousedown',e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

$("#canvas").on("mousemove", function(e){ 
    if (isDrawing === true) 
    {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        hasSigned = true;
    }

});

window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

});


function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

$("#buttonclear").on('click', function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Pour valider la signature pour afficher le status du reservation.


 // --> Une fois la validation de la signature, on autorise la réservation.
$("#buttonsave").on("click", function(){
    // réutiliser ce qui est fait dans la partie reserver
    // en mettant le code commun dans une fonction (validation du formulaire)
    var f_name = $("#first_name").val(); 
    var l_name = $("#last_name").val();

    var text_error_fname = $(".text_error_fname");
    var text_error_lname = $(".text_error_lname");
    var saveCanvas = document.getElementById('buttonsave');
    var infoReservation = $("#bicyleInfo");
    var footerInfo = $ (".footer_info");
    var timer = $("#timer");
 

    if (f_name == ""  && l_name == "") { // if firstname is empty OR lastname is empty        
        text_error_fname.addClass("text_error_visible")
        text_error_lname.addClass("text_error_visible")

    }


    else{
    // if click on save after signature then show information on reservation with timer
        text_error_fname.removeClass("text_error_visible")  
        text_error_lname.removeClass("text_error_visible")
        if(hasSigned === true){
        infoReservation.show();
        footerInfo.hide()

        }
    }
 
});

//TIMER 

if (sessionStorage.getItem('minutes') != null) {

    $('#timer').css({'display': 'block'});
    
    let secondes = sessionStorage.getItem('secondes');
    $('#secondes').html(secondes);

    let minutes = sessionStorage.getItem('minutes');
    $('#minutes').html(minutes);

    var timerOn = setInterval(timer.decompte, 1000);
}


// // STATION INFORMATION 


// $('#stationName').html(sessionStorage.getItem('nomStation'));
// $('#firstName').html(localStorage.getItem('prenomVisiteur'));
// $('#lastName').html(localStorage.getItem('nomVisiteur'));



 


