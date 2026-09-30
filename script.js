const heartRain = document.getElementById('heartRain');
const musicToggle = document.getElementById('musicToggle');
const rainToggle = document.getElementById('rainToggle');

let rainInterval = null;
let isRainOn = false;
let audioContext = null;
let musicInterval = null;
let isMusicOn = false;

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'falling-heart';
  heart.textContent = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${5 + Math.random() * 6}s`;
  heart.style.fontSize = `${18 + Math.random() * 18}px`;
  heart.style.opacity = `${0.55 + Math.random() * 0.45}`;
  heartRain.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

function toggleRain() {
  isRainOn = !isRainOn;

  if (isRainOn) {
    rainInterval = setInterval(createHeart, 220);
    rainToggle.textContent = '💔 Detener lluvia de corazones';
  } else {
    clearInterval(rainInterval);
    rainToggle.textContent = '💖 Hacer llover corazones';
    heartRain.innerHTML = '';
  }
}

function startRomanticMelody() {
  const melody = [329.63, 392.0, 440.0, 392.0, 523.25, 493.88, 440.0, 392.0, 349.23, 392.0, 440.0, 392.0];

  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtx();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  melody.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.0001, now + index * 0.42);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + index * 0.42 + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.42 + 0.38);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now + index * 0.42);
    oscillator.stop(now + index * 0.42 + 0.4);
  });
}

function toggleMusic() {
  isMusicOn = !isMusicOn;

  if (isMusicOn) {
    startRomanticMelody();
    musicToggle.textContent = '🔇 Pausar música';
    musicInterval = setInterval(startRomanticMelody, 1700);
  } else {
    clearInterval(musicInterval);
    musicToggle.textContent = '🔊 Encender música';
  }
}

rainToggle.addEventListener('click', toggleRain);
musicToggle.addEventListener('click', toggleMusic);

window.addEventListener('load', () => {
  setTimeout(() => {
    toggleRain();
  }, 800);
});
