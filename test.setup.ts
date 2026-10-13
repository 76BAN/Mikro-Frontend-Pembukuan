import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// JSDOM does not implement window.scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn();
}
