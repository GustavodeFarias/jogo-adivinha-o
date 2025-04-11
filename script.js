let randomNumber;
let attemptsLeft = 10;
let timeLeft = 30;
let timer;
let showHints = true;

const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const resultText = document.getElementById('resultText');
const attemptsLeftSpan = document.getElementById('attemptsLeft');
const timeLeftSpan = document.getElementById('timeLeft');
const guessHistory = document.getElementById('guessHistory');

const toggleHintBtn = document.getElementById('toggleHintBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const toggleFullScreenBtn = document.getElementById('toggleFullScreenBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('gameArea');

let themeIndex = 0;
const themes = ['light-mode', 'dark-mode', 'vibrant-mode'];

function startGame() {
  gameArea.classList.remove('hidden');
  startBtn.classList.add('hidden');
  resetBtn.classList.add('hidden');
  attemptsLeft = 10;
  timeLeft = 30;
  guessHistory.innerHTML = '';
  resultText.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  checkBtn.disabled = false;
  attemptsLeftSpan.textContent = attemptsLeft;
  timeLeftSpan.textContent = timeLeft;
  timeLeftSpan.classList.remove('warning', 'danger');

  randomNumber = Math.floor(Math.random() * 100) + 1;
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function resetGame() {
  startGame();
}

function updateTime() {
  timeLeft--;
  timeLeftSpan.textContent = timeLeft;

  if (timeLeft <= 10) timeLeftSpan.classList.add('warning');
  if (timeLeft <= 5) timeLeftSpan.classList.add('danger');

  if (timeLeft <= 0) {
    clearInterval(timer);
    endGame(false);
  }
}

function checkGuess() {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    resultText.textContent = 'Digite um número entre 1 e 100!';
    return;
  }

  const li = document.createElement('li');
  li.textContent = `Tentativa: ${guess}`;
  guessHistory.appendChild(li);

  if (guess === randomNumber) {
    endGame(true);
    return;
  }

  attemptsLeft--;
  attemptsLeftSpan.textContent = attemptsLeft;

  if (attemptsLeft <= 0) {
    endGame(false);
    return;
  }

  if (showHints) {
    const diff = Math.abs(randomNumber - guess);
    if (diff <= 5) {
      resultText.textContent = '🔥 Você está MUITO perto!';
    } else if (diff <= 10) {
      resultText.textContent = '😬 Está perto!';
    } else if (guess < randomNumber) {
      resultText.textContent = '🔼 É maior!';
    } else {
      resultText.textContent = '🔽 É menor!';
    }
  } else {
    resultText.textContent = 'Continue tentando!';
  }

  guessInput.value = '';
  guessInput.focus();
}

function endGame(won) {
  guessInput.disabled = true;
  checkBtn.disabled = true;
  clearInterval(timer);
  resetBtn.classList.remove('hidden');
  resultText.textContent = won
    ? `🎉 Parabéns! Você acertou o número ${randomNumber}!`
    : `💥 Que pena! O número era ${randomNumber}.`;
}

function toggleHints() {
  showHints = !showHints;
  toggleHintBtn.textContent = showHints ? 'Desativar Dicas' : 'Ativar Dicas';
}

function toggleTheme() {
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.className = themes[themeIndex];
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Erro ao entrar em tela cheia: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', checkGuess);
toggleHintBtn.addEventListener('click', toggleHints);
toggleThemeBtn.addEventListener('click', toggleTheme);
toggleFullScreenBtn.addEventListener('click', toggleFullScreen);
