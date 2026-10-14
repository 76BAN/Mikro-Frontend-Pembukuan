import React, { useId } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  id?: string;
  className?: string;
  name?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  indeterminate = false,
  disabled = false,
  label,
  id: customId,
  className,
  name,
}) => {
  const generatedId = useId();
  const checkboxId = customId || generatedId;

  const handleClick = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCheckedChange(!checked);
    }
  };

  const ariaChecked = indeterminate ? 'mixed' : checked;
  const isFilled = checked || indeterminate;

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)}>
      <button
        type="button"
        role="checkbox"
        id={checkboxId}
        name={name}
        aria-checked={ariaChecked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-4 w-4 shrink-0 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center cursor-pointer',
          isFilled
            ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500 text-white'
            : 'bg-white dark:bg-canvas border-border',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {indeterminate ? (
          <Minus className="h-3 w-3 stroke-[3]" />
        ) : checked ? (
          <Check className="h-3 w-3 stroke-[3]" />
        ) : null}
      </button>

      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
