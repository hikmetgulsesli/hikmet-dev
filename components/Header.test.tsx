import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock the ThemeSwitcher component
vi.mock('./ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.documentElement.className = '';
  });

  it('renders the logo with name', () => {
    render(<Header />);
    expect(screen.getByText('Hikmet Gulsesli')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Writing')).toBeInTheDocument();
  });

  it('renders the live badge', () => {
    render(<Header />);
    expect(screen.getByText('10 agents live')).toBeInTheDocument();
  });

  it('renders social icons with correct labels', () => {
    render(<Header />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Discord')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders the theme switcher', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('highlights active nav link based on current route', () => {
    render(<Header />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-primary');
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    
    // After clicking, should show close button
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    
    // Mobile nav links should be visible
    const mobileNav = screen.getAllByText('Home');
    expect(mobileNav.length).toBeGreaterThan(0);
  });

  it('closes mobile menu when close button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    
    // Should show open button again
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    render(<Header />);
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
