let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameOver = false;

function startGame() {
  currentPlayer = 'X';
  board = Array(9).fill(null);
  isGameOver = false;
  renderBoard();
  setStatus(`Player ${currentPlayer}'s turn`);
}

function handleClick(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    setStatus(`🎉 Player ${currentPlayer} wins!`);
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    setStatus("It's a draw!");
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Player ${currentPlayer}'s turn`);
}

function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.innerText = cell || '';
    div.onclick = () => handleClick(index);
    boardElement.appendChild(div);
  });
}

function setStatus(message) {
  document.getElementById('status').innerText = message;
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6]           // Diags
  ];
  return winCombos.some(combo => combo.every(index => board[index] === player));
}

// Init game
window.onload = startGame;
