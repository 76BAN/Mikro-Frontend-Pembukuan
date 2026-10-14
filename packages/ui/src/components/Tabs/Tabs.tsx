import React, { createContext, useContext, useState } from 'react';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface TabsContextValue {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');
  return ctx;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) setUncontrolledValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn('w-full space-y-4', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...props }) => (
  <div
    role="tablist"
    className={cn(
      'inline-flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-canvas/60 border border-border',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled,
  className,
  children,
  ...props
}) => {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-lg transition-all select-none cursor-pointer',
        isActive
          ? 'bg-surface text-gray-900 dark:text-white shadow-xs'
          : 'text-muted hover:text-gray-900 dark:hover:text-white',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const { value: activeValue } = useTabsContext();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('focus:outline-none transition-opacity duration-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tabs;
