// Timer variables
let timer;
let endTime;
let isPaused = false;
let pausedTime = 0;

// Stopwatch variables
let stopwatchTimer;
let stopwatchStartTime;
let stopwatchElapsed = 0;
let stopwatchPaused = false;

// Timer elements
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

// Mode toggle elements
const timerModeBtn = document.getElementById('timerModeBtn');
const stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
const timerSection = document.getElementById('timerSection');
const stopwatchSection = document.getElementById('stopwatchSection');

// Stopwatch elements
const stopwatchStartButton = document.getElementById('stopwatchStart');
const stopwatchPauseButton = document.getElementById('stopwatchPause');
const stopwatchStopButton = document.getElementById('stopwatchStop');
const stopwatchResetButton = document.getElementById('stopwatchReset');
const stopwatchMinutesDisplay = document.getElementById('stopwatchMinutes');
const stopwatchSecondsDisplay = document.getElementById('stopwatchSeconds');
const stopwatchMsDisplay = document.getElementById('stopwatchMs');

const fullscreenButton = document.getElementById('fullscreenButton');

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

// Background change functionality
backgroundButton.addEventListener('click', () => {
    currentBackground = (currentBackground + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
});

// Preload all background images
backgrounds.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Mode toggle functionality
timerModeBtn.addEventListener('click', () => {
    timerModeBtn.classList.add('active');
    stopwatchModeBtn.classList.remove('active');
    timerSection.classList.add('active');
    stopwatchSection.classList.remove('active');
});

stopwatchModeBtn.addEventListener('click', () => {
    stopwatchModeBtn.classList.add('active');
    timerModeBtn.classList.remove('active');
    stopwatchSection.classList.add('active');
    timerSection.classList.remove('active');
});

// Timer functionality (original code)
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

// Stopwatch functionality
stopwatchStartButton.addEventListener('click', () => {
    if (!stopwatchPaused) {
        stopwatchStartTime = Date.now() - stopwatchElapsed;
    } else {
        stopwatchStartTime = Date.now() - stopwatchElapsed;
        stopwatchPaused = false;
    }
    stopwatchTimer = setInterval(updateStopwatch, 10);
    stopwatchStartButton.textContent = 'running...';
    stopwatchStartButton.disabled = true;
});

stopwatchPauseButton.addEventListener('click', () => {
    if (!stopwatchPaused) {
        clearInterval(stopwatchTimer);
        stopwatchPaused = true;
        stopwatchStartButton.textContent = 'resume';
        stopwatchStartButton.disabled = false;
        stopwatchPauseButton.textContent = 'paused';
    } else {
        stopwatchStartTime = Date.now() - stopwatchElapsed;
        stopwatchTimer = setInterval(updateStopwatch, 10);
        stopwatchPaused = false;
        stopwatchStartButton.textContent = 'running...';
        stopwatchStartButton.disabled = true;
        stopwatchPauseButton.textContent = 'pause';
    }
});

stopwatchStopButton.addEventListener('click', () => {
    clearInterval(stopwatchTimer);
    stopwatchElapsed = 0;
    stopwatchPaused = false;
    updateStopwatchDisplay(0, 0, 0);
    stopwatchStartButton.textContent = 'start';
    stopwatchStartButton.disabled = false;
    stopwatchPauseButton.textContent = 'pause';
});

stopwatchResetButton.addEventListener('click', () => {
    clearInterval(stopwatchTimer);
    stopwatchElapsed = 0;
    stopwatchPaused = false;
    updateStopwatchDisplay(0, 0, 0);
    stopwatchStartButton.textContent = 'start';
    stopwatchStartButton.disabled = false;
    stopwatchPauseButton.textContent = 'pause';
});

function updateStopwatch() {
    stopwatchElapsed = Date.now() - stopwatchStartTime;
    
    const minutes = Math.floor(stopwatchElapsed / 60000);
    const seconds = Math.floor((stopwatchElapsed % 60000) / 1000);
    const centiseconds = Math.floor((stopwatchElapsed % 1000) / 10);

    updateStopwatchDisplay(minutes, seconds, centiseconds);
}

function updateStopwatchDisplay(minutes, seconds, centiseconds) {
    stopwatchMinutesDisplay.textContent = minutes.toString().padStart(2, '0');
    stopwatchSecondsDisplay.textContent = seconds.toString().padStart(2, '0');
    stopwatchMsDisplay.textContent = centiseconds.toString().padStart(2, '0');
}

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenButton.textContent = 'exit fullscreen';
    } else {
        document.exitFullscreen();
        fullscreenButton.textContent = 'fullscreen';
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.textContent = 'fullscreen';
    }
});