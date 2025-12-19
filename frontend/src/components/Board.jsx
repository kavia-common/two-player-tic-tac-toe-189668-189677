import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of squares with accessible keyboard navigation.
 * Props:
 * - board: Array of 9 values ('X'|'O'|null)
 * - onSquareClick: function(index) -> void
 * - gameOver: boolean (disables interaction when true)
 */
export default function Board({ board, onSquareClick, gameOver }) {
  // Keep refs to buttons to move focus programmatically
  const buttonRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));
  // Track which cell is currently focusable (roving tabIndex)
  const [focusIndex, setFocusIndex] = useState(0);

  // Determine the first empty cell; if none, use 0
  const firstEmptyIndex = useMemo(() => {
    const idx = board.findIndex((v) => v === null);
    return idx === -1 ? 0 : idx;
  }, [board]);

  // When the component mounts or when the board changes (e.g., after a move),
  // ensure exactly one cell is tabbable; default to first empty.
  useEffect(() => {
    setFocusIndex((prev) => {
      // If current focusIndex still valid, keep it; else move to firstEmptyIndex
      if (prev >= 0 && prev < 9) return prev;
      return firstEmptyIndex;
    });
  }, [firstEmptyIndex]);

  // Focus the currently focusable button when focusIndex updates (initial mount or navigation)
  useEffect(() => {
    const btnRef = buttonRefs.current[focusIndex];
    if (btnRef && btnRef.current) {
      // Only auto-focus if the currently focusable button is not disabled, else attempt first empty
      if (!btnRef.current.disabled) {
        btnRef.current.focus();
      } else {
        const fe = firstEmptyIndex;
        const feRef = buttonRefs.current[fe];
        if (feRef && feRef.current) {
          feRef.current.focus();
          setFocusIndex(fe);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusIndex]);

  // Handle arrow key navigation (Left/Right/Up/Down) with wrapping
  const handleKeyDown = useCallback(
    (event, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      let nextIndex = index;

      switch (event.key) {
        case 'ArrowLeft': {
          const nextCol = (col + 3 - 1) % 3;
          nextIndex = row * 3 + nextCol;
          event.preventDefault();
          break;
        }
        case 'ArrowRight': {
          const nextCol = (col + 1) % 3;
          nextIndex = row * 3 + nextCol;
          event.preventDefault();
          break;
        }
        case 'ArrowUp': {
          const nextRow = (row + 3 - 1) % 3;
          nextIndex = nextRow * 3 + col;
          event.preventDefault();
          break;
        }
        case 'ArrowDown': {
          const nextRow = (row + 1) % 3;
          nextIndex = nextRow * 3 + col;
          event.preventDefault();
          break;
        }
        default:
          break;
      }

      if (nextIndex !== index) {
        setFocusIndex(nextIndex);
      }
    },
    []
  );

  // status element id to describe grid (mirrors StatusBar live region content)
  const statusId = 'status-message';

  return (
    <div
      className="board"
      role="grid"
      aria-label="Game board"
      aria-rowcount="3"
      aria-colcount="3"
      aria-describedby={statusId}
    >
      {board.map((value, idx) => {
        const row = Math.floor(idx / 3) + 1; // 1-based for aria-labels
        const col = (idx % 3) + 1;

        return (
          <Square
            key={idx}
            index={idx}
            row={row}
            col={col}
            value={value}
            onClick={() => onSquareClick(idx)}
            disabled={gameOver || value !== null}
            // Roving tabIndex: only one focusable at a time
            tabIndex={focusIndex === idx ? 0 : -1}
            buttonRef={buttonRefs.current[idx]}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          />
        );
      })}
      {/* Hidden description element referenced by aria-describedby */}
      <span id={statusId} className="sr-only" aria-live="polite">
        {/* This mirrors the general app-level live region but is scoped for the grid */}
      </span>
    </div>
  );
}
