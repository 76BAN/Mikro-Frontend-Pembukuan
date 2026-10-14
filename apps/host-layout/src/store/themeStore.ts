import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

function applyThemeToDOM(theme: ThemeMode) {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

function getInitialTheme(): ThemeMode {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      applyThemeToDOM(saved);
      return saved;
    }
  }
  return 'light';
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      applyThemeToDOM(nextTheme);
      return { theme: nextTheme };
    }),
  setTheme: (theme) => {
    applyThemeToDOM(theme);
    set({ theme });
  },
}));
