'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface MainSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MainSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: MainSelectOption[];
  placeholder?: string;
}

/**
 * MainSelect - Premium select component with glassmorphism
 */
export const MainSelect = forwardRef<HTMLSelectElement, MainSelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="main-input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`main-select ${error ? 'main-input-error' : ''} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="main-input-error-text">{error}</p>}
      </div>
    );
  }
);

MainSelect.displayName = 'MainSelect';
