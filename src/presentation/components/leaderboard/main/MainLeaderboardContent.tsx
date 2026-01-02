/**
 * MainLeaderboardContent
 * Modern, premium leaderboard UI with glassmorphism and animations
 * Uses CSS classes for proper dark/light mode support
 */

'use client';

import { LeaderboardEntry, LeaderboardStats, LeaderboardType } from '@/src/application/repositories/ILeaderboardRepository';
import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { LeaderboardPresenter } from '@/src/presentation/presenters/leaderboard/LeaderboardPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

interface MainLeaderboardContentProps {
  entries: LeaderboardEntry[];
  stats: LeaderboardStats;
  currentType: LeaderboardType;
  currentPlayerRank: LeaderboardEntry | null;
  presenter: LeaderboardPresenter;
  changeType: (type: LeaderboardType) => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  getRankMedal: (rank: number) => string;
  getRankTierColor: (tier: string) => string;
  getRankTierGradient: (tier: string) => string;
  formatNumber: (num: number) => string;
  getTypeLabel: (type: LeaderboardType) => string;
}

export default function MainLeaderboardContent({
  entries,
  stats,
  currentType,
  currentPlayerRank,
  changeType,
  refreshLeaderboard,
  getRankMedal,
  getRankTierColor,
  getRankTierGradient,
  formatNumber,
  getTypeLabel,
}: MainLeaderboardContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshLeaderboard();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  const trail = useTrail(Math.min(entries.length, 10), {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 280, friction: 24 },
  });

  const types: LeaderboardType[] = ['ranked', 'casual', 'weekly', 'allTime'];

  return (
    <animated.div style={fadeIn} className="main-content">
      <div className="main-page-container">
        {/* Header */}
        <div className="main-page-header">
          <div>
            <h1 className="main-page-title gold">🏆 Leaderboard</h1>
            <p className="main-page-subtitle">Compete with warriors from around the world</p>
          </div>
          <div className="main-button-group">
            <MainButton
              variant="ghost"
              onClick={handleRefresh}
              style={{ transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)', transition: 'transform 0.5s' }}
            >
              🔄 Refresh
            </MainButton>
            <Link href="/">
              <MainButton variant="ghost">← Back</MainButton>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon="👥" label="Players" value={stats.totalPlayers.toString()} />
          <StatCard icon="⚔️" label="Matches" value={formatNumber(stats.totalMatches)} />
          <StatCard icon="📊" label="Avg Win Rate" value={`${stats.averageWinRate}%`} />
          <StatCard icon="🔥" label="Top Streak" value={stats.topWinStreak.toString()} />
        </div>

        {/* Type Tabs */}
        <div className="main-tabs">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => changeType(type)}
              className={`main-tab ${currentType === type ? 'active gold' : ''}`}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>

        {/* Current Player Rank */}
        {currentPlayerRank && (
          <div className="main-highlight-card">
            <span className="text-2xl">📍</span>
            <div className="flex-1">
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Your Rank</p>
              <p className="font-bold text-xl">
                #{currentPlayerRank.rank} • {currentPlayerRank.displayName}
              </p>
            </div>
            <div className="text-right">
              <span 
                className="px-3 py-1 rounded-full font-bold text-sm"
                style={{ background: getRankTierGradient(currentPlayerRank.rankTier) }}
              >
                {currentPlayerRank.rankTier}
              </span>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                {currentPlayerRank.rankPoints} RP
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="main-table">
          {/* Table Header */}
          <div 
            className="main-table-header grid"
            style={{ gridTemplateColumns: '80px 1fr 100px 100px 100px 100px' }}
          >
            <span>Rank</span>
            <span>Player</span>
            <span className="text-center">Tier</span>
            <span className="text-center">Points</span>
            <span className="text-center">Win Rate</span>
            <span className="text-center">Streak</span>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {trail.map((style, index) => {
              const entry = entries[index];
              if (!entry) return null;

              return (
                <animated.div
                  key={entry.profileId}
                  style={style}
                  className="main-table-row grid"
                  data-rank={entry.rank}
                >
                  <div style={{ gridTemplateColumns: '80px 1fr 100px 100px 100px 100px', display: 'grid', alignItems: 'center' }}>
                    {/* Rank */}
                    <span className={`font-bold ${entry.rank <= 3 ? 'text-2xl' : 'text-base'}`}>
                      {getRankMedal(entry.rank)}
                    </span>

                    {/* Player */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.avatar}</span>
                      <div>
                        <p className="font-bold">{entry.displayName}</p>
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                          Lv. {entry.level} • {entry.wins}W / {entry.losses}L
                        </p>
                      </div>
                    </div>

                    {/* Tier */}
                    <div className="text-center">
                      <span 
                        className="px-3 py-1 rounded-full font-bold text-xs"
                        style={{ 
                          background: getRankTierGradient(entry.rankTier),
                          color: entry.rankTier === 'Gold' || entry.rankTier === 'Legend' ? '#000' : '#fff',
                        }}
                      >
                        {entry.rankTier}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="text-center font-bold" style={{ color: '#ffd700' }}>
                      {formatNumber(entry.rankPoints)}
                    </div>

                    {/* Win Rate */}
                    <div className="text-center">
                      <span 
                        className="font-bold"
                        style={{ color: entry.winRate >= 60 ? 'var(--color-success)' : entry.winRate >= 40 ? 'var(--color-warning)' : 'var(--color-error)' }}
                      >
                        {entry.winRate}%
                      </span>
                    </div>

                    {/* Streak */}
                    <div className="text-center">
                      {entry.winStreak > 0 && (
                        <span style={{ color: '#ff6b00' }}>🔥 {entry.winStreak}</span>
                      )}
                    </div>
                  </div>
                </animated.div>
              );
            })}

            {/* Remaining entries without animation */}
            {entries.slice(10).map((entry) => (
              <div
                key={entry.profileId}
                className="main-table-row"
              >
                <div style={{ gridTemplateColumns: '80px 1fr 100px 100px 100px 100px', display: 'grid', alignItems: 'center' }}>
                  <span className="font-bold">{getRankMedal(entry.rank)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{entry.avatar}</span>
                    <div>
                      <p className="font-bold">{entry.displayName}</p>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Lv. {entry.level}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span 
                      className="px-3 py-1 rounded-full font-bold text-xs"
                      style={{ background: getRankTierGradient(entry.rankTier) }}
                    >
                      {entry.rankTier}
                    </span>
                  </div>
                  <div className="text-center font-bold" style={{ color: '#ffd700' }}>
                    {formatNumber(entry.rankPoints)}
                  </div>
                  <div className="text-center font-bold" style={{ color: entry.winRate >= 60 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {entry.winRate}%
                  </div>
                  <div className="text-center">
                    {entry.winStreak > 0 && <span style={{ color: '#ff6b00' }}>🔥 {entry.winStreak}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="main-stat-card">
      <span className="main-stat-card-icon">{icon}</span>
      <p className="main-stat-card-value">{value}</p>
      <p className="main-stat-card-label">{label}</p>
    </div>
  );
}
