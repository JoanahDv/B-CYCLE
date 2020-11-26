class Canvas {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
     x = null; //rien
     y = null; //rien
     isDrawing = false;
     clearCanvas = document.getElementById('buttonclear');
     saveCanvas = document.getElementById('buttonsave');
     cancelCanvas = document.getElementById("buttoncancel");
     hasSigned = false;
     instruction = document.getElementById('instructions');

    constructor(){
        $("#canvas").on("mousedown",this.onmousestart);
        $("#canvas").on("touchstart",this.onmousestart);
        $("#canvas").on("mousemove", this.onmousemove);
        $("#canvas").on("touchmove", this.onmousemove);
        window.addEventListener('mouseup',this.onmousestop);
        window.addEventListener('touchend',this.onmousestop);
    }

    onmousestart(e) { //canvas.addEventListener('mousedown',e => {
        var rect = e.target.getBoundingClientRect();
        if (e.offsetX == undefined) {
            this.x = e.changedTouches[0].pageX - rect.left;
            this.y = e.changedTouches[0].pageY - rect.top;
        } else {
            this.x = e.offsetX;
            this.y = e.offsetY;
        }

        this.isDrawing = true;
    }
    onmousemove(e) {
        var rect = e.target.getBoundingClientRect();
        if(this.isDrawing === true) {
            if (e.offsetX == undefined) {
                drawLine(context, x, y, e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
                this.x = e.changedTouches[0].pageX - rect.left;
                this.y = e.changedTouches[0].pageY - rect.top;
            } else {
                drawLine(context, x, y, e.offsetX, e.offsetY);
                this.x = e.offsetX;
                this.y = e.offsetY;
                this.hasSigned = true;
            }
        }
    }
    onmousestop(e) {
        if(this.isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            this.x = 0;
            this.y = 0;
            this.isDrawing = false;
        }
    }

    drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    }
}

$("#buttonclear").on('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// To validate the signature to display the status of the reservation.
// --> Once the signature is validated, the reservation is authorized.

$("#buttonsave").on("click", function() {
    // reuse what is done in the reserve area
    // by putting the common code in a function (form validation)
    var f_name = $("#first_name").val();
    var l_name = $("#last_name").val();
    var text_error_fname = $(".text_error_fname");
    var text_error_lname = $(".text_error_lname");
    // var saveCanvas = document.getElementById('buttonsave');
    var infoReservation = $("#bicyleInfo");
    var footerInfo = $(".footer_info");
    // var timer = $("#timer");
    // var canvaInfo = $(".instructions");
    if(f_name == "" && l_name == "") { // if firstname is empty OR lastname is empty        
        text_error_fname.addClass("text_error_visible");
        text_error_lname.addClass("text_error_visible");
    } else {
        // if click on save after signature then show information on reservation with timer
        text_error_fname.removeClass("text_error_visible");
        text_error_lname.removeClass("text_error_visible");
        if(hasSigned === true) {
            reservationTimer.startTimer();
            infoReservation.show();
            footerInfo.hide();

        }

    }
});
//Button cancel 
 $('#buttoncancel').on('click', function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    $('#instructions').hide();
    localStorage.clear();
     
 });
// $("#buttoncancel").on("click", function() {
//     $('.noreserve_info').css({'display': 'none'}
//     )
// });

