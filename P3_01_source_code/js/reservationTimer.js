var currentReservationTime = reservationTime; // needs to be global

class ReservationTimer {
    timerInterval = null;

    updateTimer() {
        currentReservationTime = currentReservationTime - reservationInterval;
        var seconds = currentReservationTime % 60;
        var minutes = Math.floor(currentReservationTime / 60);
        // if(minute == 0)
        $('#seconds').html(seconds);
        $('#minutes').html(minutes);
        sessionStorage.setItem('seconds', seconds);
        sessionStorage.setItem('minutes', minutes);
        if(minutes == 0 && seconds == 0){
            clearInterval(this.updateTimer);
        }
        if(this.currentReservationTime == 0){
            clearInterval(this.timerInterval);
            sessionStorage.removeItem('seconds');
            sessionStorage.removeItem('minutes');
            alert("YOUR SESSION HAS EXPIRED.")
        }
    }

    setTimertoZero(){
        clearInterval(this.timerInterval);
        sessionStorage.removeItem('seconds');
        sessionStorage.removeItem('minutes');
        alert("YOUR SESSION HAS EXPIRED.")
        }


    startTimer(minutes, seconds) {
        clearInterval(this.timerInterval);  //add clear interval at the begining of timer so you dont have different reservations
        if (minutes !== undefined && seconds !== undefined) {  // call without parameters (on form save)
            currentReservationTime = parseInt(minutes) * 60 + parseInt(seconds);
        }
        else
        {
            currentReservationTime = reservationTime; 
        }

        this.timerInterval = setInterval(this.updateTimer, reservationInterval * 1000); // update time every 1 second 
    }
} 
// var timerInterval; 
//  make contructor 
// var currentReservationTime = reservationTime;
// clearInterval(timerInterval);
