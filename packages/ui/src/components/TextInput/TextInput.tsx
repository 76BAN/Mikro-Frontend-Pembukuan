import React, { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  containerClassName,
  onChange,
  value,
  id: customId,
  className,
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const hasAdornment = Boolean(startAdornment || endAdornment);

  return (
    <div className={cn('flex flex-col gap-1 mb-3', containerClassName)}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {hasAdornment ? (
        <div
          className={cn(
            'relative flex items-center w-full rounded-md border bg-white dark:bg-canvas shadow-sm transition-all duration-150',
            error
              ? 'border-red-500 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-400/20'
              : 'border-border focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15'
          )}
        >
          {startAdornment && (
            <div className="pl-3 pr-1 text-gray-500 dark:text-gray-400 select-none flex items-center text-sm shrink-0">
              {startAdornment}
            </div>
          )}
          <input
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'w-full bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none',
              startAdornment && 'pl-1.5',
              endAdornment && 'pr-1.5',
              className
            )}
            {...props}
          />
          {endAdornment && (
            <div className="pr-3 pl-1 text-gray-500 dark:text-gray-400 select-none flex items-center text-sm shrink-0">
              {endAdornment}
            </div>
          )}
        </div>
      ) : (
        <input
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-md border bg-white dark:bg-canvas px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-offset-0',
            error
              ? 'border-red-500 text-red-900 dark:text-red-200 focus:border-red-500 focus:ring-red-400/20'
              : 'border-border focus:border-blue-500 focus:ring-blue-500/15',
            className
          )}
          {...props}
        />
      )}
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
      )}
    </div>
  );
};

export default TextInput;
