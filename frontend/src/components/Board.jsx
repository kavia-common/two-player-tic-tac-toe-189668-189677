import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of squares.
 * Props:
 * - board: Array of 9 values ('X'|'O'|null)
 * - onSquareClick: function(index) -> void
 * - gameOver: boolean (disables interaction when true)
 */
export default function Board({ board, onSquareClick, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Game board">
      {board.map((value, idx) => (
        <Square
          key={idx}
          index={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          disabled={gameOver || value !== null}
        />
      ))}
    </div>
  );
}
