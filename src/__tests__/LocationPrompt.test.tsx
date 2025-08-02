import { render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import LocationPrompt from '../components/LocationPrompt';

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

// Mock alert
global.alert = jest.fn();

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};
Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
});

// Mock fetch
global.fetch = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(<LanguageProvider>{component}</LanguageProvider>);
};

describe('LocationPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait afficher le message de demande de localisation', () => {
    renderWithProvider(<LocationPrompt onLocationSet={() => {}} />);

    expect(screen.getByText(/demande de votre localisation/i)).toBeTruthy();
  });

  it("devrait gérer l'erreur de géolocalisation", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error();
    });

    renderWithProvider(<LocationPrompt onLocationSet={() => {}} />);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it("devrait gérer l'erreur de géocodage", async () => {
    const mockPosition = {
      coords: {
        latitude: 36.8065,
        longitude: 10.1815,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementation(success => {
      success(mockPosition);
    });

    (global.fetch as jest.Mock).mockRejectedValue(new Error('Geocoding error'));

    renderWithProvider(<LocationPrompt onLocationSet={() => {}} />);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('devrait récupérer la localisation avec succès', async () => {
    const mockPosition = {
      coords: {
        latitude: 36.8065,
        longitude: 10.1815,
      },
    };

    const mockGeocodingResponse = {
      display_name: 'Tunis, Tunisia',
    };

    mockGeolocation.getCurrentPosition.mockImplementation(success => {
      success(mockPosition);
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGeocodingResponse,
    });

    const mockOnLocationSet = jest.fn();

    renderWithProvider(<LocationPrompt onLocationSet={mockOnLocationSet} />);

    await waitFor(() => {
      expect(mockOnLocationSet).toHaveBeenCalledWith({
        latitude: 36.8065,
        longitude: 10.1815,
        address: 'Tunis, Tunisia',
      });
    });
  });
});
