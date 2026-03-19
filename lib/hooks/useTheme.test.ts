import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage and document classes
    localStorage.clear();
    document.documentElement.className = '';
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('initializes with dark theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('sets theme to localStorage when setTheme is called', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('light');
    });
    
    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('hikmet-dev-theme')).toBe('light');
  });

  it('applies correct class to html element for dark theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('applies correct class to html element for light theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('light');
    });
    
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('applies correct classes for cyan theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('cyan');
    });
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('theme-cyan')).toBe(true);
  });

  it('applies correct classes for purple theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('purple');
    });
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('theme-purple')).toBe(true);
  });

  it('toggles from dark to light', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    act(() => {
      result.current.toggleDarkLight();
    });
    
    expect(result.current.theme).toBe('light');
  });

  it('toggles from light to dark', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('light');
    });
    
    act(() => {
      result.current.toggleDarkLight();
    });
    
    expect(result.current.theme).toBe('dark');
  });

  it('toggles from cyan to light', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('cyan');
    });
    
    act(() => {
      result.current.toggleDarkLight();
    });
    
    expect(result.current.theme).toBe('light');
  });

  it('restores theme from localStorage on mount', () => {
    localStorage.setItem('hikmet-dev-theme', 'purple');
    
    const { result } = renderHook(() => useTheme());
    
    // Wait for useEffect
    act(() => {});
    
    expect(result.current.theme).toBe('purple');
  });
});
