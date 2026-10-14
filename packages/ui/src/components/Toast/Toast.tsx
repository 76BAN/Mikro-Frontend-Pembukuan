import React, { useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'info',
  duration,
  onClose,
  className,
  ...props
}) => {
  useEffect(() => {
    if (!duration || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    info: <Info className="h-5 w-5 shrink-0 text-blue-500" />,
    success: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />,
    error: <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />,
  };

  const variantBorder = {
    info: 'border-blue-500',
    success: 'border-green-500',
    warning: 'border-amber-500',
    error: 'border-red-500',
  }[variant];

  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border border-l-4 border-border bg-surface shadow-xl text-gray-900 dark:text-gray-100 transition-all select-none w-full max-w-sm',
        variantBorder,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[variant]}</div>

      <div className="flex-1 space-y-0.5">
        <h5 className="font-semibold text-sm m-0 text-gray-900 dark:text-gray-100">
          {title}
        </h5>
        {description && (
          <p className="text-xs text-muted m-0">
            {description}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="rounded-lg p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer -mr-1 -mt-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  className,
  children,
  ...props
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }[position];

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4 [&>*]:pointer-events-auto',
        positionClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Toast;
