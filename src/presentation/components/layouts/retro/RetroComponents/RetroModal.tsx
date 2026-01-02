'use client';

import { useEffect } from 'react';
import { RetroButton } from './RetroButton';

interface RetroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}

/**
 * RetroModal - Windows 98 style dialog box
 */
export function RetroModal({
  isOpen,
  onClose,
  title,
  icon = '💾',
  children,
  footer,
  width = 400,
}: RetroModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="retro-modal-overlay">
      <div className="retro-modal" style={{ width: `${width}px` }}>
        {/* Title Bar */}
        <div className="retro-modal-header">
          <div className="retro-modal-title">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          <button className="retro-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className="retro-modal-body">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="retro-modal-footer">{footer}</div>
        ) : (
          <div className="retro-modal-footer">
            <RetroButton onClick={onClose}>OK</RetroButton>
            <RetroButton onClick={onClose}>Cancel</RetroButton>
          </div>
        )}
      </div>
    </div>
  );
}
