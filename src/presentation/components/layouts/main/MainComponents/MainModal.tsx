'use client';

import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef } from 'react';

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * MainModal - Premium modal with glassmorphism and animations
 */
export function MainModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: MainModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)',
    config: { tension: 300, friction: 20 },
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <animated.div
      style={overlaySpring}
      className="main-modal-overlay"
      onClick={handleOverlayClick}
    >
      <animated.div
        ref={modalRef}
        style={modalSpring}
        className={`main-modal ${sizeClasses[size]}`}
      >
        <div className="main-modal-header">
          <h2 className="main-modal-title">{title}</h2>
          <button className="main-modal-close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="main-modal-body">{children}</div>

        {footer && <div className="main-modal-footer">{footer}</div>}
      </animated.div>
    </animated.div>
  );
}
