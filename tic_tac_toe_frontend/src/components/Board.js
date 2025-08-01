import React from 'react';
import Square from './Square';
import '../styles/Board.css';

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square
        key={i}
        value={square}
        onClick={() => onClick(i)}
      />
    ))}
  </div>
);

export default Board;
