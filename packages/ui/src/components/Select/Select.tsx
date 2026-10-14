import React, { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder,
  error,
  onChange,
  value,
  id: customId,
  className,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const selectId = customId || generatedId;

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full appearance-none rounded-md border bg-white dark:bg-canvas px-3 py-2 pr-10 text-sm text-gray-900 dark:text-gray-100 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 text-red-900 dark:text-red-200 focus:border-red-500 focus:ring-red-400'
              : 'border-border focus:border-blue-500 focus:ring-blue-400',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-muted bg-surface">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-surface text-gray-900 dark:text-gray-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      {error && <span className="text-xs text-red-600 dark:text-red-400">{error}</span>}
    </div>
  );
};

export default Select;
