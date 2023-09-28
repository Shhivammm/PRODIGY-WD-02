// Variables
let startTime;
let interval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapResetBtn = document.getElementById("lapReset");
const lapList = document.getElementById("lapList");

// Start/Stop and Lap/Reset functions
function startStop() {
    if (running) {
        clearInterval(interval);
        startStopBtn.textContent = "Start";
        lapResetBtn.textContent = "Reset";
    } else {
        startTime = startTime || new Date().getTime();
        interval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Stop";
        lapResetBtn.textContent = "Lap";
    }
    running = !running;
}

function lapReset() {
    if (running) {
        const lapTime = formatTime(new Date().getTime() - startTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    } else {
        startTime = undefined;
        lapCount = 1;
        display.textContent = "00:00:00";
        lapList.innerHTML = "";
    }
}

// Helper function to format time as hh:mm:ss
function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

// Update the display
function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Event listeners
startStopBtn.addEventListener("click", startStop);
lapResetBtn.addEventListener("click", lapReset);
