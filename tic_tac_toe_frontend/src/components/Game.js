import React, { useState, useCallback } from 'react';
import Board from './Board';
import { calculateWinner, isDraw, calculateBestMove } from '../utils/gameUtils';
import '../styles/Game.css';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const draw = !winner && isDraw(current);

  const handleClick = useCallback((i) => {
    const historyCurrent = history.slice(0, stepNumber + 1);
    const current = historyCurrent[historyCurrent.length - 1];
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyCurrent, squares]);
    setStepNumber(historyCurrent.length);
    setXIsNext(!xIsNext);
  }, [history, stepNumber, xIsNext]);

  React.useEffect(() => {
    // AI move
    if (isSinglePlayer && !xIsNext && !winner && !draw) {
      const timeout = setTimeout(() => {
        const bestMove = calculateBestMove(current, 'O');
        handleClick(bestMove);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isSinglePlayer, xIsNext, winner, draw, current, handleClick]);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const moves = history.map((_, move) => (
    <li key={move}>
      <button 
        className="move-button"
        onClick={() => jumpTo(move)}
      >
        {move ? `Go to move #${move}` : 'Go to game start'}
      </button>
    </li>
  ));

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-controls">
        <button 
          className="control-button"
          onClick={() => setIsSinglePlayer(!isSinglePlayer)}
        >
          {isSinglePlayer ? 'Switch to 2 Players' : 'Switch to Single Player'}
        </button>
        <button 
          className="control-button"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
      <Board 
        squares={current}
        onClick={(i) => {
          if (!(isSinglePlayer && !xIsNext)) {
            handleClick(i);
          }
        }}
      />
      <div className="game-history">
        <h3>Move History</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
