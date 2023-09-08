const board = document.getElementById('board');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;

// Initialize the game board
function initializeBoard() {
    board.innerHTML = '';
    boardState = ['', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

// Handle a cell click
function handleCellClick(index) {
    if (boardState[index] === '' && !isGameOver()) {
        boardState[index] = currentPlayer;
        document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;
        if (isGameOver()) {
            handleGameOver();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = currentPlayer;
        }
    }
}

// Check if the game is over
function isGameOver() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }

    return boardState.every(cell => cell !== '');
}

// Handle game over
function handleGameOver() {
    if (currentPlayer === 'X') {
        playerXScore++;
        playerXScoreDisplay.textContent = playerXScore;
    } else {
        playerOScore++;
        playerOScoreDisplay.textContent = playerOScore;
    }

    setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        initializeBoard();
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }, 100);
}

// Reset the game
resetButton.addEventListener('click', initializeBoard);

// Initialize the game
initializeBoard();