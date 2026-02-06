import { render, screen } from "@testing-library/react";
import GameBoard from "../GameBoard";

describe("GameBoard", () => {
  const mockGuessRows = [
    ["H", "E", "L", "L", "O"],
    ["W", "O", "R", "L", "D"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  it("renders without crashing", () => {
    render(<GameBoard guessRows={mockGuessRows} />);
    expect(screen.getByText("H")).toBeInTheDocument();
  });

  it("renders all guess rows", () => {
    render(<GameBoard guessRows={mockGuessRows} />);
    expect(screen.getByText("H")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("applies shake class when shake prop is true", () => {
    const { container } = render(
      <GameBoard guessRows={mockGuessRows} shake={true} />,
    );
    const gameTileContainer = container.firstChild;
    expect(gameTileContainer).toHaveClass("shake");
  });

  it("does not apply shake class when shake prop is false", () => {
    const { container } = render(
      <GameBoard guessRows={mockGuessRows} shake={false} />,
    );
    const gameTileContainer = container.firstChild;
    expect(gameTileContainer).not.toHaveClass("shake");
  });

  it("does not apply shake class when shake prop is not provided", () => {
    const { container } = render(<GameBoard guessRows={mockGuessRows} />);
    const gameTileContainer = container.firstChild;
    expect(gameTileContainer).not.toHaveClass("shake");
  });

  it("renders correct number of tiles", () => {
    const { container } = render(<GameBoard guessRows={mockGuessRows} />);
    const tiles = container.querySelectorAll('[id*="tile"]');
    expect(tiles).toHaveLength(30); // 6 rows * 5 tiles
  });

  it("renders tiles with correct IDs", () => {
    render(<GameBoard guessRows={mockGuessRows} />);
    expect(document.getElementById("guessRow-0-tile-0")).toBeInTheDocument();
    expect(document.getElementById("guessRow-0-tile-4")).toBeInTheDocument();
    expect(document.getElementById("guessRow-5-tile-4")).toBeInTheDocument();
  });

  it("renders row with correct ID", () => {
    render(<GameBoard guessRows={mockGuessRows} />);
    expect(document.getElementById("guessRow-0")).toBeInTheDocument();
    expect(document.getElementById("guessRow-5")).toBeInTheDocument();
  });
});
