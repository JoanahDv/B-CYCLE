class Slider {
    timeCounter = 1000;
    
    constructor() {
        this.sliderInterval = setInterval(this.nextSlide, this.timeCounter);
    }
 
    nextSlide() {
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

    previousSlide(){
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
    }
  
    play() {
        this.sliderInterval = setInterval(this.nextSlide, this.timeCounter);
        $("#play").css("display", "none");
        $("#pause").css("display", "block");

    }

    pause() {
        clearInterval(this.sliderInterval);
        $("#play").css("display", "block");
        $("#pause").css("display", "none");
    }
}