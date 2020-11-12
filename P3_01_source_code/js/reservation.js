function updateTimer() {
    reservationTime = reservationTime - reservationInterval;
    var seconds = reservationTime % 60;
    var minutes = Math.floor(reservationTime / 60);
    // if(minute == 0)
    $('#seconds').html(seconds);
    $('#minutes').html(minutes);
    sessionStorage.setItem('seconds', seconds);
    sessionStorage.setItem('minutes', minutes);
    if(minutes == 0 && seconds == 0){
        clearInterval(updateTimer);
      }
    if(reservationTime == 0){
        clearInterval(timerInterval);
        sessionStorage.removeItem('seconds');
        sessionStorage.removeItem('minutes');
        alert("YOUR SESSION HAS EXPIRED.")
    }
}

// function setTimertoZero(){
//     clearInterval(timerInterval);
//     sessionStorage.removeItem('seconds');
//     sessionStorage.removeItem('minutes');
//     alert("YOUR SESSION HAS EXPIRED.")
// }


function startTimer(minutes, seconds) {
    if (minutes !== undefined && seconds !== undefined && reservationTime < 0) {  // call without parameters (on form save)
        reservationTime = parseInt(minutes) * 60 + parseInt(seconds);
    }
    timerInterval = setInterval(updateTimer, reservationInterval * 1000); // update time every 1 second 
}
var timerInterval;
clearInterval(timerInterval);


  
//cancel button
// function cancelReservation() {
//     var cancleReserve = $("#signup_form");
// }
