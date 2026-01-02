'use client';

import { useEffect, useState } from 'react';

/**
 * RetroFooter - IE5 Status Bar
 */
export function RetroFooter() {
  const [status, setStatus] = useState('Done');
  const [zone, setZone] = useState('Internet');

  useEffect(() => {
    // Simulate loading status
    const timer = setTimeout(() => {
      setStatus('Done');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="retro-statusbar">
      {/* Main Status */}
      <div className="retro-statusbar-section">
        <span>{status}</span>
      </div>

      {/* Zone */}
      <div className="retro-statusbar-section" style={{ width: '100px' }}>
        <span className="mr-1">🌐</span>
        <span>{zone}</span>
      </div>

      {/* SSL Indicator */}
      <div className="retro-statusbar-section" style={{ width: '80px' }}>
        <span className="mr-1">🔒</span>
        <span>SSL</span>
      </div>
    </div>
  );
}
