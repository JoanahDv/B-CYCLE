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