/**
 * RetroLeaderboardContent
 * Windows 98 / IE5 style leaderboard
 * Uses CSS classes for proper dark/light mode support
 */

'use client';

import { LeaderboardEntry, LeaderboardStats, LeaderboardType } from '@/src/application/repositories/ILeaderboardRepository';
import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { LeaderboardPresenter } from '@/src/presentation/presenters/leaderboard/LeaderboardPresenter';
import Link from 'next/link';

interface RetroLeaderboardContentProps {
  entries: LeaderboardEntry[];
  stats: LeaderboardStats;
  currentType: LeaderboardType;
  currentPlayerRank: LeaderboardEntry | null;
  presenter: LeaderboardPresenter;
  changeType: (type: LeaderboardType) => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  getRankMedal: (rank: number) => string;
  getRankTierColor: (tier: string) => string;
  formatNumber: (num: number) => string;
  getTypeLabel: (type: LeaderboardType) => string;
}

export default function RetroLeaderboardContent({
  entries,
  stats,
  currentType,
  currentPlayerRank,
  changeType,
  refreshLeaderboard,
  getRankMedal,
  getRankTierColor,
  formatNumber,
  getTypeLabel,
}: RetroLeaderboardContentProps) {
  const types: LeaderboardType[] = ['ranked', 'casual', 'weekly', 'allTime'];

  return (
    <div className="retro-content-inner retro-page-container">
      {/* Title Bar */}
      <div className="retro-page-titlebar">
        <span>🏆 Infinite Battle - Leaderboard</span>
        <div className="flex gap-1">
          <RetroButton onClick={refreshLeaderboard}>🔄 Refresh</RetroButton>
          <Link href="/">
            <RetroButton>← Back</RetroButton>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="retro-stats-bar">
        <div className="retro-stats-bar-item">
          <strong>👥 Players:</strong> {stats.totalPlayers}
        </div>
        <div className="retro-stats-bar-divider" />
        <div className="retro-stats-bar-item">
          <strong>⚔️ Matches:</strong> {formatNumber(stats.totalMatches)}
        </div>
        <div className="retro-stats-bar-divider" />
        <div className="retro-stats-bar-item">
          <strong>📊 Avg Win:</strong> {stats.averageWinRate}%
        </div>
        <div className="retro-stats-bar-divider" />
        <div className="retro-stats-bar-item">
          <strong>🔥 Top Streak:</strong> {stats.topWinStreak}
        </div>
      </div>

      {/* Type Tabs */}
      <div className="retro-tabs">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => changeType(type)}
            className={`retro-tab ${currentType === type ? 'active' : ''}`}
          >
            {getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Current Player Rank */}
      {currentPlayerRank && (
        <RetroGroupBox label="📍 Your Position">
          <div className="flex justify-between items-center p-2">
            <span>
              <strong>#{currentPlayerRank.rank}</strong> - {currentPlayerRank.displayName}
            </span>
            <span 
              className="px-2 py-0.5 font-bold text-white"
              style={{ background: getRankTierColor(currentPlayerRank.rankTier) }}
            >
              {currentPlayerRank.rankTier} ({currentPlayerRank.rankPoints} RP)
            </span>
          </div>
        </RetroGroupBox>
      )}

      {/* Leaderboard Table */}
      <div className="retro-page-table">
        {/* Table Header */}
        <div 
          className="retro-page-table-header grid"
          style={{ gridTemplateColumns: '60px 1fr 80px 80px 80px 60px' }}
        >
          <span>Rank</span>
          <span>Player</span>
          <span className="text-center">Tier</span>
          <span className="text-center">Points</span>
          <span className="text-center">Win%</span>
          <span className="text-center">Streak</span>
        </div>

        {/* Table Body */}
        <div className="retro-page-table-body">
          {entries.map((entry) => (
            <div
              key={entry.profileId}
              className="retro-page-table-row grid"
              style={{ gridTemplateColumns: '60px 1fr 80px 80px 80px 60px' }}
            >
              {/* Rank */}
              <span 
                className={entry.rank <= 3 ? 'font-bold' : ''}
                style={{ 
                  color: entry.rank === 1 ? '#ffd700' :
                         entry.rank === 2 ? '#c0c0c0' :
                         entry.rank === 3 ? '#cd7f32' : 'inherit' 
                }}
              >
                {getRankMedal(entry.rank)}
              </span>

              {/* Player */}
              <span>
                {entry.avatar} <strong>{entry.displayName}</strong>
                <span style={{ color: 'var(--retro-text-disabled)', marginLeft: '8px' }}>
                  Lv.{entry.level}
                </span>
              </span>

              {/* Tier */}
              <span 
                className="text-center px-1 py-0.5 font-bold text-white"
                style={{ 
                  background: getRankTierColor(entry.rankTier),
                  fontSize: '10px',
                }}
              >
                {entry.rankTier}
              </span>

              {/* Points */}
              <span className="text-center font-bold">
                {formatNumber(entry.rankPoints)}
              </span>

              {/* Win Rate */}
              <span 
                className="text-center font-bold"
                style={{ color: entry.winRate >= 60 ? '#008000' : entry.winRate >= 40 ? '#808000' : '#800000' }}
              >
                {entry.winRate}%
              </span>

              {/* Streak */}
              <span className="text-center" style={{ color: '#ff6600' }}>
                {entry.winStreak > 0 ? `🔥${entry.winStreak}` : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-page-statusbar">
        <span className="retro-page-statusbar-item">
          Showing {entries.length} players
        </span>
        <span className="retro-page-statusbar-item">
          Type: {getTypeLabel(currentType)}
        </span>
        <span className="retro-page-statusbar-item">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
