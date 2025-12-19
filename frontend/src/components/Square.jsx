import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * Square represents a single playable cell.
 * Props:
 * - index: number (0..8)
 * - value: 'X'|'O'|null
 * - onClick: () => void
 * - disabled: boolean
 */
export default function Square({ index, value, onClick, disabled }) {
  const label = useMemo(() => {
    const pos = index + 1;
    const content = value ? `contains ${value}` : 'empty';
    return `Square ${pos}, ${content}`;
  }, [index, value]);

  const markerClass = value === 'X' ? 'marker-x' : value === 'O' ? 'marker-o' : '';

  return (
    <button
      type="button"
      className="square"
      role="gridcell"
      aria-label={label}
      aria-disabled={disabled ? 'true' : 'false'}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span aria-hidden="true" className={markerClass}>
        {value ?? ''}
      </span>
    </button>
  );
}
