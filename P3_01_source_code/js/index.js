
//getting local storage
var f_name = localStorage.getItem("first_name");
$("#first_name").val(f_name);
var l_name = localStorage.getItem("last_name");
$("#last_name").val(l_name);

var reservationTimer = new ReservationTimer();
var slider = new Slider();
var canvas = new Canvas();

// SLIDER
$(document).ready(function () {
    $("#next").click(function () {
        slider.pause();
        slider.nextSlide();
    });

    $("#previous").click(function () {
        slider.previousSlide();
    });

    //Pause Slider
    $("#pause").click(function () {
        slider.pause();
    });

    //Play Slider
    $("#play").click(function () {
        slider.play();
    });

    // CANVAS
    $("#canvas").on("mousedown", function (event) {
        canvas.onmousestart(event);
    });

    $("#canvas").on("touchstart", function (event) {
        canvas.onmousestart(event);
    });

    $("#canvas").on("mousemove", function (event) {
        canvas.onmousemove(event);
    });
    $("#canvas").on("touchmove", function (event) {
        canvas.onmousemove(event);
    });
    // when user releases mouse
    window.addEventListener("mouseup", function (event) {
        canvas.onmousestop(event);
    });
    // when user stops touch
    window.addEventListener("touchend", function (event) {
        canvas.onmousestop(event);
    });
    $("#buttonsave").on("click", function (event) {
        canvas.signatureSave(event);
    });
    $('#buttoncancel').on("click", function (event) {
        canvas.SignatureCanvasCancel(event);
    });
    $("#buttonclear").on("click", function (event) {
        canvas.signatureClear(event);
    });

    // cancel reservation
    $('#cancel_it').on('click', function () {
        cancelReservation(canvas, reservationTimer);
    });

    // timer 
    if (sessionStorage.getItem('minutes') != null) {  // if active reservation
        activateReservation(reservationTimer);
    }
});

// MAP
var mapWrapper = new MapWrapper();

//MAP MARKER
mapWrapper.map.on('click', "locations", function (event) {
    mapWrapper.onClick(event);
});
//CURSOR FOR MOUSE
mapWrapper.map.on('mousemove', "bikelocationscluster", (e) => {
    mapWrapper.map.getCanvas().style.cursor = 'pointer';
});
mapWrapper.map.on('mousemove', "locations", (e) => {
    mapWrapper.map.getCanvas().style.cursor = 'pointer';
});

mapWrapper.map.on("mouseleave", "locations", function () {
    mapWrapper.map.getCanvas().style.cursor = '';
});
mapWrapper.map.on("mouseleave", "bikelocationscluster", function () {
    mapWrapper.map.getCanvas().style.cursor = '';
});

// var info_title = feature.properties.info_title;  
// $('#info_title').html(info_title);
// erifier que ça sert a quelque chose
//$('#timer').css({ 'display': 'block' });
mapWrapper.map.on('load', function (e) { // wait for map to be loaded
    // make funtion 
    $.get(bikeApiUrl, function (stations) {
        // add stations to source
        var featuresList = []; // empty array of features
        // for each station
        stations.forEach(function (station) {
            // add station to features
            featuresList.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.position.lng, station.position.lat,]
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
        mapWrapper.map.addSource("bikes", {
            "cluster": true,
            "clusterRadius": 50,
            "clusterMaxZoom": 14,
            "type": "geojson",
            "data": geojson,
        });

        mapWrapper.map.addLayer({
            "id": "locations",
            "type": "symbol",
            source: "bikes",
            filter: ['!', ['has', 'point_count']],
            "layout": {
                // "icon-image": "bicycle-15",
                'icon-image': ['match', ['get', 'available_bikes_str'], '0', 'bike-pin-red', '1', 'bike-pin-orange', '2', 'bike-pin-orange', '3', 'bike-pin-orange', 'bike-pin-green'],
                "icon-allow-overlap": true,
            }
        });
        mapWrapper.map.addLayer({
            "id": "bikelocationscluster",
            "type": "circle",
            source: "bikes",
            filter: ["has", "point_count"],
            paint: {

                //   * teal, 15px circles when point count is above 52
                //   * Yellow, 3px circles when point count is between 27 and 23
                //   * orange when its below 23.
                'circle-color': [
                    'step',
                    ['get', 'point_count'],

                    "#e39f20",
                    23,
                    '#f1f075',
                    36,
                    '#008080',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    15,
                    23,
                    36,
                    750,
                    40
                ]
            }

        });

        mapWrapper.map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: "bikes",
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });
        // add geojson to source, see mapbox documentation
        // link source to layer and add layer to map, see mapbox documentation
    });
});