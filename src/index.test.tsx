describe('index', () => {
  it('renders App component into root element', () => {
    // Create mocks before requiring the module
    const mockRender = jest.fn();
    const mockCreateRoot = jest.fn().mockReturnValue({
      render: mockRender,
      unmount: jest.fn(),
    });

    const mockGetElementById = jest.fn().mockReturnValue(document.createElement('div'));

    // Mock the modules
    jest.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);
    
    // Use doMock to mock react-dom/client before the module is loaded
    jest.doMock('react-dom/client', () => ({
      __esModule: true,
      default: {
        createRoot: mockCreateRoot,
      },
    }));

    // Now require index.jsx which will use our mocks
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./index.jsx');

    // Verify getElementById was called with 'root'
    expect(mockGetElementById).toHaveBeenCalledWith('root');

    // Verify createRoot was called with the root element
    expect(mockCreateRoot).toHaveBeenCalledWith(expect.any(HTMLDivElement));

    // Verify render was called
    expect(mockRender).toHaveBeenCalled();

    // Clean up
    jest.restoreAllMocks();
    jest.resetModules();
  });
});
