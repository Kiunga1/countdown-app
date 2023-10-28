"use strict"

//Variable to store our countdown and DOM elements
let countdown;

const h1TimeLeft = document.querySelector('.display__time-left');
const pEndTime = document.querySelector('.display__end-time');
const buttonsCtrl = document.querySelectorAll(".timer__button");

/**
 * timer - runs the countdown sequence
 * @param {number} seconds /time in seconds
 */

function timer(seconds) {
    //clear pre-existing timers
    clearInterval(countdown);


    const now = Date.now();
    const future = now + seconds * 1000;

    //Display end time and initial time left
    displayEndTime(future);
    displayTimeLeft(seconds);

    //updates countdown every second
    countdown = setInterval(function() {
        const newNow = Date.now();
        const secondsLeft = Math.round((future - newNow) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

//displayTimeLeft Formats and displays the remaining time.
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = seconds % 60;

    const displayTime = `${minutes < 10 ? "0" : ""}${minutes}:${
        remSeconds < 10 ? "0" : ""
    }${remSeconds}`;

    h1TimeLeft.textContent = displayTime;
}

//displayEndTime formats and displays the end time.
function displayEndTime(future) {
    const endTime = new Date(future);
    const hours = endTime.getHours();
    const adjustedHours = hours > 12 ? hours - 12 : hours;
    const minutes = endTime.getMinutes();
    const AMPM = hours > 12 ? "PM" : "AM";
    const displayEnd = `Be Back At ${adjustedHours < 10 ? "0" : ""}${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${AMPM}`;

    pEndTime.textContent = displayEnd;
}

//Event listeners for timer buttons
//iterate through each button and get time from each buttons dataset.
buttonsCtrl.forEach(button => 
    button.addEventListener("click", function (event) {
        timer(parseInt(event.target.dataset.time));
    })
);

//Event listener for custom form submission
document.customForm.addEventListener("submit", event => {
    event.preventDefault();

    //check for empty or non-numbers
    if (event.target.minutes.value === '' || !parseInt(event.target.minutes.value) ){
    alert("Please enter a number");
    event.target.reset();
    return;
    }

    //Start timer with entered minutes
    timer(event.target.minutes.value * 60);

    //Reset the form
    event.target.reset();
});

