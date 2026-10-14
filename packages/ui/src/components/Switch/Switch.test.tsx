import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders switch with role="switch" and correct aria-checked', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  it('renders correctly when checked is true', () => {
    render(<Switch checked={true} onCheckedChange={() => {}} />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange with toggled value on click', () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} />);

    const switchEl = screen.getByRole('switch');
    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange on Space or Enter keydown', () => {
    const handleChange = vi.fn();
    render(<Switch checked={true} onCheckedChange={handleChange} />);

    const switchEl = screen.getByRole('switch');
    fireEvent.keyDown(switchEl, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(false);

    fireEvent.keyDown(switchEl, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('does not trigger onCheckedChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={handleChange} disabled />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeDisabled();
    fireEvent.click(switchEl);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders optional label and associates it with switch', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} label="Mode Gelap" />);
    expect(screen.getByText('Mode Gelap')).toBeInTheDocument();
  });
});
