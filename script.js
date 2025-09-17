let timer;
let endTime;
let isPaused = false;
let pausedTime = 0;

const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

const stopModal = document.getElementById('stopModal');
const confirmStopButton = document.getElementById('confirmStop');
const cancelStopButton = document.getElementById('cancelStop');

const backgroundButton = document.getElementById('backgroundButton');

const backgrounds = [
    './images/chihiro043.png',
    './images/chihiro014.jpg',
    './images/totoro041.jpg',
    './images/totoro025.jpg',
    './images/ponyo050.jpg',
    './images/ponyo038.jpg',
    './images/ponyo006.jpg',
    './images/howl011.jpg',
    './images/karigurashi002.jpg',
];

let currentBackground = 0;

backgroundButton.addEventListener('click', () => {
    currentBackground = (currentBackground + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
});

startButton.addEventListener('click', () => {
    const minutes = parseInt(timeInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    clearInterval(timer);
    endTime = Date.now() + minutes * 60 * 1000;
    isPaused = false;
    pausedTime = 0;

    timer = setInterval(updateTimer, 200);
});

pauseButton.addEventListener('click', () => {
    if (!endTime) return; // ignore if timer never started
    if (!isPaused) {
        isPaused = true;
        pausedTime = endTime - Date.now();
        clearInterval(timer);
        pauseButton.textContent = 'resume';
    } else {
        isPaused = false;
        endTime = Date.now() + pausedTime;
        timer = setInterval(updateTimer, 200);
        pauseButton.textContent = 'pause';
    }
});

stopButton.addEventListener('click', () => {
    if (!endTime) return;
    isPaused = true;
    stopModal.style.display = 'flex';
});

confirmStopButton.addEventListener('click', () => {
    clearInterval(timer);
    endTime = null;
    updateDisplay(0, 0);
    pauseButton.textContent = 'pause';
    stopModal.style.display = 'none';
});

cancelStopButton.addEventListener('click', () => {
    isPaused = false;
    if (pausedTime > 0) {
        endTime = Date.now() + pausedTime;
        timer = setInterval(updateTimer, 200);
    }
    stopModal.style.display = 'none';
});

function updateTimer() {
    if (isPaused) return;

    const now = Date.now();
    let remaining = endTime - now;

    if (remaining <= 0) {
        clearInterval(timer);
        updateDisplay(0, 0);
        alert("Time's up! Great job!");
        return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    updateDisplay(minutes, seconds);
}

function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}
