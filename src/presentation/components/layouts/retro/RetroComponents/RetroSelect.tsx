'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface RetroSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RetroSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: RetroSelectOption[];
}

/**
 * RetroSelect - Windows 98 style dropdown
 */
export const RetroSelect = forwardRef<HTMLSelectElement, RetroSelectProps>(
  ({ label, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="retro-input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`retro-select ${className}`}
          {...props}
        >
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
      </div>
    );
  }
);

RetroSelect.displayName = 'RetroSelect';
