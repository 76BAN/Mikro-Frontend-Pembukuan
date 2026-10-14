import React from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'white' | 'muted';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: React.ReactNode;
  labelPosition?: 'right' | 'bottom';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  label,
  labelPosition = 'right',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }[size];

  const variantClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    white: 'text-white',
    muted: 'text-gray-400 dark:text-gray-500',
  }[variant];

  return (
    <div
      role="status"
      className={cn(
        'inline-flex items-center justify-center select-none',
        labelPosition === 'bottom' ? 'flex-col gap-2' : 'flex-row gap-2.5',
        className
      )}
      {...props}
    >
      <svg
        className={cn('animate-spin shrink-0', sizeClasses, variantClasses)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label ? (
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      ) : (
        <span className="sr-only">Memuat...</span>
      )}
    </div>
  );
};

export default Spinner;
