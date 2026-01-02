/**
 * PWAInstallButton
 * Button component that prompts users to install the PWA
 * Only shows when the app is installable
 */

'use client';

import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MainModal } from '@/src/presentation/components/layouts/main/MainComponents/MainModal';
import { usePWA } from '@/src/presentation/hooks/usePWA';
import { useState } from 'react';

interface PWAInstallButtonProps {
  variant?: 'button' | 'banner' | 'modal';
  className?: string;
}

export function PWAInstallButton({ variant = 'button', className }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, promptInstall } = usePWA();
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if already installed or dismissed
  if (isInstalled || dismissed || !isInstallable) {
    return null;
  }

  if (variant === 'button') {
    return (
      <MainButton
        variant="primary"
        onClick={promptInstall}
        className={className}
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
        }}
      >
        📲 Install App
      </MainButton>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          right: '16px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>📲</span>
          <div>
            <h4 style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>
              Install Infinite Battle
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', margin: 0 }}>
              Play faster with our mobile app
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setDismissed(true)}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Not now
          </button>
          <button
            onClick={promptInstall}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: 'none',
              borderRadius: '8px',
              color: '#059669',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Install
          </button>
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '16px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          zIndex: 1000,
          animation: 'bounce 2s infinite',
        }}
        title="Install App"
      >
        📲
      </button>

      <MainModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="📲 Install Infinite Battle"
      >
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
            }}
          >
            ⚔️
          </div>
          
          <h2 style={{ marginBottom: '16px' }}>Get the Full Experience!</h2>
          
          <ul style={{ textAlign: 'left', marginBottom: '24px', color: 'var(--main-text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>✅ Works offline</li>
            <li style={{ marginBottom: '8px' }}>✅ Faster loading</li>
            <li style={{ marginBottom: '8px' }}>✅ Home screen access</li>
            <li style={{ marginBottom: '8px' }}>✅ Full-screen experience</li>
            <li>✅ Push notifications</li>
          </ul>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <MainButton
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setDismissed(true);
              }}
            >
              Maybe Later
            </MainButton>
            <MainButton
              variant="primary"
              onClick={() => {
                promptInstall();
                setShowModal(false);
              }}
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              Install Now
            </MainButton>
          </div>
        </div>
      </MainModal>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}
