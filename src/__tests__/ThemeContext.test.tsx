import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
  value: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    },
    setAttribute: jest.fn(),
  },
  writable: true,
});

function TestComponent() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('system')} data-testid="set-system">
        Set System
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should provide default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(screen.getByTestId('resolved-theme').textContent).toBe('light');
  });

  it('should change theme when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('set-dark'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('resolved-theme').textContent).toBe('dark');
  });

  it('should toggle theme when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const initialTheme = screen.getByTestId('resolved-theme').textContent;
    fireEvent.click(screen.getByTestId('toggle'));

    const newTheme = screen.getByTestId('resolved-theme').textContent;
    expect(newTheme).not.toBe(initialTheme);
  });

  it('should save theme to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('set-dark'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should load theme from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('should apply theme classes to document.documentElement', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('set-dark'));

    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'dark'
    );
  });

  it('should remove dark class when switching to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('set-dark'));
    fireEvent.click(screen.getByTestId('set-light'));

    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      'dark'
    );
  });
});
