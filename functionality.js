var breakMinus = document.getElementById("break_minus").addEventListener("click", minusBreak);
var breakPlus = document.getElementById("break_plus").addEventListener("click", addBreak);
var sessionMinus = document.getElementById("session_minus").addEventListener("click", minusSession);
var sessionPlus = document.getElementById("session_plus").addEventListener("click", addSession);

var startButton = document.getElementById("start").addEventListener("click", startTimer);
var stopButton = document.getElementById("stop").addEventListener("click", stopTimer);

var timeDisplay = document.getElementById("time_display");
var sessionMinutes = document.getElementById("session");
var breakMinutes = document.getElementById("break");

var breakCounter = 3; // minimum break length
var sessionCounter = 25; // minimum session length

var timerInterval;

setSessionTimer(); // set default time display to 25 minute session

// Functionality of + and - buttons for setting break and session length

function minusBreak() { // subtracting time from break
    var min = 3;

    if (breakCounter != min) {
        breakCounter--;
        breakMinutes.innerHTML = breakCounter;
    }
    setBreakTimer();
}

function addBreak() { // adding time to break
    var max = 30;

    if (breakCounter != max) {
        breakCounter++;
        breakMinutes.innerHTML = breakCounter;
    }
    setBreakTimer();
}

function minusSession() { // subtracting time from session
    var min = 25;

    if (sessionCounter != min) {
        sessionCounter -= 5;
        sessionMinutes.innerHTML = sessionCounter;
    }
    setSessionTimer(); // update time display to session length
}

function addSession() { // adding time to session
    var max = 60;

    if (sessionCounter != max) {
        sessionCounter += 5;
        sessionMinutes.innerHTML = sessionCounter;
    }
    setSessionTimer(); // update time display to session length
}

// Change timer display for session and break

function setSessionTimer() { // set time display to session length
    timeDisplay.className = "sessionTime";
    timeDisplay.innerHTML = sessionMinutes.innerHTML + ":00";
}

function setBreakTimer() { // set time display to break length
    var minutes = parseInt(breakMinutes.innerHTML);
    timeDisplay.className = "breakTime";

    if (minutes < 10) {
        timeDisplay.innerHTML = "0" + breakMinutes.innerHTML + ":00";
    } else {
        timeDisplay.innerHTML = breakMinutes.innerHTML + ":00";
    }
}

// Session and break countdown functionality

function sessionTimer() { // session countdown
    var timer = sessionCounter * 60; // multiply by 60 to get minutes

    timerInterval = setInterval(function () {
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.innerHTML = minutes + ":" + seconds;

        if (timer < sessionCounter * 60 && timer > 0) { // disable start button after timer starts
            document.getElementById("start").disabled = true;
        }

        if (--timer < 0) {
            clearInterval(timerInterval);
            setBreakTimer(); // set display to break time when session is up
            changeBreakBackgroundColor();
        }
    }, 1000);
}

function breakTimer() { // break countdown
    var timer = breakCounter  * 60; // multiply by 60 to get minutes

    timerInterval = setInterval(function () {
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.innerHTML = minutes + ":" + seconds;

        if (timer < sessionCounter * 60 && timer > 0) { // disable start button after timer starts
            document.getElementById("start").disabled = true;
        }

        if (--timer < 0) {
            clearInterval(timerInterval);
            setSessionTimer(); // set display to session time when break is up
            changeSessionBackgroundColor();
        }
    }, 1000);
}

// Start and stop button functionality

function startTimer() { // start button
    if (timeDisplay.className == "sessionTime") { // call session timer
        changeSessionBackgroundColor();
        sessionTimer();
    } else if (timeDisplay.className == "breakTime") { // call break timer
        changeBreakBackgroundColor();
        breakTimer();
    }
}

function stopTimer() { // stop button
    clearInterval(timerInterval);
    clearBackgroundColor();
    timeDisplay.innerHTML = "00:00";
    document.getElementById("start").disabled = false; // enable start button
}

// Change background color depending on session or break timer

function changeSessionBackgroundColor() { // background color for session timer
    document.getElementById("session_heading").style.background = "#aadeed";
    timeDisplay.style.background = "#aadeed";
    document.getElementById("break_heading").style.background = "transparent";
}

function changeBreakBackgroundColor() { // background color for break timer
    document.getElementById("break_heading").style.background = "#efaeae";
    timeDisplay.style.background = "#efaeae";
    document.getElementById("session_heading").style.background = "transparent";
}

function clearBackgroundColor() { // clear background color when timer stopped
    document.getElementById("break_heading").style.background = "transparent";
    document.getElementById("session_heading").style.background = "transparent";
   timeDisplay.style.background = "transparent";
}