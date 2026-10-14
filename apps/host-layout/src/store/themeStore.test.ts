import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from './themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    useThemeStore.setState({ theme: 'light' });
  });

  it('initializes with default light theme', () => {
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('toggles theme between light and dark', () => {
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('sets theme explicitly', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
