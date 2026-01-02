'use client';

import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import Link from 'next/link';

interface RetroHomeContentProps {
  viewModel: HomeViewModel;
}

/**
 * RetroHomeContent - Windows 98 / IE5 style home page
 * Uses CSS classes for proper dark mode support
 */
export function RetroHomeContent({ viewModel }: RetroHomeContentProps) {
  const getAnnouncementClass = (type: string) => {
    switch (type) {
      case 'event':
        return 'retro-announcement retro-announcement-event';
      case 'update':
        return 'retro-announcement retro-announcement-update';
      default:
        return 'retro-announcement retro-announcement-news';
    }
  };

  return (
    <div className="retro-home-content">
      {/* Welcome Banner */}
      <div className="retro-welcome-banner">
        <div className="retro-welcome-title">
          ⚔️ Welcome to Infinite Battle! ⚔️
        </div>
        <div className="retro-welcome-subtitle">
          The Ultimate Card-Based Combat Experience
        </div>
        {viewModel.isAuthenticated && viewModel.userName && (
          <div className="retro-welcome-user">
            Welcome back, <strong>{viewModel.userName}</strong>! (Level {viewModel.userLevel})
          </div>
        )}
      </div>

      <div className="retro-home-columns">
        {/* Left Column */}
        <div className="retro-home-column-left">
          {/* Navigation */}
          <RetroGroupBox title="Quick Navigation">
            <div className="retro-nav-buttons">
              <Link href="/battle">
                <RetroButton className="retro-nav-btn">
                  ⚔️ Start Battle
                </RetroButton>
              </Link>
              <Link href="/roster">
                <RetroButton className="retro-nav-btn">
                  👤 Character Roster
                </RetroButton>
              </Link>
              <Link href="/match-history">
                <RetroButton className="retro-nav-btn">
                  📜 Match History
                </RetroButton>
              </Link>
              <Link href="/profile">
                <RetroButton className="retro-nav-btn">
                  📋 My Profile
                </RetroButton>
              </Link>
            </div>
          </RetroGroupBox>

          {/* Game Modes */}
          <RetroGroupBox title="Game Modes" className="mt-4">
            <table className="retro-table w-full">
              <thead>
                <tr>
                  <th>Mode</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link href="/battle/quick" className="retro-link">Quick Match</Link></td>
                  <td>Fast casual battles</td>
                </tr>
                <tr>
                  <td><Link href="/battle/ranked" className="retro-link">Ranked</Link></td>
                  <td>Competitive ranking</td>
                </tr>
                <tr>
                  <td><Link href="/battle/multiplayer" className="retro-link">Multiplayer</Link></td>
                  <td>Battle with friends</td>
                </tr>
                <tr>
                  <td><Link href="/battle/practice" className="retro-link">Practice</Link></td>
                  <td>Train your skills</td>
                </tr>
              </tbody>
            </table>
          </RetroGroupBox>
        </div>

        {/* Center Column */}
        <div className="retro-home-column-center">
          {/* Stats */}
          <RetroGroupBox title="Server Statistics">
            <table className="retro-table w-full">
              <tbody>
                <tr>
                  <td className="w-1/2">👥 Players Online:</td>
                  <td><strong>{viewModel.stats.onlinePlayers.toLocaleString()}</strong></td>
                </tr>
                <tr>
                  <td>⚔️ Active Battles:</td>
                  <td><strong>{viewModel.stats.activeBattles.toLocaleString()}</strong></td>
                </tr>
                <tr>
                  <td>🏆 Total Matches:</td>
                  <td><strong>{viewModel.stats.totalMatches.toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>
          </RetroGroupBox>

          {/* Announcements */}
          <RetroGroupBox title="📢 Announcements" className="mt-4">
            {viewModel.announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className={getAnnouncementClass(announcement.type)}
              >
                <div className="retro-announcement-title">
                  {announcement.type === 'event' ? '🎉' :
                   announcement.type === 'update' ? '🚀' : '📰'} {announcement.title}
                </div>
                <div>{announcement.description}</div>
                <div className="retro-announcement-date">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </RetroGroupBox>

          {/* Featured Characters */}
          <RetroGroupBox title="🌟 Featured Characters" className="mt-4">
            <table className="retro-table w-full">
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Element</th>
                  <th>Rarity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {viewModel.featuredCharacters.map((character) => (
                  <tr key={character.id}>
                    <td>
                      {character.element === 'light' ? '💫' : 
                       character.element === 'dark' ? '🌑' :
                       character.element === 'fire' ? '🔥' :
                       character.element === 'water' ? '💧' :
                       character.element === 'earth' ? '🌍' : '🌪️'} {character.displayName}
                    </td>
                    <td className="capitalize">{character.element}</td>
                    <td>
                      <span className={`retro-rarity-badge retro-rarity-${character.rarity}`}>
                        {character.rarity.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <Link href={`/roster/${character.id}`} className="retro-link">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RetroGroupBox>
        </div>

        {/* Right Column */}
        <div className="retro-home-column-right">
          {/* Links */}
          <RetroGroupBox title="Useful Links">
            <ul className="retro-link-list">
              <li><Link href="/about" className="retro-link">About the Game</Link></li>
              <li><Link href="/faq" className="retro-link">FAQ</Link></li>
              <li><Link href="/guide" className="retro-link">Beginner&apos;s Guide</Link></li>
              <li><Link href="/updates" className="retro-link">Update History</Link></li>
              <li><Link href="/community" className="retro-link">Community Forums</Link></li>
            </ul>
          </RetroGroupBox>

          {/* Counter */}
          <div className="retro-visitor-counter">
            <div className="retro-visitor-counter-label">Visitor Counter</div>
            <div className="retro-visitor-counter-value">
              {(12345 + viewModel.stats.totalMatches).toString().padStart(8, '0')}
            </div>
          </div>

          {/* Best viewed with */}
          <div className="retro-best-viewed">
            <div className="retro-best-viewed-label">Best Viewed With:</div>
            <div className="retro-badge">
              🌐 Internet Explorer 5.0+
            </div>
            <div className="retro-best-viewed-resolution">
              Resolution: 1024x768
            </div>
          </div>

          {/* Marquee */}
          <div className="retro-marquee-container">
            <marquee>⚔️ Welcome to Infinite Battle! ⚔️</marquee>
          </div>
        </div>
      </div>

      {/* Footer */}
      <hr className="retro-hr" />
      <div className="retro-footer-text text-center">
        © 2024 Infinite Battle. All rights reserved. | 
        <Link href="/privacy" className="retro-link ml-1">Privacy Policy</Link> | 
        <Link href="/terms" className="retro-link ml-1">Terms of Service</Link>
      </div>
    </div>
  );
}
