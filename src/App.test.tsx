import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as wordApi from "./api/wordApi";

// Mock the API module
jest.mock("./api/wordApi");

// Setup default mocks
beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(wordApi.getWordFetch).mockResolvedValue({
    word: "BLAZE",
    definition: {},
  });
});

test("renders Wordle Clone app", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Wordle Clone/i)).toBeInTheDocument();
  });
  const headerElement = screen.getByText(/Wordle Clone/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders game tiles", async () => {
  render(<App />);
  await waitFor(() => {
    expect(document.getElementById("guessRow-0-tile-0")).toBeInTheDocument();
  });
  const firstTile = document.getElementById("guessRow-0-tile-0");
  expect(firstTile).toBeInTheDocument();
});

test("header changes color when hard mode is toggled", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Wordle Clone/i)).toBeInTheDocument();
  });
  const headerElement = screen.getByText(/Wordle Clone/i);

  // Initially hard mode is off, header should have white color
  expect(headerElement).toHaveStyle({ color: "rgb(255, 255, 255)" });

  // Find and click the hard mode toggle using class name
  const hardModeToggle = document.querySelector(".toggle-switch");
  if (hardModeToggle) {
    fireEvent.click(hardModeToggle);
  }

  // After toggling, header should have red color
  expect(headerElement).toHaveStyle({ color: "red" });
});
