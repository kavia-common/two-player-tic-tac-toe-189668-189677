import React, { useMemo, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Square represents a single playable cell.
 * Props:
 * - index: number (0..8)
 * - row: number (1..3)
 * - col: number (1..3)
 * - value: 'X'|'O'|null
 * - onClick: () => void
 * - disabled: boolean
 * - tabIndex: number (0 or -1) for roving tabindex
 * - buttonRef: ref to the underlying button for focus control
 * - onKeyDown: keyboard handler for arrow navigation
 */
export default function Square({
  index,
  row,
  col,
  value,
  onClick,
  disabled,
  tabIndex = -1,
  buttonRef,
  onKeyDown
}) {
  const label = useMemo(() => {
    const content = value ? value : 'empty';
    // Example: "Cell r1 c2: X"
    return `Cell r${row} c${col}: ${content}`;
  }, [row, col, value]);

  const markerClass = value === 'X' ? 'marker-x' : value === 'O' ? 'marker-o' : '';

  // handle Enter/Space to activate the button click (only when interactive)
  const handleKeyDown = useCallback(
    (e) => {
      if (onKeyDown) {
        onKeyDown(e);
        // If an arrow key was handled, we don't also need to handle Enter/Space here.
        // Continue to handle Enter/Space below.
      }

      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick) onClick();
      }
    },
    [onKeyDown, onClick, disabled]
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      className="square"
      role="gridcell"
      aria-label={label}
      aria-disabled={disabled ? 'true' : 'false'}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
    >
      <span aria-hidden="true" className={markerClass}>
        {value ?? ''}
      </span>
    </button>
  );
}
