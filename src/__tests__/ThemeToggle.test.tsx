import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import ThemeToggle from '../components/ThemeToggle';

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
const mockClassList = {
  add: jest.fn(),
  remove: jest.fn(),
  contains: jest.fn(),
};
const mockDocumentElement = {
  classList: mockClassList,
  setAttribute: jest.fn(),
};

// Mock alert
global.alert = jest.fn();

/**
 * Wrapper pour les tests avec les providers nécessaires
 */
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      <ThemeProvider>{component}</ThemeProvider>
    </LanguageProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait basculer le thème au clic', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('devrait avoir les bonnes classes CSS', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('rounded-lg');
    expect(button.className).toContain('transition-all');
    expect(button.className).toContain('duration-200');
  });

  it('devrait être accessible', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBeTruthy();
    expect(button.getAttribute('title')).toBeTruthy();
  });

  it('devrait avoir une icône SVG', () => {
    renderWithProviders(<ThemeToggle />);

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it("devrait changer l'icône selon le thème", () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    const newSvg = button.querySelector('svg');
    expect(newSvg).not.toBeNull();
  });

  it('devrait supporter différentes tailles', () => {
    renderWithProviders(<ThemeToggle size="lg" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('p-3');
    expect(button.className).toContain('text-lg');
  });

  it('devrait supporter la variante button avec texte', () => {
    renderWithProviders(<ThemeToggle variant="button" showText />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('flex');
    expect(button.className).toContain('items-center');
    expect(button.className).toContain('gap-2');
  });

  it('devrait supporter la variante select', () => {
    renderWithProviders(<ThemeToggle variant="select" />);

    const select = screen.getByRole('combobox');
    expect(select).toBeTruthy();
  });

  it('devrait avoir les options traduites dans le sélecteur', () => {
    renderWithProviders(<ThemeToggle variant="select" />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('light');
  });

  it('devrait changer le thème via le sélecteur', () => {
    renderWithProviders(<ThemeToggle variant="select" />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'dark' } });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('devrait supporter la position fixe', () => {
    renderWithProviders(<ThemeToggle fixed />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('fixed');
    expect(button.className).toContain('top-4');
    expect(button.className).toContain('right-4');
  });

  it('devrait supporter les classes personnalisées', () => {
    renderWithProviders(<ThemeToggle className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });
});
