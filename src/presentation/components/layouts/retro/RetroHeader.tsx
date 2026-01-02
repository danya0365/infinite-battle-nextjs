'use client';

import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * RetroHeader - IE5 Toolbar with navigation buttons and address bar
 */
export function RetroHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('http://infinite-battle.local/');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toolbarButtons = [
    { icon: '←', label: 'Back', action: () => window.history.back() },
    { icon: '→', label: 'Forward', action: () => window.history.forward() },
    { icon: '⊗', label: 'Stop', action: () => {} },
    { icon: '↻', label: 'Refresh', action: () => window.location.reload() },
    { icon: '🏠', label: 'Home', action: () => (window.location.href = '/') },
  ];

  const navButtons = [
    { icon: '🔍', label: 'Search', href: '/search' },
    { icon: '⭐', label: 'Favorites', href: '/favorites' },
    { icon: '📜', label: 'History', href: '/match-history' },
    { icon: '📧', label: 'Mail', href: '/messages' },
    { icon: '🖨️', label: 'Print', href: '#' },
  ];

  return (
    <>
      {/* Main Toolbar */}
      <div className="retro-toolbar">
        {/* Navigation Buttons */}
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            className="retro-toolbar-btn"
            onClick={btn.action}
            title={btn.label}
          >
            <span className="retro-toolbar-btn-icon text-lg">{btn.icon}</span>
            <span className="retro-toolbar-btn-text">{btn.label}</span>
          </button>
        ))}

        <div className="retro-toolbar-separator" />

        {/* Feature Buttons */}
        {navButtons.map((btn, index) => (
          <Link key={index} href={btn.href}>
            <button className="retro-toolbar-btn" title={btn.label}>
              <span className="retro-toolbar-btn-icon text-lg">{btn.icon}</span>
              <span className="retro-toolbar-btn-text">{btn.label}</span>
            </button>
          </Link>
        ))}

        <div className="retro-toolbar-separator" />

        {/* Layout Toggle */}
        <button
          className="retro-toolbar-btn"
          onClick={toggleLayout}
          title="Switch to Modern Layout"
        >
          <span className="retro-toolbar-btn-icon text-lg">🎨</span>
          <span className="retro-toolbar-btn-text">Modern</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="retro-toolbar-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Toggle Theme'}
        >
          <span className="retro-toolbar-btn-icon text-lg">
            {mounted && theme === 'dark' ? '☀️' : '🌙'}
          </span>
          <span className="retro-toolbar-btn-text">Theme</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="retro-addressbar">
        <span className="retro-addressbar-label">Address</span>
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // Handle URL navigation
              const path = currentUrl.replace('http://infinite-battle.local', '');
              window.location.href = path || '/';
            }
          }}
          className="retro-addressbar-input"
        />
        <button className="retro-btn" style={{ marginLeft: '4px' }}>
          Go
        </button>
        <button className="retro-toolbar-btn" style={{ marginLeft: '4px' }}>
          <span className="text-lg">🔗</span>
          <span className="retro-toolbar-btn-text">Links</span>
        </button>
      </div>

      {/* Links Bar */}
      <div className="retro-toolbar" style={{ borderBottom: '2px solid #808080' }}>
        <span style={{ fontSize: '11px', marginRight: '8px' }}>Links:</span>
        <Link href="/" className="retro-link" style={{ marginRight: '12px' }}>
          Home
        </Link>
        <Link href="/battle" className="retro-link" style={{ marginRight: '12px' }}>
          Battle Arena
        </Link>
        <Link href="/roster" className="retro-link" style={{ marginRight: '12px' }}>
          Character Roster
        </Link>
        <Link href="/profile" className="retro-link" style={{ marginRight: '12px' }}>
          Profile
        </Link>
        <Link href="/match-history" className="retro-link">
          Match History
        </Link>
      </div>
    </>
  );
}
