// Calculate best move for AI using minimax algorithm
export const calculateBestMove = (squares, player) => {
  // Get available moves
  const availableMoves = squares.reduce((moves, square, idx) => 
    square === null ? [...moves, idx] : moves, []);
  
  // If first move, choose random corner or center
  if (availableMoves.length === 9) {
    const firstMoves = [0, 2, 4, 6, 8];
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  // Basic AI: Choose winning move or block opponent's winning move
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Check for winning move
  for (let move of availableMoves) {
    const boardCopy = [...squares];
    boardCopy[move] = player;
    if (calculateWinner(boardCopy)) return move;
  }

  // Check for blocking move
  for (let move of availableMoves) {
    const boardCopy = [...squares];
    boardCopy[move] = opponent;
    if (calculateWinner(boardCopy)) return move;
  }

  // Choose random available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Calculate winner by checking all possible winning combinations
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// Check if game is a draw
export const isDraw = (squares) => {
  return squares.every(square => square !== null);
};
