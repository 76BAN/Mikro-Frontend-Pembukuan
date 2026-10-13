import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('Auth Zustand Store', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('starts with null user and unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('sets user and updates isAuthenticated on login', () => {
    useAuthStore.getState().login({ username: 'ahmad' });
    const state = useAuthStore.getState();

    expect(state.user).toEqual({ username: 'ahmad' });
    expect(state.isAuthenticated).toBe(true);
  });

  it('clears user and resets isAuthenticated on logout', () => {
    useAuthStore.getState().login({ username: 'ahmad' });
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
