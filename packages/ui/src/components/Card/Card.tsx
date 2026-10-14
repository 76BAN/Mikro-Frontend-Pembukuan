import React from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outlined';
  hoverLift?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverLift = false,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default:
      'bg-surface border border-border shadow-sm',
    glass:
      'bg-surface/80 backdrop-blur-md border border-border/80 shadow-sm',
    outlined:
      'bg-transparent border border-border',
  }[variant];

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200 p-5 ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
        variantClasses,
        hoverLift && 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('mb-3', className)} {...props}>
      {children}
    </div>
  );
};

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn('text-base font-semibold text-gray-900 dark:text-gray-100 m-0', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm text-muted m-0 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
