'use client';

import { RetroFooter } from './RetroFooter';
import { RetroHeader } from './RetroHeader';

interface RetroLayoutProps {
  children: React.ReactNode;
}

/**
 * RetroLayout - Internet Explorer 5 / Windows 98 style layout
 * Full screen browser emulation
 */
export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <div className="retro-layout retro-container">
      {/* IE5 Title Bar */}
      <div className="retro-titlebar">
        <div className="retro-titlebar-text">
          <img 
            src="/icons/ie-icon.png" 
            alt="IE" 
            className="retro-titlebar-icon"
            onError={(e) => {
              // Fallback to emoji if icon not found
              e.currentTarget.style.display = 'none';
            }}
          />
          <span>Infinite Battle - Microsoft Internet Explorer</span>
        </div>
        <div className="retro-titlebar-buttons">
          <button className="retro-titlebar-btn">_</button>
          <button className="retro-titlebar-btn">□</button>
          <button className="retro-titlebar-btn">×</button>
        </div>
      </div>

      {/* IE5 Menu Bar */}
      <div className="retro-menubar">
        <span className="retro-menu-item">File</span>
        <span className="retro-menu-item">Edit</span>
        <span className="retro-menu-item">View</span>
        <span className="retro-menu-item">Favorites</span>
        <span className="retro-menu-item">Tools</span>
        <span className="retro-menu-item">Help</span>
      </div>

      <RetroHeader />

      {/* Content Area */}
      <main className="retro-content">
        <div className="retro-content-inner">
          {children}
        </div>
      </main>

      <RetroFooter />
    </div>
  );
}
