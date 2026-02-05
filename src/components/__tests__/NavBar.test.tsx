import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';

// Mock the child components
jest.mock('../HardMode', () => {
  return function HardMode() {
    return <div data-testid="hard-mode">HardMode Component</div>;
  };
});

jest.mock('../Share', () => {
  return function Share() {
    return <div data-testid="share">Share Component</div>;
  };
});

describe('NavBar', () => {
  const mockSetHardMode = jest.fn();

  it('renders without crashing', () => {
    render(<NavBar hardMode={false} setHardMode={mockSetHardMode} />);
    expect(screen.getByTestId('share')).toBeInTheDocument();
    expect(screen.getByTestId('hard-mode')).toBeInTheDocument();
  });

  it('passes props to HardMode component', () => {
    render(<NavBar hardMode={true} setHardMode={mockSetHardMode} />);
    expect(screen.getByTestId('hard-mode')).toBeInTheDocument();
  });

  it('renders Share component', () => {
    render(<NavBar hardMode={false} setHardMode={mockSetHardMode} />);
    expect(screen.getByTestId('share')).toBeInTheDocument();
  });
});
