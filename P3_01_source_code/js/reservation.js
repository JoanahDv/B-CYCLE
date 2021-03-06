//RESERVATION FORM
class ReservationForm {

    constructor(timer, canvas){
        this.timer = timer;
        this.canvas = canvas;
    }

    saveInformation() {
        var f_name = $("#first_name").val();
        var l_name = $("#last_name").val();
        var text_error_fname = $(".text_error_fname");
        var text_error_lname = $(".text_error_lname");
        var action_reservation = $(".station-info p");
        var station = $("#station_address").html();

        if (f_name == "" && l_name == "") { // if firstname is empty OR lastname is empty      
            text_error_fname.addClass("text_error_visible");
            text_error_lname.addClass("text_error_visible");
        }
        else if (f_name != "" && l_name == "") { // if firstname is empty OR lastname is not empty       
            text_error_lname.addClass("text_error_visible");
            text_error_fname.removeClass("text_error_visible");
        }
        else if (l_name != "" && f_name == "") { // if last name is not empty and  first name is empty
            text_error_fname.addClass("text_error_visible");
            text_error_lname.removeClass("text_error_visible");
        }
        else { // if last name is not empty and  first name is not  empty
            text_error_fname.removeClass("text_error_visible"); // remove texts
            text_error_lname.removeClass("text_error_visible");
            // display canvas for signature

            $(".instructions").show();
            action_reservation.hide();
            $('#prefooter').show();

            // $('#instructions').show();

            //saving names in localstorage
            localStorage.setItem("first_name", f_name);
            localStorage.setItem("last_name", l_name);
            localStorage.setItem("station_address", station);
            this.setReservationUsername();
            this.setUserStation();


        }
    }


    setReservationUsername() {
        var firstname = localStorage.getItem("first_name");
        var lastname = localStorage.getItem("last_name");
        $("#user_name").html(firstname + " " + lastname);
    }

    setUserStation() {
        var station = localStorage.getItem("station_address");
        $("#user_station").html(station);
    }

    cancelReservation() {
        var action_reservation = $(".station-info p");

        action_reservation.show();
        $('#instructions').hide();
        localStorage.clear();
        this.timer.setTimertoZero();
        $("#user_station").html(" ");
        console.log("cancel button on click");
        $('#prefooter').hide();
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        $(".station-info").hide();

    }

    activateReservation() {
        // resume timer
        let seconds = sessionStorage.getItem('seconds');
        $("#seconds").html(seconds);
        let minutes = sessionStorage.getItem('minutes');
        $("#minutes").html(minutes);
        this.timer.startTimer(minutes, seconds);

        // display timer
        $('#bicyleInfo').css({ 'display': 'block' });
        $('.noreserve_info').css({ 'display': 'none' });
        this.setReservationUsername();
        this.setUserStation();
    }
}