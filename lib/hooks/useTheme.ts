import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

export type Theme = 'dark' | 'light' | 'cyan' | 'purple';

const THEME_STORAGE_KEY = 'hikmet-dev-theme';

// Use useLayoutEffect for theme to prevent flash
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'light', 'theme-cyan', 'theme-purple');
    
    // Add base theme class
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.add('light');
    } else if (newTheme === 'cyan') {
      root.classList.add('dark', 'theme-cyan');
    } else if (newTheme === 'purple') {
      root.classList.add('dark', 'theme-purple');
    }
  }, []);

  // Initialize theme on mount
  useIsomorphicLayoutEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = stored && ['dark', 'light', 'cyan', 'purple'].includes(stored) 
      ? stored 
      : 'dark';
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  const toggleDarkLight = useCallback(() => {
    const newTheme = theme === 'dark' || theme === 'cyan' || theme === 'purple' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleDarkLight,
    isDark: theme === 'dark' || theme === 'cyan' || theme === 'purple',
    mounted,
  };
}
