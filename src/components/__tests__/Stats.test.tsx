import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Stats from '../Stats';
import * as statsStorage from '../../utils/statsStorage';

// Mock the statsStorage module
jest.mock('../../utils/statsStorage');

// Suppress React 19 act() warnings for intentional async updates
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to %s inside a test was not wrapped in act') ||
        args[0].includes('was not wrapped in act(...)'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('Stats', () => {
  const mockStats = {
    gamesPlayed: 10,
    gamesWon: 7,
    gamesLost: 3,
    currentStreak: 2,
    maxStreak: 5,
  };

  const emptyStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    maxStreak: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.mocked(statsStorage.getStats).mockReturnValue(mockStats);
    jest.mocked(statsStorage.resetStats).mockReturnValue(emptyStats);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<Stats />);
    expect(screen.getByText('Played')).toBeInTheDocument();
  });

  it('displays all stat labels', () => {
    render(<Stats />);
    expect(screen.getByText('Played')).toBeInTheDocument();
    expect(screen.getByText('Win %')).toBeInTheDocument();
    expect(screen.getByText('Streak')).toBeInTheDocument();
    expect(screen.getByText('Best')).toBeInTheDocument();
  });

  it('displays correct stat values', () => {
    render(<Stats />);
    expect(screen.getByText('10')).toBeInTheDocument(); // gamesPlayed
    expect(screen.getByText('70%')).toBeInTheDocument(); // win percentage
    expect(screen.getByText('2')).toBeInTheDocument(); // currentStreak
    expect(screen.getByText('5')).toBeInTheDocument(); // maxStreak
  });

  it('calculates win percentage correctly', () => {
    render(<Stats />);
    // 7 wins out of 10 games = 70%
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('shows 0% win percentage when no games played', () => {
    jest.mocked(statsStorage.getStats).mockReturnValue(emptyStats);
    render(<Stats />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('displays reset button when games have been played', () => {
    render(<Stats />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('does not display reset button when no games played', () => {
    jest.mocked(statsStorage.getStats).mockReturnValue(emptyStats);
    render(<Stats />);
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('calls resetStats when reset button is clicked and confirmed', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    jest
      .mocked(statsStorage.getStats)
      .mockReturnValueOnce(mockStats) // Initial render
      .mockReturnValueOnce(emptyStats); // After reset

    render(<Stats />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(confirmSpy).toHaveBeenCalledWith('Reset all statistics?');
    expect(statsStorage.resetStats).toHaveBeenCalledTimes(1);
    confirmSpy.mockRestore();
  });

  it('does not reset stats when user cancels confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    render(<Stats />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(confirmSpy).toHaveBeenCalledWith('Reset all statistics?');
    expect(statsStorage.resetStats).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it('refreshes stats periodically', async () => {
    const updatedStats = {
      ...mockStats,
      gamesPlayed: 11,
      gamesWon: 8,
    };

    jest
      .mocked(statsStorage.getStats)
      .mockReturnValueOnce(mockStats)
      .mockReturnValueOnce(updatedStats);

    render(<Stats />);
    expect(screen.getByText('10')).toBeInTheDocument();

    // Fast-forward 1 second
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('11')).toBeInTheDocument();
    });
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<Stats />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('rounds win percentage to nearest integer', () => {
    const statsWithDecimal = {
      ...mockStats,
      gamesPlayed: 3,
      gamesWon: 2, // 2/3 = 66.666...%
    };
    jest.mocked(statsStorage.getStats).mockReturnValue(statsWithDecimal);

    render(<Stats />);
    expect(screen.getByText('67%')).toBeInTheDocument();
  });

  it('handles 100% win rate', () => {
    const perfectStats = {
      gamesPlayed: 5,
      gamesWon: 5,
      gamesLost: 0,
      currentStreak: 5,
      maxStreak: 5,
    };
    jest.mocked(statsStorage.getStats).mockReturnValue(perfectStats);

    render(<Stats />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
