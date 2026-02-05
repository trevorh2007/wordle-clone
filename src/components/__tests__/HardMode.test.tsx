import { render, screen, fireEvent } from '@testing-library/react';
import HardMode from '../HardMode';

describe('HardMode', () => {
  const mockSetHardMode = jest.fn();

  beforeEach(() => {
    mockSetHardMode.mockClear();
  });

  it('renders without crashing', () => {
    render(<HardMode hardMode={false} setHardMode={mockSetHardMode} />);
    expect(screen.getByText('Hard Mode:')).toBeInTheDocument();
  });

  it('displays OFF and ON buttons', () => {
    render(<HardMode hardMode={false} setHardMode={mockSetHardMode} />);
    expect(screen.getByText('OFF')).toBeInTheDocument();
    expect(screen.getByText('ON')).toBeInTheDocument();
  });

  it('toggles hard mode when clicked', () => {
    render(<HardMode hardMode={false} setHardMode={mockSetHardMode} />);
    const toggleSwitch = screen.getByText('OFF').parentElement;
    if (toggleSwitch) {
      fireEvent.click(toggleSwitch);
    }
    expect(mockSetHardMode).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling when hard mode is off', () => {
    render(<HardMode hardMode={false} setHardMode={mockSetHardMode} />);
    const offButton = screen.getByText('OFF');
    expect(offButton).toHaveClass('off');
  });

  it('applies correct styling when hard mode is on', () => {
    render(<HardMode hardMode={true} setHardMode={mockSetHardMode} />);
    const onButton = screen.getByText('ON');
    expect(onButton).toHaveClass('on');
  });

  it('has toggle-switch class on container', () => {
    render(<HardMode hardMode={false} setHardMode={mockSetHardMode} />);
    const toggleSwitch = document.querySelector('.toggle-switch');
    expect(toggleSwitch).toBeInTheDocument();
  });
});
