/**
 * RetroLeaderboardContent
 * Windows 98 / IE5 style leaderboard
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
    <div className="retro-content-inner" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '8px',
      gap: '8px',
    }}>
      {/* Title Bar */}
      <div style={{
        background: 'var(--retro-title-bar)',
        color: 'white',
        padding: '4px 8px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>🏆 Infinite Battle - Leaderboard</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <RetroButton onClick={refreshLeaderboard}>🔄 Refresh</RetroButton>
          <Link href="/">
            <RetroButton>← Back</RetroButton>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '4px',
        background: '#c0c0c0',
        border: '2px inset #808080',
      }}>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px' }}>
          <strong>👥 Players:</strong> {stats.totalPlayers}
        </div>
        <div style={{ borderLeft: '1px solid #808080', height: '20px' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px' }}>
          <strong>⚔️ Matches:</strong> {formatNumber(stats.totalMatches)}
        </div>
        <div style={{ borderLeft: '1px solid #808080', height: '20px' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px' }}>
          <strong>📊 Avg Win:</strong> {stats.averageWinRate}%
        </div>
        <div style={{ borderLeft: '1px solid #808080', height: '20px' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px' }}>
          <strong>🔥 Top Streak:</strong> {stats.topWinStreak}
        </div>
      </div>

      {/* Type Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #808080' }}>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => changeType(type)}
            style={{
              padding: '6px 16px',
              background: currentType === type ? '#d4d0c8' : '#c0c0c0',
              border: '2px outset #d4d0c8',
              borderBottom: currentType === type ? 'none' : '2px outset #d4d0c8',
              cursor: 'pointer',
              marginBottom: currentType === type ? '-1px' : '0',
              fontWeight: currentType === type ? 'bold' : 'normal',
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              fontSize: '11px',
            }}
          >
            {getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Current Player Rank */}
      {currentPlayerRank && (
        <RetroGroupBox label="📍 Your Position">
          <div style={{
            padding: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>
              <strong>#{currentPlayerRank.rank}</strong> - {currentPlayerRank.displayName}
            </span>
            <span style={{
              padding: '2px 8px',
              background: getRankTierColor(currentPlayerRank.rankTier),
              color: 'white',
              fontWeight: 'bold',
            }}>
              {currentPlayerRank.rankTier} ({currentPlayerRank.rankPoints} RP)
            </span>
          </div>
        </RetroGroupBox>
      )}

      {/* Leaderboard Table */}
      <div style={{
        flex: 1,
        border: '2px inset #808080',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 80px 80px 80px 60px',
          background: '#000080',
          color: 'white',
          padding: '4px 8px',
          fontWeight: 'bold',
          fontSize: '11px',
        }}>
          <span>Rank</span>
          <span>Player</span>
          <span style={{ textAlign: 'center' }}>Tier</span>
          <span style={{ textAlign: 'center' }}>Points</span>
          <span style={{ textAlign: 'center' }}>Win%</span>
          <span style={{ textAlign: 'center' }}>Streak</span>
        </div>

        {/* Table Body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {entries.map((entry, index) => (
            <div
              key={entry.profileId}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 80px 80px 80px 60px',
                padding: '4px 8px',
                background: index % 2 === 0 ? 'white' : '#f0f0f0',
                borderBottom: '1px solid #c0c0c0',
                alignItems: 'center',
                fontSize: '11px',
              }}
            >
              {/* Rank */}
              <span style={{
                fontWeight: entry.rank <= 3 ? 'bold' : 'normal',
                color: entry.rank === 1 ? '#ffd700' :
                       entry.rank === 2 ? '#c0c0c0' :
                       entry.rank === 3 ? '#cd7f32' : 'inherit',
              }}>
                {getRankMedal(entry.rank)}
              </span>

              {/* Player */}
              <span>
                {entry.avatar} <strong>{entry.displayName}</strong>
                <span style={{ color: '#666', marginLeft: '8px' }}>Lv.{entry.level}</span>
              </span>

              {/* Tier */}
              <span style={{
                textAlign: 'center',
                padding: '2px 4px',
                background: getRankTierColor(entry.rankTier),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '10px',
              }}>
                {entry.rankTier}
              </span>

              {/* Points */}
              <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {formatNumber(entry.rankPoints)}
              </span>

              {/* Win Rate */}
              <span style={{
                textAlign: 'center',
                color: entry.winRate >= 60 ? '#008000' : entry.winRate >= 40 ? '#808000' : '#800000',
                fontWeight: 'bold',
              }}>
                {entry.winRate}%
              </span>

              {/* Streak */}
              <span style={{ textAlign: 'center', color: '#ff6600' }}>
                {entry.winStreak > 0 ? `🔥${entry.winStreak}` : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: '#c0c0c0',
        border: '2px inset #808080',
        padding: '2px 4px',
        fontSize: '11px',
      }}>
        <span style={{ flex: 2 }}>Showing {entries.length} players</span>
        <span style={{ flex: 1, borderLeft: '1px solid #808080', paddingLeft: '4px' }}>
          Type: {getTypeLabel(currentType)}
        </span>
        <span style={{ flex: 1, borderLeft: '1px solid #808080', paddingLeft: '4px' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
