import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] disabled:active:scale-100 disabled:hover:translate-y-0';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-5 py-2.5 rounded-lg',
  }[size];

  const variantClasses = {
    primary:
      'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500 shadow-xs shadow-blue-500/20 hover:shadow-sm hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none',
    secondary:
      'bg-gray-100 dark:bg-surface-hover text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-surface-hover/80 focus:ring-gray-400 hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border border-border bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-surface focus:ring-gray-400 hover:-translate-y-0.5 active:translate-y-0',
    danger:
      'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500 shadow-xs shadow-red-500/20 hover:shadow-sm hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none',
  }[variant];

  const isEffectivelyDisabled = Boolean(disabled || isLoading);

  return (
    <button
      className={cn(baseClasses, sizeClasses, variantClasses, className)}
      disabled={isEffectivelyDisabled}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          variant={variant === 'primary' || variant === 'danger' ? 'white' : 'muted'}
        />
      ) : (
        leftIcon
      )}
      {label ?? children}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;
