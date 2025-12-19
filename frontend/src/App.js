import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import Board from './components/Board';
import StatusBar from './components/StatusBar';

/**
 * PUBLIC_INTERFACE
 * App is the root component for the Tic Tac Toe game.
 * It manages game state (board, currentPlayer, winner, isDraw, gameOver),
 * handles user interactions, and renders the UI.
 */
function App() {
  // Board is a 9-length array with values: 'X' | 'O' | null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  // Determine winner based on standard 3x3 winning lines
  const winner = useMemo(() => calculateWinner(board), [board]);

  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const isDraw = useMemo(() => !winner && isBoardFull, [winner, isBoardFull]);
  const gameOver = !!winner || isDraw;

  // Handle a square click: place current player's mark if valid and not game over
  const handleSquareClick = useCallback(
    (index) => {
      if (gameOver || board[index]) return; // prevent overwriting or playing after game over
      setBoard((prev) => {
        const next = prev.slice();
        next[index] = currentPlayer;
        return next;
      });
      setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
    },
    [board, currentPlayer, gameOver]
  );

  // PUBLIC_INTERFACE
  // Restart the game to initial state
  const restart = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  }, []);

  return (
    <div className="app-root" role="application" aria-label="Tic Tac Toe Game">
      <main className="game-card" aria-live="polite">
        <h1 className="game-title">Tic Tac Toe</h1>

        <StatusBar
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
        />

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          gameOver={gameOver}
        />

        <div className="controls">
          <button
            type="button"
            className="btn restart-btn"
            onClick={restart}
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>

        <p className="sr-only" aria-live="assertive">
          {winner
            ? `Game over. Player ${winner} wins.`
            : isDraw
            ? 'Game over. Draw.'
            : `Player ${currentPlayer}'s turn.`}
        </p>
      </main>
      <footer className="attribution" aria-hidden="true">
        Two-player local game • No network required
      </footer>
    </div>
  );
}

export default App;

// PUBLIC_INTERFACE
/**
 * Determine the winner for a given 3x3 tic tac toe board
 * @param {Array<('X'|'O'|null)>} squares - length-9 board array
 * @returns {'X'|'O'|null} winner symbol if any, otherwise null
 */
function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diags
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
