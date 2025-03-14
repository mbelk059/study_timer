let timer;
let totalSeconds = 0;
let isPaused = false;
let alarmSound = new Audio('./sounds/rj_pasin.mp3');
let alarmPlayed = false;  // New flag to prevent sound from playing multiple times

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
    currentBackground = (currentBackground + 1) % backgrounds.length; // Cycle through the images
    document.body.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
});

startButton.addEventListener('click', () => {
    const minutes = parseInt(timeInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }
    totalSeconds = minutes * 60;
    isPaused = false;
    alarmPlayed = false;  // Reset alarmPlayed flag when starting a new timer
    startTimer();
});

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'resume' : 'pause';
});

stopButton.addEventListener('click', () => {
    isPaused = true;
    stopModal.style.display = 'flex'; // Show the modal
});

confirmStopButton.addEventListener('click', () => {
    clearInterval(timer);
    totalSeconds = 0;
    updateDisplay(0, 0);
    pauseButton.textContent = 'pause';
    stopModal.style.display = 'none'; // Hide the modal
});

cancelStopButton.addEventListener('click', () => {
    isPaused = false;
    stopModal.style.display = 'none'; // Hide the modal without stopping
});

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPaused && totalSeconds > 0) {
            totalSeconds--;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            updateDisplay(minutes, seconds);
        } else if (totalSeconds === 0 && !alarmPlayed) {  // Only play alarm if it hasn't been played yet
            alarmSound.play();
            clearInterval(timer);
            alarmPlayed = true;  // Set the flag to true after playing the sound // Play sound first
            setTimeout(() => {
                alert("Time's up! Great job!"); // Show the alert after sound plays
            }, 500); // Delay alert by 500ms to allow the sound to start before the alert
        }
    }, 1000);
}

function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}
