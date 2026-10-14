import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DesignSystem } from './DesignSystem';

describe('DesignSystem Remote Component', () => {
  it('renders heading and category tabs', () => {
    render(<DesignSystem />);

    expect(screen.getByRole('heading', { name: /design system & ui components guide/i })).toBeInTheDocument();
    expect(screen.getByText(/semantic tokens/i)).toBeInTheDocument();
    expect(screen.getByText(/color palette/i)).toBeInTheDocument();
    expect(screen.getByText(/actions & atoms/i)).toBeInTheDocument();
    expect(screen.getByText(/form controls/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback & overlays/i)).toBeInTheDocument();
    expect(screen.getByText(/data & layout/i)).toBeInTheDocument();
  });

  it('displays semantic token color swatches in tokens tab', () => {
    render(<DesignSystem />);

    expect(screen.getAllByText('bg-canvas').length).toBeGreaterThan(0);
    expect(screen.getAllByText('bg-surface').length).toBeGreaterThan(0);
    expect(screen.getAllByText('border-border').length).toBeGreaterThan(0);
    expect(screen.getAllByText('text-muted').length).toBeGreaterThan(0);
  });

  it('switches between component categories when clicking tabs', () => {
    render(<DesignSystem />);

    const actionsTab = screen.getByRole('tab', { name: /actions & atoms/i });
    fireEvent.click(actionsTab);

    expect(screen.getByRole('heading', { name: /komponen button/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /komponen badge/i })).toBeInTheDocument();
  });

  it('displays props specifications table and code snippet example', () => {
    render(<DesignSystem />);

    const formsTab = screen.getByRole('tab', { name: /form controls/i });
    fireEvent.click(formsTab);

    expect(screen.getByRole('heading', { name: /komponen textinput/i })).toBeInTheDocument();
    expect(screen.getAllByText(/startadornment/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/helpertext/i).length).toBeGreaterThan(0);
  });

  it('renders data & layout components in their category tab', () => {
    render(<DesignSystem />);

    const dataTab = screen.getByRole('tab', { name: /data & layout/i });
    fireEvent.click(dataTab);

    expect(screen.getByRole('heading', { name: /komponen servertable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /komponen card/i })).toBeInTheDocument();
  });

  it('renders color palette tab with full chromatic scales', () => {
    render(<DesignSystem />);

    const paletteTab = screen.getByRole('tab', { name: /color palette/i });
    expect(paletteTab).toBeInTheDocument();

    fireEvent.click(paletteTab);

    expect(screen.getByRole('heading', { name: /brand primary/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /neutral slate/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /success emerald/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /danger red/i })).toBeInTheDocument();
  });
});
