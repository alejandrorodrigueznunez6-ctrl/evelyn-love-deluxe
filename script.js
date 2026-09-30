const heartRain = document.getElementById('heartRain');
const loveButton = document.getElementById('loveButton');

let rainInterval = null;

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'falling-heart';
  heart.textContent = '❤';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.fontSize = `${18 + Math.random() * 18}px`;
  heart.style.opacity = `${0.55 + Math.random() * 0.45}`;
  heartRain.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

function startRain() {
  if (rainInterval) return;
  rainInterval = setInterval(createHeart, 240);
}

loveButton.addEventListener('click', () => {
  loveButton.classList.add('clicked');
  startRain();

  const burst = document.createElement('div');
  burst.className = 'burst';
  burst.textContent = 'Te amo 💖';
  burst.style.position = 'fixed';
  burst.style.left = '50%';
  burst.style.top = '50%';
  burst.style.transform = 'translate(-50%, -50%)';
  burst.style.fontSize = '1.6rem';
  burst.style.fontWeight = '800';
  burst.style.color = '#d63f72';
  burst.style.background = 'rgba(255,255,255,0.75)';
  burst.style.padding = '12px 18px';
  burst.style.borderRadius = '999px';
  burst.style.boxShadow = '0 16px 32px rgba(214, 63, 114, 0.2)';
  burst.style.zIndex = '20';
  burst.style.animation = 'floatUp 1.8s ease forwards';
  document.body.appendChild(burst);

  setTimeout(() => {
    burst.remove();
    loveButton.classList.remove('clicked');
  }, 1800);
});

const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% { opacity: 0; transform: translate(-50%, -30%) scale(0.8); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translate(-50%, -140%) scale(1.2); }
  }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
  setTimeout(startRain, 500);
});