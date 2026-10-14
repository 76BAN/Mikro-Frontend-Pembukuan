import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
}) => {
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  const descId = `modal-desc-${generatedId}`;

  useEffect(() => {
    if (!isOpen) return;

    if (closeOnEsc) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[size];

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop Overlay */}
      <div
        data-testid="modal-overlay"
        onClick={closeOnOverlayClick ? onClose : undefined}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Dialog Panel */}
      <div
        className={cn(
          'relative z-10 w-full rounded-2xl bg-surface border border-border shadow-2xl p-6 transition-all duration-200 text-gray-900 dark:text-gray-100',
          sizeClasses,
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-border">
            <div>
              {title && (
                <h3 id={titleId} className="text-lg font-bold text-gray-900 dark:text-gray-100 m-0">
                  {title}
                </h3>
              )}
              {description && (
                <p id={descId} className="text-xs text-muted m-0 mt-1">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                aria-label="Tutup"
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        <div className="py-4">{children}</div>

        {footer && (
          <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default Modal;
