let startTime;
let updatedTime;
let difference;
let timerID;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerID = setInterval(update, 1000 / 60);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerID);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function update() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function reset() {
    clearInterval(timerID);
    display.textContent = '00:00:00';
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        laps.push(formatTime(difference));
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(difference)}`;
        lapsList.appendChild(lapItem);
    }
}
