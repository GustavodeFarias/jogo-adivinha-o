let randomNumber; // Número aleatório entre 1 e 100
let attemptsLeft; // Tentativas restantes
let timeLeft = 30; // Tempo restante (em segundos)
let timer; // Variável para o timer
let bestScore = localStorage.getItem('bestScore') || 10; // Melhor desempenho guardado no localStorage

const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('checkBtn');
const resultText = document.getElementById('result');
const attemptsText = document.getElementById('attemptsLeft');
const timeText = document.getElementById('time');
const guessHistory = document.getElementById('guessHistory');
const toggleThemeButton = document.getElementById('toggleTheme');
const toggleHintButton = document.getElementById('toggleHint');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const bestAttemptsText = document.getElementById('bestScore');

// Função para atualizar o tempo
function updateTime() {
    timeLeft--;
    timeText.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer); // Para o timer
        resultText.textContent = `Você perdeu! O número era ${randomNumber}.`;
        checkButton.disabled = true; // Desativa o botão após o tempo acabar
    }
}

// Função para iniciar o jogo
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Novo número aleatório
    attemptsLeft = 10;
    timeLeft = 30;
    document.getElementById('attemptsLeft').textContent = attemptsLeft;
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('guessHistory').innerHTML = '';
    resultText.textContent = '';
    guessInput.disabled = false;
    checkButton.disabled = false;
    startButton.classList.add('hidden'); // Esconde o botão de iniciar
    resetButton.classList.remove('hidden'); // Exibe o botão de reiniciar
    clearInterval(timer); // Para o timer
    timer = setInterval(updateTime, 1000); // Reinicia o timer
}

// Função para dar dicas com base na proximidade
function giveProximityHint(userGuess) {
    const difference = Math.abs(randomNumber - userGuess);

    if (difference === 0) {
        document.body.style.backgroundColor = '#2ecc71'; // Verde para acerto
        return "Você acertou!";
    } else if (difference <= 5) {
        document.body.style.backgroundColor = '#f39c12'; // Laranja para perto
        return "Você está MUITO perto!";
    } else if (difference <= 15) {
        document.body.style.backgroundColor = '#f1c40f'; // Amarelo para moderado
        return "Você está perto!";
    } else {
        document.body.style.backgroundColor = '#e74c3c'; // Vermelho para longe
        return "Você está longe do número.";
    }
}

checkButton.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);

    // Verifica se o valor inserido é um número válido
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultText.textContent = 'Por favor, insira um número entre 1 e 100!';
        return;
    }

    // Exibe a tentativa na lista
    const li = document.createElement('li');
    li.textContent = `Tentativa: ${userGuess}`;
    guessHistory.appendChild(li);

    // Verifica se o jogador adivinhou o número
    if (userGuess === randomNumber) {
        resultText.textContent = 'Parabéns! Você acertou o número!';
        resultText.style.color = 'green';
        attemptsText.textContent = 'Você acertou em ' + (10 - attemptsLeft + 1) + ' tentativas!';
        if (attemptsLeft < bestScore) {
            bestScore = attemptsLeft;
            localStorage.setItem('bestScore', bestScore);
        }
        checkButton.disabled = true; // Desativa o botão após acertar
        clearInterval(timer); // Para o timer
        resetButton.classList.remove('hidden'); // Exibe o botão de reiniciar
    } else {
        attemptsLeft--;
        attemptsText.textContent = attemptsLeft;

        // Dicas de proximidade
        resultText.textContent = giveProximityHint(userGuess);

        if (attemptsLeft === 0) {
            resultText.textContent = `Você perdeu! O número era ${randomNumber}.`;
            checkButton.disabled = true; // Desativa o botão após acabar as tentativas
            clearInterval(timer); // Para o timer
            resetButton.classList.remove('hidden'); // Exibe o botão de reiniciar
        }
    }

    guessInput.value = ''; // Limpa o campo de entrada
});

// Função para alternar entre os temas
toggleThemeButton.addEventListener('click', function() {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.replace('light-mode', 'dark-mode');
        toggleThemeButton.textContent = 'Modo Vibrante';
    } else if (document.body.classList.contains('dark-mode')) {
        document.body.classList.replace('dark-mode', 'vibrant-mode');
        toggleThemeButton.textContent = 'Modo Claro';
    } else {
        document.body.classList.replace('vibrant-mode', 'light-mode');
        toggleThemeButton.textContent = 'Modo Escuro';
    }
});

// Função para alternar dicas
toggleHintButton.addEventListener('click', function() {
    const hintText = resultText.textContent;
    if (hintText.includes('Você está MUITO perto') || hintText.includes('Você está perto') || hintText.includes('Você está longe')) {
        resultText.textContent = 'Dicas desativadas. Você pode tentar adivinhar!';
    } else {
        resultText.textContent = giveProximityHint(parseInt(guessInput.value));
    }
});

// Função para reiniciar o jogo
resetButton.addEventListener('click', function() {
    startGame(); // Reinicia o jogo chamando a função de iniciar
    resultText.textContent = 'Jogo reiniciado. Tente adivinhar o número!';
});
  
// Função para iniciar o jogo
startButton.addEventListener('click', function() {
    startGame(); // Inicia o jogo
});
