'use client';

import { animated, useSpring } from '@react-spring/web';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  animated?: boolean;
}

/**
 * MainButton - Premium animated button component
 */
export const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      animated: enableAnimation = true,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [spring, api] = useSpring(() => ({
      scale: 1,
      config: { tension: 300, friction: 10 },
    }));

    const handleMouseEnter = () => {
      if (enableAnimation && !disabled) {
        api.start({ scale: 1.05 });
      }
    };

    const handleMouseLeave = () => {
      if (enableAnimation) {
        api.start({ scale: 1 });
      }
    };

    const handleMouseDown = () => {
      if (enableAnimation && !disabled) {
        api.start({ scale: 0.95 });
      }
    };

    const handleMouseUp = () => {
      if (enableAnimation && !disabled) {
        api.start({ scale: 1.05 });
      }
    };

    const variantClasses = {
      primary: 'main-btn-primary',
      secondary: 'main-btn-secondary',
      ghost: 'main-btn-ghost',
      danger: 'main-btn-primary bg-gradient-to-r from-red-500 to-red-600',
    };

    const sizeClasses = {
      sm: 'main-btn-sm',
      md: '',
      lg: 'main-btn-lg',
      icon: 'main-btn-icon',
    };

    return (
      <animated.button
        ref={ref}
        className={`main-btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        style={{ transform: spring.scale.to((s) => `scale(${s})`) }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </animated.button>
    );
  }
);

MainButton.displayName = 'MainButton';
