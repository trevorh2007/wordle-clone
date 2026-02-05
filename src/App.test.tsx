import { render, screen, fireEvent } from '@testing-library/react';
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

test('header changes color when hard mode is toggled', () => {
  render(<App />);
  const headerElement = screen.getByText(/Wordle Clone/i);
  
  // Initially hard mode is off, header should have white color
  expect(headerElement).toHaveStyle({ color: 'rgb(255, 255, 255)' });
  
  // Find and click the hard mode toggle using class name
  const hardModeToggle = document.querySelector('.toggle-switch');
  if (hardModeToggle) {
    fireEvent.click(hardModeToggle);
  }
  
  // After toggling, header should have red color
  expect(headerElement).toHaveStyle({ color: 'red' });
});
