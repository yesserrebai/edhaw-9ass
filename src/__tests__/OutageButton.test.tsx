import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import OutageButton from '../components/OutageButton';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<LanguageProvider>{component}</LanguageProvider>);
};

describe('OutageButton', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders report button', () => {
    renderWithProvider(<OutageButton onSelect={mockOnSelect} />);
    expect(screen.getByText('Signaler une Coupure')).toBeInTheDocument();
  });

  test('opens options when clicked', () => {
    renderWithProvider(<OutageButton onSelect={mockOnSelect} />);

    const button = screen.getByText('Signaler une Coupure');
    fireEvent.click(button);

    expect(screen.getByText('Maintenant')).toBeInTheDocument();
    expect(screen.getByText('Récemment (1-2h)')).toBeInTheDocument();
    expect(screen.getByText('Plus tôt (3-6h)')).toBeInTheDocument();
    expect(screen.getByText('Beaucoup plus tôt (>6h)')).toBeInTheDocument();
  });

  test('calls onSelect when option is clicked', () => {
    renderWithProvider(<OutageButton onSelect={mockOnSelect} />);

    const button = screen.getByText('Signaler une Coupure');
    fireEvent.click(button);

    const option = screen.getByText('Maintenant');
    fireEvent.click(option);

    expect(mockOnSelect).toHaveBeenCalledWith('now');
  });

  test('closes options after selection', () => {
    renderWithProvider(<OutageButton onSelect={mockOnSelect} />);

    const button = screen.getByText('Signaler une Coupure');
    fireEvent.click(button);

    const option = screen.getByText('Maintenant');
    fireEvent.click(option);

    expect(screen.queryByText('Maintenant')).not.toBeInTheDocument();
  });

  test('has correct styling classes', () => {
    renderWithProvider(<OutageButton onSelect={mockOnSelect} />);

    const button = screen.getByText('Signaler une Coupure').closest('button');
    expect(button).toHaveClass(
      'bg-gradient-to-r',
      'from-red-500',
      'to-rose-600',
      'text-white',
      'rounded-xl'
    );
  });
});
