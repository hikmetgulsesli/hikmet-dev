/* eslint-disable react-hooks/set-state-in-effect */
"use client";

// Theme initialization requires setState in effects for client-side hydration

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
});

// Helper to get initial theme from localStorage (runs once)
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored || "system";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on client side only
  useEffect(() => {
    // Only run once on mount
    const initialTheme = getInitialTheme();
    if (initialTheme !== "system") {
      setThemeState(initialTheme);
    }
    setMounted(true);
  }, []);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    let newResolvedTheme: "light" | "dark";

    if (theme === "system") {
      newResolvedTheme = mediaQuery.matches ? "dark" : "light";
    } else {
      newResolvedTheme = theme;
    }

    setResolvedTheme(newResolvedTheme);

    if (newResolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Listen for system theme changes when using system theme
    if (theme === "system") {
      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? "dark" : "light");
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
