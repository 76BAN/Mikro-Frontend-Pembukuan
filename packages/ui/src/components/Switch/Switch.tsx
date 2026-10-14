import React, { useId } from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  name?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  id: customId,
  className,
  name,
}) => {
  const generatedId = useId();
  const switchId = customId || generatedId;

  const handleToggle = () => {
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

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)}>
      <button
        type="button"
        role="switch"
        id={switchId}
        name={name}
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      {label && (
        <label
          htmlFor={switchId}
          className={cn(
            'text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;
