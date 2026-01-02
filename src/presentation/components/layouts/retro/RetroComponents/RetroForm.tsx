'use client';

import { FormHTMLAttributes, forwardRef } from 'react';

interface RetroFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

/**
 * RetroForm - Windows 98 style form wrapper
 */
export const RetroForm = forwardRef<HTMLFormElement, RetroFormProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`retro-form ${className}`}
        {...props}
      >
        {children}
      </form>
    );
  }
);

RetroForm.displayName = 'RetroForm';

/**
 * RetroFormRow - Horizontal form layout row
 */
export function RetroFormRow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`retro-form-row ${className}`}>{children}</div>;
}

/**
 * RetroGroupBox - Windows 98 style group box
 */
export function RetroGroupBox({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`retro-groupbox ${className}`}>
      <span className="retro-groupbox-title">{title}</span>
      {children}
    </div>
  );
}
