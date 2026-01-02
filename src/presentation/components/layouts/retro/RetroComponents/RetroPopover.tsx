'use client';

import { useEffect, useRef } from 'react';

interface RetroPopoverProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

/**
 * RetroPopover - Windows 98 style dropdown menu
 */
export function RetroPopover({ children, onClose, className = '' }: RetroPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`retro-popover ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * RetroPopoverItem - Menu item for RetroPopover
 */
export function RetroPopoverItem({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="retro-popover-item"
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {children}
    </button>
  );
}

/**
 * RetroPopoverSeparator - Divider line
 */
export function RetroPopoverSeparator() {
  return <div className="retro-popover-separator" />;
}
