import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StatusBar displays the current status:
 * - Current player's turn
 * - Winner announcement
 * - Draw message
 * Props:
 * - currentPlayer: 'X'|'O'
 * - winner: 'X'|'O'|null
 * - isDraw: boolean
 */
export default function StatusBar({ currentPlayer, winner, isDraw }) {
  if (winner) {
    return (
      <div className="status-bar">
        <div className="status-pill win" role="status" aria-live="polite">
          <span className="dot" aria-hidden="true" />
          <strong>Winner: </strong>&nbsp;Player {winner}
        </div>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="status-bar">
        <div className="status-pill draw" role="status" aria-live="polite">
          <span className="dot" aria-hidden="true" />
          <strong>Draw</strong>&nbsp;No more moves
        </div>
      </div>
    );
  }

  return (
    <div className="status-bar">
      <div className="status-pill" role="status" aria-live="polite">
        <span className="dot" aria-hidden="true" />
        <strong>Turn:</strong>&nbsp;Player {currentPlayer}
      </div>
    </div>
  );
}
