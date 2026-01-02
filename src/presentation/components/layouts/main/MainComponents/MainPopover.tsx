'use client';

import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef } from 'react';

interface MainPopoverProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

/**
 * MainPopover - Animated dropdown menu with glassmorphism
 */
export function MainPopover({ children, onClose, className = '' }: MainPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const spring = useSpring({
    from: { opacity: 0, transform: 'translateY(-8px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

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
    <animated.div
      ref={popoverRef}
      style={spring}
      className={`main-popover ${className}`}
    >
      {children}
    </animated.div>
  );
}
