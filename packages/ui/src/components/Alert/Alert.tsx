import React from 'react';
import type { HTMLAttributes } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  onClose,
  className,
  children,
  ...props
}) => {
  const defaultIcon = {
    info: <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />,
    success: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />,
    error: <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />,
  }[variant];

  const variantClasses = {
    info: 'bg-blue-50/80 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800/80 dark:text-blue-200',
    success: 'bg-green-50/80 border-green-200 text-green-900 dark:bg-green-950/40 dark:border-green-800/80 dark:text-green-200',
    warning: 'bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/80 dark:text-amber-200',
    error: 'bg-red-50/80 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800/80 dark:text-red-200',
  }[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border text-sm transition-colors',
        variantClasses,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icon !== undefined ? icon : defaultIcon}</div>

      <div className="flex-1 space-y-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children}
      </div>

      {onClose && (
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="rounded-lg p-1 text-current opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer -mr-1 -mt-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle: React.FC<AlertTitleProps> = ({ className, children, ...props }) => (
  <h4 className={cn('font-semibold tracking-tight m-0 text-sm', className)} {...props}>
    {children}
  </h4>
);

export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('text-xs opacity-90 m-0 mt-0.5', className)} {...props}>
    {children}
  </div>
);

export default Alert;
