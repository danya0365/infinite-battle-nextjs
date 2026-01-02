'use client';

import { useAuthStore } from '@/src/presentation/stores/authStore';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MainButton } from './MainComponents/MainButton';
import { MainPopover } from './MainComponents/MainPopover';

/**
 * MainHeader - Modern header with navigation, theme toggle, and layout switcher
 */
export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const { profile, isAuthenticated } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/battle', label: 'Battle' },
    { href: '/roster', label: 'Roster' },
    { href: '/match-history', label: 'History' },
  ];

  return (
    <header className="main-header">
      {/* Logo */}
      <Link href="/" className="main-header-logo">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <span className="text-white font-bold text-lg">⚔</span>
        </div>
        <span className="main-header-logo-text">Infinite Battle</span>
      </Link>

      {/* Navigation */}
      <nav className="main-header-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="main-header-nav-link"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="main-header-actions">
        {/* Layout Toggle */}
        <MainButton
          variant="ghost"
          size="icon"
          onClick={toggleLayout}
          title="Switch to Retro Layout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </MainButton>

        {/* Theme Toggle */}
        <MainButton
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={mounted ? (theme === 'dark' ? 'Switch to Light' : 'Switch to Dark') : 'Toggle theme'}
        >
          {mounted && theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </MainButton>

        {/* User Menu */}
        {isAuthenticated && profile ? (
          <div className="relative">
            <MainButton
              variant="ghost"
              size="icon"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </MainButton>

            {showUserMenu && (
              <MainPopover
                onClose={() => setShowUserMenu(false)}
                className="right-0 top-12"
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-white font-medium">{profile.name}</p>
                  <p className="text-white/60 text-xs">Level {profile.level}</p>
                </div>
                <Link
                  href="/profile"
                  className="main-popover-item block"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="main-popover-item block"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <button className="main-popover-item w-full text-left text-red-300 hover:text-red-200">
                  Logout
                </button>
              </MainPopover>
            )}
          </div>
        ) : (
          <MainButton variant="primary" size="sm">
            Login
          </MainButton>
        )}
      </div>
    </header>
  );
}
