import { render, screen } from "@testing-library/react";
import Definition from "../Definition";
import { getDefinitionFetch } from "../../api/wordApi";

jest.mock("../../api/wordApi");

describe("Definition", () => {
  const mockSetDefinition = jest.fn();
  const mockGetDefinitionFetch = getDefinitionFetch as jest.MockedFunction<
    typeof getDefinitionFetch
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Definition
        wordle="order"
        definition={{
          noun: [
            "(countable) Arrangement, disposition, or sequence.",
            "(countable) A position in an arrangement, disposition, or sequence.",
          ],
        }}
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("Definition")).toBeInTheDocument();
  });

  it("displays definition header", () => {
    render(
      <Definition
        wordle="test"
        definition="test definition"
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("Definition")).toBeInTheDocument();
  });

  it("does not fetch definition when definition already exists", () => {
    render(
      <Definition
        wordle="test"
        definition="existing definition"
        setDefinition={mockSetDefinition}
      />,
    );
    expect(mockGetDefinitionFetch).not.toHaveBeenCalled();
  });

  it("does not fetch definition when wordle is not provided", () => {
    render(
      <Definition wordle="" definition="" setDefinition={mockSetDefinition} />,
    );
    expect(mockGetDefinitionFetch).not.toHaveBeenCalled();
  });

  it("fetches definition when wordle is provided and definition is empty", async () => {
    mockGetDefinitionFetch.mockResolvedValue({
      noun: ["A test definition"],
    });

    render(
      <Definition
        wordle="test"
        definition=""
        setDefinition={mockSetDefinition}
      />,
    );

    expect(mockGetDefinitionFetch).toHaveBeenCalledWith("test");
  });

  it("renders definition without parenthesis", () => {
    render(
      <Definition
        wordle="test"
        definition={{
          noun: ["A simple definition without parenthesis"],
        }}
        setDefinition={mockSetDefinition}
      />,
    );
    expect(
      screen.getByText("A simple definition without parenthesis"),
    ).toBeInTheDocument();
  });

  it("renders parenthesis label in light blue", () => {
    render(
      <Definition
        wordle="test"
        definition={{
          noun: ["(countable) A test definition"],
        }}
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("(countable)")).toBeInTheDocument();
    expect(screen.getByText("A test definition")).toBeInTheDocument();
  });

  it("displays 'Definition not available' when definition is null", () => {
    render(
      <Definition
        wordle="test"
        definition={null}
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("Definition not available")).toBeInTheDocument();
  });

  it("displays 'Definition not available' when definition is empty string", () => {
    render(
      <Definition
        wordle="test"
        definition=""
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("Definition not available")).toBeInTheDocument();
  });

  it("renders multiple parts of speech", () => {
    render(
      <Definition
        wordle="test"
        definition={{
          noun: ["First noun definition", "Second noun definition"],
          verb: ["First verb definition"],
        }}
        setDefinition={mockSetDefinition}
      />,
    );
    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
    expect(screen.getByText("First noun definition")).toBeInTheDocument();
    expect(screen.getByText("Second noun definition")).toBeInTheDocument();
    expect(screen.getByText("First verb definition")).toBeInTheDocument();
  });
});
