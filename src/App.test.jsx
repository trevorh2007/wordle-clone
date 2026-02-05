import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Wordle Clone app', () => {
  render(<App />);
  const headerElement = screen.getByText(/Wordle Clone/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders game tiles', () => {
  render(<App />);
  const firstTile = document.getElementById('guessRow-0-tile-0');
  expect(firstTile).toBeInTheDocument();
});
