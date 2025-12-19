import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders game title and controls', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /restart game/i })).toBeInTheDocument();
});

test('renders 9 squares', () => {
  render(<App />);
  const squares = screen.getAllByRole('gridcell');
  expect(squares).toHaveLength(9);
});

test('allows a move and prevents overwrite', () => {
  render(<App />);
  const squares = screen.getAllByRole('gridcell');
  fireEvent.click(squares[0]); // X
  expect(squares[0]).toHaveTextContent('X');
  fireEvent.click(squares[0]); // should not overwrite
  expect(squares[0]).toHaveTextContent('X');
});
