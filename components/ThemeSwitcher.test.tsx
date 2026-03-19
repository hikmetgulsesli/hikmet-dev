import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';

// Mock the useTheme hook
const mockSetTheme = vi.fn();
const mockToggleDarkLight = vi.fn();

vi.mock('@/lib/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: mockSetTheme,
    toggleDarkLight: mockToggleDarkLight,
    isDark: true,
    mounted: true,
  }),
}));

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dark/light toggle button', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('renders theme dropdown button', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByLabelText('Select theme')).toBeInTheDocument();
  });

  it('toggles dark/light mode when toggle button is clicked', () => {
    render(<ThemeSwitcher />);
    const toggleButton = screen.getByLabelText('Switch to light mode');
    fireEvent.click(toggleButton);
    expect(mockToggleDarkLight).toHaveBeenCalled();
  });

  it('opens dropdown when theme button is clicked', () => {
    render(<ThemeSwitcher />);
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    // Dropdown options should be visible
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Cyan')).toBeInTheDocument();
    expect(screen.getByText('Purple')).toBeInTheDocument();
  });

  it('calls setTheme when a theme option is selected', async () => {
    render(<ThemeSwitcher />);
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    const lightOption = screen.getByText('Light');
    fireEvent.click(lightOption);
    
    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  it('closes dropdown after selecting a theme', async () => {
    render(<ThemeSwitcher />);
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    const lightOption = screen.getByText('Light');
    fireEvent.click(lightOption);
    
    await waitFor(() => {
      expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <ThemeSwitcher />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    // Verify dropdown is open
    expect(screen.getByText('Dark')).toBeInTheDocument();
    
    // Click outside
    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);
    
    await waitFor(() => {
      expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    });
  });

  it('shows checkmark for current theme', () => {
    render(<ThemeSwitcher />);
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    // Dark is current theme, should have aria-label="Selected" checkmark
    const darkOption = screen.getByText('Dark').closest('button');
    expect(darkOption?.querySelector('[aria-label="Selected"]')).toBeInTheDocument();
  });

  it('does not show checkmark for non-current theme', () => {
    render(<ThemeSwitcher />);
    const themeButton = screen.getByLabelText('Select theme');
    fireEvent.click(themeButton);
    
    // Light is not current theme, should not have Selected checkmark
    const lightOption = screen.getByText('Light').closest('button');
    expect(lightOption?.querySelector('[aria-label="Selected"]')).not.toBeInTheDocument();
  });
});
