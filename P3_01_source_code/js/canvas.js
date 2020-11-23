var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var x = null; //rien
var y = null; //rien
var isDrawing = false;
var clearCanvas = document.getElementById('buttonclear');
var saveCanvas = document.getElementById('buttonsave');
var cancelCanvas = document.getElementById("buttoncancel");
var hasSigned = false;

var instruction = document.getElementById('instructions');

 

$("#canvas").on("mousedown",onmousestart);
$("#canvas").on("touchstart",onmousestart);


function onmousestart(e) { //canvas.addEventListener('mousedown',e => {
    var rect = e.target.getBoundingClientRect();
    if (e.offsetX == undefined) {
        x = e.changedTouches[0].pageX - rect.left;
        y = e.changedTouches[0].pageY - rect.top;
    } else {
        x = e.offsetX;
        y = e.offsetY;
    }

    isDrawing = true;
};

$("#canvas").on("mousemove", onmousemove);
$("#canvas").on("touchmove", onmousemove);

function onmousemove(e) {
    var rect = e.target.getBoundingClientRect();
    if(isDrawing === true) {
        if (e.offsetX == undefined) {
            drawLine(context, x, y, e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
            x = e.changedTouches[0].pageX - rect.left;
            y = e.changedTouches[0].pageY - rect.top;
        } else {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;

            hasSigned = true;
        }
    }
}

window.addEventListener('mouseup',onmousestop);
window.addEventListener('touchend',onmousestop);
function onmousestop(e) {
    if(isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
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

