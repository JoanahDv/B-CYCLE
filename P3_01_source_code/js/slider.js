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