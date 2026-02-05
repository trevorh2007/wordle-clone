import { render, screen, fireEvent } from '@testing-library/react';
import GameTiles from '../GameTiles';

const mockedFetch = global.fetch as jest.Mock;

// Mock Definition component
jest.mock('../Definition', () => {
  return function Definition() {
    return <div data-testid="definition">Definition Component</div>;
  };
});

describe('GameTiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the fetch call for getting wordle
    mockedFetch.mockResolvedValue({
      json: () => Promise.resolve('REACT'),
      ok: true,
    } as any);
  });

  it('renders without crashing', () => {
    render(<GameTiles hardMode={false} />);
    // Check for keyboard keys
    expect(screen.getByText('Q')).toBeInTheDocument();
    expect(screen.getByText('ENTER')).toBeInTheDocument();
  });

  it('renders all keyboard keys', () => {
    render(<GameTiles hardMode={false} />);
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
                  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
                  'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    
    keys.forEach(key => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it('renders ENTER button', () => {
    render(<GameTiles hardMode={false} />);
    expect(screen.getByText('ENTER')).toBeInTheDocument();
  });

  it('renders backspace button', () => {
    render(<GameTiles hardMode={false} />);
    expect(screen.getByText('<<')).toBeInTheDocument();
  });

  it('renders 6 guess rows', () => {
    render(<GameTiles hardMode={false} />);
    for (let i = 0; i < 6; i++) {
      expect(document.getElementById(`guessRow-${i}`)).toBeInTheDocument();
    }
  });

  it('renders 5 tiles per row', () => {
    render(<GameTiles hardMode={false} />);
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        expect(document.getElementById(`guessRow-${row}-tile-${col}`)).toBeInTheDocument();
      }
    }
  });

  it('keyboard keys are clickable', () => {
    render(<GameTiles hardMode={false} />);
    const qKey = screen.getByText('Q');
    expect(qKey).toBeInTheDocument();
    // Just verify the element exists and could be clicked
    fireEvent.click(qKey);
  });

  it('does not render Definition initially', () => {
    render(<GameTiles hardMode={false} />);
    expect(screen.queryByTestId('definition')).not.toBeInTheDocument();
  });

  it('adds letter when keyboard key is clicked', () => {
    render(<GameTiles hardMode={false} />);
    const qKey = screen.getByText('Q');
    fireEvent.click(qKey);
    
    // Check that first tile in first row gets the letter
    const firstTile = document.getElementById('guessRow-0-tile-0');
    expect(firstTile?.textContent).toBe('Q');
  });

  it('adds multiple letters when keys are clicked', () => {
    render(<GameTiles hardMode={false} />);
    
    fireEvent.click(screen.getByText('R'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('T'));
    
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('R');
    expect(document.getElementById('guessRow-0-tile-1')?.textContent).toBe('E');
    expect(document.getElementById('guessRow-0-tile-2')?.textContent).toBe('A');
    expect(document.getElementById('guessRow-0-tile-3')?.textContent).toBe('C');
    expect(document.getElementById('guessRow-0-tile-4')?.textContent).toBe('T');
  });

  it('deletes letter when backspace is clicked', () => {
    render(<GameTiles hardMode={false} />);
    
    // Add letters
    fireEvent.click(screen.getByText('T'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('S'));
    
    // Delete one
    fireEvent.click(screen.getByText('<<'));
    
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('T');
    expect(document.getElementById('guessRow-0-tile-1')?.textContent).toBe('E');
    expect(document.getElementById('guessRow-0-tile-2')?.textContent).toBe('');
  });

  it('does not add letter beyond 5 tiles per row', () => {
    render(<GameTiles hardMode={false} />);
    
    // Try to add 6 letters
    ['R', 'E', 'A', 'C', 'T', 'S'].forEach(letter => {
      fireEvent.click(screen.getByText(letter));
    });
    
    // Only first 5 should be added
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('R');
    expect(document.getElementById('guessRow-0-tile-4')?.textContent).toBe('T');
  });

  it('handles keyboard events for adding letters', () => {
    render(<GameTiles hardMode={false} />);
    
    // Simulate keydown event
    fireEvent.keyDown(window, { key: 'T', keyCode: 84 });
    
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('T');
  });

  it('handles keyboard backspace event', () => {
    render(<GameTiles hardMode={false} />);
    
    // Add a letter first
    fireEvent.click(screen.getByText('T'));
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('T');
    
    // Backspace
    fireEvent.keyDown(window, { keyCode: 8 });
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('');
  });

  it('handles keyboard Enter event for incomplete word', () => {
    render(<GameTiles hardMode={false} />);
    
    // Add only 3 letters (incomplete)
    fireEvent.click(screen.getByText('T'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('S'));
    
    // Try to submit with Enter - should not do anything since word is incomplete
    fireEvent.keyDown(window, { keyCode: 13 });
    
    // Still on first row
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('T');
  });

  it('renders with hardMode enabled', () => {
    render(<GameTiles hardMode={true} />);
    expect(screen.getByText('Q')).toBeInTheDocument();
  });

  it('does not delete letter when currentTile is 0', () => {
    render(<GameTiles hardMode={false} />);
    
    // Try to delete when no letters added
    fireEvent.click(screen.getByText('<<'));
    
    // Should have no effect
    expect(document.getElementById('guessRow-0-tile-0')?.textContent).toBe('');
  });
});
