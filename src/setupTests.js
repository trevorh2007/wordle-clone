import "@testing-library/jest-dom";

// Mock fetch globally to prevent network errors in tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve("REACT"),
    ok: true,
  }),
);
