'use client';

import Link from 'next/link';

/**
 * MainFooter - Modern footer with copyright and links
 */
export function MainFooter() {
  return (
    <footer className="main-footer">
      <div className="flex items-center gap-4">
        <span>© 2024 Infinite Battle</span>
        <span className="text-white/30">|</span>
        <Link href="/about" className="hover:text-white/80 transition-colors">
          About
        </Link>
        <Link href="/privacy" className="hover:text-white/80 transition-colors">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-white/80 transition-colors">
          Terms
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-green-400">●</span>
        <span>Online</span>
      </div>
    </footer>
  );
}
