import { render, screen, fireEvent, act } from "@testing-library/react";
import HowToPlay from "../HowToPlay";

describe("HowToPlay", () => {
  const mockSetShow = jest.fn();

  beforeEach(() => {
    mockSetShow.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders when show is true", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(screen.getByText("How To Play")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(<HowToPlay show={false} setShow={mockSetShow} />);
    expect(screen.queryByText("How To Play")).not.toBeInTheDocument();
  });

  it("displays the game instructions", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(
      screen.getByText("Guess the Wordle in 6 tries."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Each guess must be a valid 5-letter word/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The color of the tiles will change/),
    ).toBeInTheDocument();
  });

  it("displays examples section", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(screen.getByText("Examples")).toBeInTheDocument();
  });

  it("displays all example tiles", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    // Check for letters that appear only once in the examples
    const allW = screen.getAllByText("W");
    const allR = screen.getAllByText("R");
    const allD = screen.getAllByText("D");
    const allG = screen.getAllByText("G");
    const allA = screen.getAllByText("A");
    const allM = screen.getAllByText("M");

    // Each should appear at least once (in tiles)
    expect(allW.length).toBeGreaterThan(0);
    expect(allR.length).toBeGreaterThan(0);
    expect(allD.length).toBeGreaterThan(0);
    expect(allG.length).toBeGreaterThan(0);
    expect(allA.length).toBeGreaterThan(0);
    expect(allM.length).toBeGreaterThan(0);
  });

  it("displays example descriptions", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(
      screen.getByText(/is in the word and in the correct spot/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/is in the word but in the wrong spot/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/is not in the word in any spot/),
    ).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);

    // Fast-forward time to after the animation
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSetShow).toHaveBeenCalledWith(false);
  });

  it("closes modal when backdrop is clicked", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    const backdrop = screen
      .getByText("How To Play")
      .closest("div")?.parentElement;

    if (backdrop) {
      fireEvent.click(backdrop);

      // Fast-forward time to after the animation
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockSetShow).toHaveBeenCalledWith(false);
    }
  });

  it("does not close when clicking inside the modal card", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    const modalCard = screen.getByText("How To Play").parentElement;

    if (modalCard) {
      fireEvent.click(modalCard);

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockSetShow).not.toHaveBeenCalled();
    }
  });

  it("sets shouldRender to true when show becomes true", () => {
    const { rerender } = render(
      <HowToPlay show={false} setShow={mockSetShow} />,
    );
    expect(screen.queryByText("How To Play")).not.toBeInTheDocument();

    rerender(<HowToPlay show={true} setShow={mockSetShow} />);
    expect(screen.getByText("How To Play")).toBeInTheDocument();
  });

  it("applies closing animation before unmounting", () => {
    render(<HowToPlay show={true} setShow={mockSetShow} />);
    const closeButton = screen.getByText("✕");

    fireEvent.click(closeButton);

    expect(screen.getByText("How To Play")).toBeInTheDocument();

    // Fast-forward time to after the animation
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByText("How To Play")).not.toBeInTheDocument();
  });
});
