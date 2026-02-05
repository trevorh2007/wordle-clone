import "@testing-library/jest-dom";

// Mock environment config
jest.mock("./config/env", () => ({
  getApiKey: () => "test-api-key",
}));

// Mock fetch globally to prevent network errors in tests
// Return structure that works for both word API (array) and definition API (object with meaning)
global.fetch = jest.fn((url) => {
  // For word endpoint, return array
  if (url.includes("random-words")) {
    return Promise.resolve({
      json: () => Promise.resolve(["REACT"]),
      ok: true,
    });
  }
  // For definition/check endpoints, return object with meaning
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        meaning: { noun: "test definition" },
        result_msg: "Success",
      }),
    ok: true,
  });
});
