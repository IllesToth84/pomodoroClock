
function incrementBreak() {
    let breakLength = document.getElementById("break-length");
    if (parseFloat(breakLength.innerText) < 60) {
        breakLength.innerText = parseFloat(breakLength.innerText) + 1;
    }
};

function decrementBreak() {
    let breakLength = document.getElementById("break-length");
    if (parseFloat(breakLength.innerText) > 0) {
        breakLength.innerText = parseFloat(breakLength.innerText) - 1;
    }
};

function incrementSession() {
    let sessionLength = document.getElementById("session-length");
    if (parseFloat(sessionLength.innerText) < 60) { 
    let incrementSessionValue = parseFloat(sessionLength.innerText) + 1;
    sessionLength.innerText =  incrementSessionValue;
    document.getElementById("time").innerText = incrementSessionValue + ":00";
}
};

function decrementSession() {
    let sessionLength = document.getElementById("session-length");
    if (parseFloat(sessionLength.innerText) > 0) {
    let decrementSessionValue = parseFloat(sessionLength.innerText) - 1;
    sessionLength.innerText =  decrementSessionValue;
    var defaultMinutes = ":00";
    document.getElementById("time").innerText = decrementSessionValue + defaultMinutes;
}
};



function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let sessionLengthValue = document.getElementById("session-length").innerText;
    var actualSessionValue = document.getElementById("time").innerText.slice(0,2);
    console.log(sessionLengthValue);
    console.log(actualSessionValue);

function setInt() {    
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000 
    )};

    if (actualSessionValue == sessionLengthValue) { 
        setInt();   
     } else {
        clearInterval(setInt);
    }
};

function toggleClockOnOrOff() {
    var actualSessionValue = document.getElementById("time").innerText.slice(0,2);
    console.log(actualSessionValue);
    var sessionMinutes = 60 * actualSessionValue,
    display = document.querySelector('#time');
    startTimer(sessionMinutes, display);
};

function resetClock() {
    
    document.getElementById("break-length").innerText = "5";
    document.getElementById("session-length").innerText = "25";
    document.getElementById("time").innerText = "25:00";
}
 