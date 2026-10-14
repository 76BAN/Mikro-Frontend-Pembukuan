import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface DropdownMenuContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenu components must be used inside <DropdownMenu>');
  return ctx;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  defaultOpen = false,
  className,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, toggle, close }}>
      <div
        ref={containerRef}
        className={cn('relative inline-block text-left', className)}
        {...props}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export type DropdownMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  className,
  children,
  onClick,
  ...props
}) => {
  const { isOpen, toggle } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right';
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  align = 'right',
  className,
  children,
  ...props
}) => {
  const { isOpen } = useDropdownMenuContext();
  if (!isOpen) return null;

  return (
    <div
      role="menu"
      className={cn(
        'absolute z-50 mt-1 min-w-[10rem] rounded-xl border border-border bg-surface p-1 shadow-xl transition-all duration-150 focus:outline-none',
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger';
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  variant = 'default',
  className,
  children,
  onClick,
  disabled,
  ...props
}) => {
  const { close } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
    close();
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors text-left select-none cursor-pointer',
        variant === 'danger'
          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-surface-hover',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className,
  ...props
}) => (
  <div
    role="separator"
    className={cn('my-1 h-px bg-border', className)}
    {...props}
  />
);

export default DropdownMenu;
