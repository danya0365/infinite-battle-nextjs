/**
 * OfflineIndicator
 * Shows when the user goes offline
 */

'use client';

import { usePWA } from '@/src/presentation/hooks/usePWA';
import { useEffect, useState } from 'react';

export function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" message briefly
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!showBanner) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        padding: '12px 16px',
        background: isOnline 
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        animation: 'slideDown 0.3s ease',
      }}
    >
      {isOnline ? (
        <>
          <span>✅</span>
          <span>You&apos;re back online!</span>
        </>
      ) : (
        <>
          <span>📡</span>
          <span>You&apos;re offline. Some features may be limited.</span>
        </>
      )}
      
      {!isOnline && (
        <button
          onClick={() => setShowBanner(false)}
          style={{
            marginLeft: '16px',
            padding: '4px 12px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Dismiss
        </button>
      )}

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
