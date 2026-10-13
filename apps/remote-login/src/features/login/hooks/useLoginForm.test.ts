import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';

describe('useLoginForm Hook', () => {
  it('initializes with empty fields and no error', () => {
    const { result } = renderHook(() => useLoginForm({}));
    expect(result.current.username).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBe('');
  });

  it('updates username and clears error on change', () => {
    const { result } = renderHook(() => useLoginForm({}));

    act(() => {
      result.current.setUsername('budi');
    });

    expect(result.current.username).toBe('budi');
    expect(result.current.error).toBe('');
  });

  it('sets error when submitted with empty username', () => {
    const handleSuccess = vi.fn();
    const { result } = renderHook(() => useLoginForm({ onSuccess: handleSuccess }));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe('Username wajib diisi');
    expect(handleSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess when valid username submitted', () => {
    const handleSuccess = vi.fn();
    const { result } = renderHook(() => useLoginForm({ onSuccess: handleSuccess }));

    act(() => {
      result.current.setUsername('admin');
      result.current.setPassword('secret');
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe('');
    expect(handleSuccess).toHaveBeenCalledWith({ username: 'admin' });
  });
});
