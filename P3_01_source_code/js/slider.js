//  // SLIDER IMAGES 
// $(".next").on("click", function() {
//     nextSlide();
// });
// $(".previous").on("click", function() {
//     var sliderImages = $(".slideshow-container figure.sliderimages");
//     var current = $(".active");
//     var last = sliderImages[sliderImages.length - 1];
//     var first = sliderImages[0];
//     if(current[0] == first) { // if current image is first image
//         var previous = $(last); // go back to last image
//     } else {
//         var previous = $(".active").prev(".sliderimages"); // go to previous image
//     }
//     previous.addClass("active");
//     previous.removeClass("inactive");
//     current.removeClass("active");
//     current.addClass("inactive");
// });

// function nextSlide() {
//     var sliderImages = $(".slideshow-container figure.sliderimages");
//     var current = $(".active");

//     if(sliderImages[sliderImages.length - 1] == current[0]) { // if current image is last image
//         var next = $(sliderImages[0]); // go back to first image
//     } else {
//         var next = $(".active").next(".sliderimages"); // go to next image
//     }
//     next.addClass("active");
//     next.removeClass("inactive");
//     current.removeClass("active");
//     current.addClass("inactive");
// }
// // SLIDER TIME COUNTER
// var timeCounter = 5000;
// var sliderInterval = setInterval(nextSlide, timeCounter);
// //Pause Slider
// $("#pause").click(function() {
//     clearInterval(sliderInterval);
// });
// //Play Slider
// $("#play").click(function() {
//     sliderInterval = setInterval(nextSlide, timeCounter);
// });
// //PAUS AND PLAY


// var playPause = document.getElementById("pause_play");

// pause.addEventListener("click", function() {
//     if (video.paused == true) {
//         // Play the video
//         video.play();

//         // Update the button text to 'Pause'
//         pause_play.classList.toggle('pause');
//     } else {
//         // Pause the video
//         video.pause();

//         // Update the button text to 'Play'
//         pause_play.classList.toggle('pause');
//     }
// });