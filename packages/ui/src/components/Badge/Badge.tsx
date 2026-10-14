import React from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  ping?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  ping = false,
  icon,
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 font-semibold rounded-full select-none transition-all duration-150';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  const variantClasses = {
    default:
      'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-700/60 dark:text-gray-200 dark:border-gray-600',
    success:
      'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/80',
    danger:
      'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/80',
    warning:
      'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/80',
    info:
      'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/80',
    outline:
      'border border-gray-300 text-gray-700 bg-transparent dark:border-gray-600 dark:text-gray-200',
  }[variant];

  const dotColors = {
    default: 'bg-gray-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    outline: 'bg-gray-500',
  }[variant];

  return (
    <span
      className={cn(baseClasses, sizeClasses, variantClasses, className)}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0" data-testid="badge-dot">
          {ping && (
            <span
              data-testid="badge-ping"
              className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors)}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', dotColors)} />
        </span>
      )}
      {icon}
      {children}
    </span>
  );
};

export default Badge;
