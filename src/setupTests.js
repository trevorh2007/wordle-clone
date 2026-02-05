import "@testing-library/jest-dom";
import axios from "axios";

// Mock axios globally to prevent network errors in tests
jest.mock("axios");

// Default axios mock implementation
axios.mockImplementation(() => Promise.resolve({ data: "REACT" }));
