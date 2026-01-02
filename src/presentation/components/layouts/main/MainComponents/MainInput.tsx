'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * MainInput - Premium input component with glassmorphism
 */
export const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="main-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`main-input ${error ? 'main-input-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="main-input-error-text">{error}</p>}
        {helperText && !error && (
          <p className="text-white/50 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

MainInput.displayName = 'MainInput';
