import "@testing-library/jest-dom";

// Mock the wordApi module
jest.mock("./api/wordApi", () => ({
  getWordFetch: jest.fn(() => Promise.resolve("REACT")),
  getIsWordFetch: jest.fn(() => Promise.resolve(true)),
  getDefinitionFetch: jest.fn(() =>
    Promise.resolve(
      "1. (noun) A JavaScript library for building user interfaces",
    ),
  ),
}));
