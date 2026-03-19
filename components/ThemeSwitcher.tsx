"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type ThemeOption = "light" | "dark" | "system";

const themeOptions: { value: ThemeOption; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Açık", icon: Sun },
  { value: "dark", label: "Koyu", icon: Moon },
  { value: "system", label: "Sistem", icon: Monitor },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentThemeOption = themeOptions.find((t) => t.value === theme);
  const CurrentIcon = currentThemeOption?.icon || Sun;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        aria-label="Tema değiştir"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Tema</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-dark)] shadow-lg z-50 p-2">
            <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Tema Seçimi
            </div>
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </div>
                  {isActive && <Check className="w-4 h-4" />}
                </button>
              );
            })}
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-[var(--color-border-dark)]">
              <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Renk Paleti
              </div>
              <div className="flex gap-2 px-3 py-2">
                <button
                  className="w-6 h-6 rounded-full bg-cyan-400 ring-2 ring-offset-2 ring-cyan-400 dark:ring-offset-[var(--color-surface-dark)]"
                  aria-label="Cyan tema"
                />
                <button
                  className="w-6 h-6 rounded-full bg-teal-400 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="Teal tema"
                />
                <button
                  className="w-6 h-6 rounded-full bg-emerald-400 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="Emerald tema"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
