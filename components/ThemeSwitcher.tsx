'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, type Theme } from '@/lib/hooks/useTheme';
import { Sun, Moon, Palette, Check } from 'lucide-react';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'cyan', label: 'Cyan', icon: <div className="w-4 h-4 rounded-full bg-cyan-500" /> },
  { value: 'purple', label: 'Purple', icon: <div className="w-4 h-4 rounded-full bg-purple-500" /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme, toggleDarkLight, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Dark/Light toggle button */}
      <button
        onClick={toggleDarkLight}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Theme dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
          aria-label="Select theme"
          aria-expanded={isOpen}
        >
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline text-sm capitalize">{theme}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-slate-900 shadow-xl">
            <div className="p-1">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleThemeSelect(t.value)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    {t.icon}
                    {t.label}
                  </span>
                  {theme === t.value && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
