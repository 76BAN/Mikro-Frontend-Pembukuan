import React from 'react';
import { BookOpen, LogOut, User, Moon, Sun } from 'lucide-react';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { cn } from '../../lib/utils';
export interface HeaderNavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface HeaderProps {
  title: string;
  username?: string;
  onLogout?: () => void;
  navLinks?: HeaderNavLink[];
  onNavigate?: (href: string) => void;
  className?: string;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}
export const Header: React.FC<HeaderProps> = ({
  title,
  username,
  onLogout,
  navLinks = [],
  onNavigate,
  className,
  theme = 'light',
  onThemeToggle,
}) => {
  return (
    <header
      className={cn(
        'w-full bg-gray-900 text-white shadow-sm px-6 py-3 flex items-center justify-between',
        className
      )}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-400" />
          <h1 className="text-lg font-bold tracking-tight text-white m-0">
            {title}
          </h1>
        </div>

        {navLinks.length > 0 && (
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => onNavigate?.(link.href)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
                  link.active
                    ? 'bg-gray-800 text-blue-400 font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        {onThemeToggle && (
          <div className="flex items-center gap-1.5 border-r border-gray-700 pr-3">
            <Sun className="h-3.5 w-3.5 text-amber-400" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={onThemeToggle}
              id="header-theme-toggle"
            />
            <Moon className="h-3.5 w-3.5 text-blue-300" />
          </div>
        )}
        {username ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-300">
              <User className="h-4 w-4 text-gray-400" />
              <span>Halo, <strong className="text-white">{username}</strong></span>
            </div>
            {onLogout && (
              <Button
                label="Keluar"
                variant="outline"
                className="text-xs py-1 px-3 border-gray-700 text-gray-200 hover:bg-gray-800"
                onClick={onLogout}
              />
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <LogOut className="h-3.5 w-3.5" />
            <span>Belum Masuk</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
