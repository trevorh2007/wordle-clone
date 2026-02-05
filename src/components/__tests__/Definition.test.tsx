import { render, screen } from '@testing-library/react';
import Definition from '../Definition';

describe('Definition', () => {
  const mockSetDefinition = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Definition wordle="test" definition="" setDefinition={mockSetDefinition} />);
    expect(screen.getByText('Definition')).toBeInTheDocument();
  });

  it('displays definition header', () => {
    render(
      <Definition wordle="test" definition="test definition" setDefinition={mockSetDefinition} />
    );
    expect(screen.getByText('Definition')).toBeInTheDocument();
  });

  it('displays definition content when provided', () => {
    const testDefinition = '1. A test word\n2. Another meaning';
    render(
      <Definition wordle="test" definition={testDefinition} setDefinition={mockSetDefinition} />
    );
    // The text is rendered together in one element with line breaks
    expect(screen.getByText(/test word/i)).toBeInTheDocument();
    expect(screen.getByText(/Another meaning/i)).toBeInTheDocument();
  });

  it('does not fetch definition when definition already exists', () => {
    render(
      <Definition
        wordle="test"
        definition="existing definition"
        setDefinition={mockSetDefinition}
      />
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('does not fetch definition when wordle is not provided', () => {
    render(<Definition wordle="" definition="" setDefinition={mockSetDefinition} />);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
