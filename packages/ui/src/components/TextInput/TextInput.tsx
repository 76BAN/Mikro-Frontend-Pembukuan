import React, { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  onChange,
  value,
  id: customId,
  className,
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1',
          error
            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-400'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};

export default TextInput;
