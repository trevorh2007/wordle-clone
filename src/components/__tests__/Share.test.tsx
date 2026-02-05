import { render, screen, fireEvent } from '@testing-library/react';
import Share from '../Share';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

// Mock react-modal
jest.mock('react-modal', () => {
  return function Modal({ children, isOpen, onRequestClose }: ModalProps) {
    return isOpen ? (
      <div data-testid="modal" onClick={onRequestClose}>
        {children}
      </div>
    ) : null;
  };
});

describe('Share', () => {
  it('renders without crashing', () => {
    render(<Share />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('displays Share button', () => {
    render(<Share />);
    const shareButton = screen.getByText('Share');
    expect(shareButton).toBeInTheDocument();
  });

  it('opens modal when Share button is clicked', () => {
    render(<Share />);
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('displays modal content when open', () => {
    render(<Share />);
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    expect(screen.getByText('Share stuff goes here')).toBeInTheDocument();
  });

  it('closes modal when requested', () => {
    render(<Share />);
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);

    const modal = screen.getByTestId('modal');
    fireEvent.click(modal);

    expect(screen.queryByText('Share stuff goes here')).not.toBeInTheDocument();
  });

  it('modal is not visible initially', () => {
    render(<Share />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
