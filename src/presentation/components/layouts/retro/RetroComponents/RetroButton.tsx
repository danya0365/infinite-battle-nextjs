'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
}

/**
 * RetroButton - Windows 98 style 3D beveled button
 */
export const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ children, variant = 'default', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`retro-btn ${variant === 'primary' ? 'retro-btn-default' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RetroButton.displayName = 'RetroButton';
