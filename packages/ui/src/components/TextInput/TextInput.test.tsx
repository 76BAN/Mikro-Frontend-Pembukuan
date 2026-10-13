import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput Component', () => {
  it('renders input with placeholder and label', () => {
    render(
      <TextInput
        label="Nama Pengguna"
        placeholder="Masukkan username"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('Nama Pengguna')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan username')).toBeInTheDocument();
  });

  it('calls onChange with new value when typed', () => {
    const handleChange = vi.fn();
    render(
      <TextInput
        label="Email"
        placeholder="user@mail.com"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@mail.com' } });
    expect(handleChange).toHaveBeenCalledWith('test@mail.com');
  });

  it('renders error message when error prop is provided', () => {
    render(
      <TextInput
        label="Password"
        value=""
        onChange={() => {}}
        error="Password wajib diisi"
      />
    );
    expect(screen.getByText('Password wajib diisi')).toBeInTheDocument();
  });
});
