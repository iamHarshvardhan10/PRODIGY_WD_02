let isRunning = false;
let interval;
let time = 0;
let lapTimes = [];

function startPause() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById('startPause').innerHTML = 'Resume';
    } else {
        interval = setInterval(updateDisplay, 1000);
        document.getElementById('startPause').innerHTML = 'Pause';
    }

    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    time = 0;
    lapTimes = [];
    document.getElementById('startPause').innerHTML = 'Start';
    updateDisplay();
    updateLapList();
}

function lap() {
    if (isRunning) {
        lapTimes.push(time);
        updateLapList();
    }
}

function updateDisplay() {
    time++;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    document.getElementById('display').innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Lap ${index + 1}: ${formatTime(Math.floor(lapTime / 3600))}:${formatTime(Math.floor((lapTime % 3600) / 60))}:${formatTime(lapTime % 60)}`;
        lapList.appendChild(li);
    });
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
