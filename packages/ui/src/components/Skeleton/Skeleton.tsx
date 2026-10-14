import React from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'shimmer';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  label?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'pulse',
  rounded = 'md',
  label = 'Memuat konten...',
  className,
  children,
  ...props
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded];

  const variantClasses = {
    pulse: 'animate-pulse bg-gray-200/90 dark:bg-gray-700/70',
    shimmer:
      'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
  }[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'select-none transition-colors',
        roundedClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
};

export default Skeleton;
