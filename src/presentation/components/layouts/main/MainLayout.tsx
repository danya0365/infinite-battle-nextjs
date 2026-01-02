'use client';

import { MainFooter } from './MainFooter';
import { MainHeader } from './MainHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout - Modern premium design with glassmorphism
 * Full screen, no scroll layout
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout main-container">
      <MainHeader />
      <main className="main-content">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
