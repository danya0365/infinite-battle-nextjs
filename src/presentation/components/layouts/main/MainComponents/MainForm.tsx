'use client';

import { FormHTMLAttributes, forwardRef } from 'react';

interface MainFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

/**
 * MainForm - Form wrapper with consistent styling
 */
export const MainForm = forwardRef<HTMLFormElement, MainFormProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`space-y-4 ${className}`}
        {...props}
      >
        {children}
      </form>
    );
  }
);

MainForm.displayName = 'MainForm';

/**
 * Form field group component
 */
export function MainFormGroup({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

/**
 * Form row for horizontal layouts
 */
export function MainFormRow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex gap-4 ${className}`}>{children}</div>;
}
