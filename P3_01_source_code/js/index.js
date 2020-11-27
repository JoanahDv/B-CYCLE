
//getting local storage
var f_name = localStorage.getItem("first_name");
$("#first_name").val(f_name);
var l_name = localStorage.getItem("last_name");
$("#last_name").val(l_name);

var reservationTimer = new ReservationTimer();
var slider = new Slider();
var canvas = new Canvas();
var reservation = new ReservationForm(reservationTimer, canvas);

// NOT TO LOSE THE REFERENCE "THIS", ALL EVENTS ARE LISTED HERE
// example with slider, reference to this is lost in method nextSlide, this is now a reference
// to $("#next") instead of slider
// class Slider() {
//     constructor() {
//         $("#next").click(this.nextSlide);
//         this.slideIndex = 0;
//     }
//     nextSlide() {
//         this.slideIndex = this.slideIndex + 1;
//     }
// }
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
        reservation.cancelReservation();
    });

    // timer 
    if (sessionStorage.getItem('minutes') != null) {  // if active reservation
        reservation.activateReservation();
    }

    // reservation form
    $("#signup_form").on("submit", function (event) {
        // this will prevent the page from refreshing 
        event.preventDefault();  
        reservation.saveInformation(event);
    });

    //map
    mapWrapper.map.on('load', function(event) { 
        $.get(bikeApiUrl, function (stations) { // 
            mapWrapper.onload(stations);
        });
    });           

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

