/**
 * MainLeaderboardContent
 * Modern, premium leaderboard UI with glassmorphism and animations
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px',
        gap: '20px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffd700, #ff6b00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🏆 Leaderboard
            </h1>
            <p style={{ color: 'var(--main-text-secondary)', marginTop: '4px' }}>
              Compete with warriors from around the world
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          <StatCard icon="👥" label="Players" value={stats.totalPlayers.toString()} />
          <StatCard icon="⚔️" label="Matches" value={formatNumber(stats.totalMatches)} />
          <StatCard icon="📊" label="Avg Win Rate" value={`${stats.averageWinRate}%`} />
          <StatCard icon="🔥" label="Top Streak" value={stats.topWinStreak.toString()} />
        </div>

        {/* Type Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'var(--main-glass-bg)',
          padding: '8px',
          borderRadius: '16px',
        }}>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => changeType(type)}
              style={{
                flex: 1,
                padding: '12px',
                background: currentType === type
                  ? 'linear-gradient(135deg, #ffd700, #ff6b00)'
                  : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                color: currentType === type ? '#000' : 'var(--main-text)',
                fontWeight: currentType === type ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
              }}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>

        {/* Current Player Rank */}
        {currentPlayerRank && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <span style={{ fontSize: '24px' }}>📍</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--main-text-secondary)' }}>Your Rank</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                #{currentPlayerRank.rank} • {currentPlayerRank.displayName}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                padding: '4px 12px',
                background: getRankTierGradient(currentPlayerRank.rankTier),
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}>
                {currentPlayerRank.rankTier}
              </p>
              <p style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--main-text-secondary)' }}>
                {currentPlayerRank.rankPoints} RP
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div style={{
          flex: 1,
          background: 'var(--main-glass-bg)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 100px 100px 100px 100px',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            fontWeight: 'bold',
            color: 'var(--main-text-secondary)',
            fontSize: '0.875rem',
          }}>
            <span>Rank</span>
            <span>Player</span>
            <span style={{ textAlign: 'center' }}>Tier</span>
            <span style={{ textAlign: 'center' }}>Points</span>
            <span style={{ textAlign: 'center' }}>Win Rate</span>
            <span style={{ textAlign: 'center' }}>Streak</span>
          </div>

          {/* Table Body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {trail.map((style, index) => {
              const entry = entries[index];
              if (!entry) return null;

              return (
                <animated.div
                  key={entry.profileId}
                  style={{
                    ...style,
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 100px 100px 100px 100px',
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    alignItems: 'center',
                    background: entry.rank <= 3 
                      ? `linear-gradient(90deg, ${getRankTierColor(entry.rankTier)}10, transparent)`
                      : 'transparent',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = entry.rank <= 3 
                    ? `linear-gradient(90deg, ${getRankTierColor(entry.rankTier)}10, transparent)`
                    : 'transparent'}
                >
                  {/* Rank */}
                  <span style={{
                    fontSize: entry.rank <= 3 ? '1.5rem' : '1rem',
                    fontWeight: 'bold',
                  }}>
                    {getRankMedal(entry.rank)}
                  </span>

                  {/* Player */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{entry.avatar}</span>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{entry.displayName}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--main-text-secondary)' }}>
                        Lv. {entry.level} • {entry.wins}W / {entry.losses}L
                      </p>
                    </div>
                  </div>

                  {/* Tier */}
                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: getRankTierGradient(entry.rankTier),
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      color: entry.rankTier === 'Gold' || entry.rankTier === 'Legend' ? '#000' : '#fff',
                    }}>
                      {entry.rankTier}
                    </span>
                  </div>

                  {/* Points */}
                  <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffd700' }}>
                    {formatNumber(entry.rankPoints)}
                  </div>

                  {/* Win Rate */}
                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      color: entry.winRate >= 60 ? '#10b981' : entry.winRate >= 40 ? '#f59e0b' : '#ef4444',
                      fontWeight: 'bold',
                    }}>
                      {entry.winRate}%
                    </span>
                  </div>

                  {/* Streak */}
                  <div style={{ textAlign: 'center' }}>
                    {entry.winStreak > 0 && (
                      <span style={{ color: '#ff6b00' }}>
                        🔥 {entry.winStreak}
                      </span>
                    )}
                  </div>
                </animated.div>
              );
            })}

            {/* Remaining entries without animation */}
            {entries.slice(10).map((entry) => (
              <div
                key={entry.profileId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 100px 100px 100px 100px',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{getRankMedal(entry.rank)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{entry.avatar}</span>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{entry.displayName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--main-text-secondary)' }}>
                      Lv. {entry.level}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: getRankTierGradient(entry.rankTier),
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                  }}>
                    {entry.rankTier}
                  </span>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffd700' }}>
                  {formatNumber(entry.rankPoints)}
                </div>
                <div style={{ textAlign: 'center', color: entry.winRate >= 60 ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                  {entry.winRate}%
                </div>
                <div style={{ textAlign: 'center' }}>
                  {entry.winStreak > 0 && <span style={{ color: '#ff6b00' }}>🔥 {entry.winStreak}</span>}
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
    <div style={{
      background: 'var(--main-glass-bg)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <p style={{ fontWeight: 'bold', fontSize: '1.25rem', marginTop: '8px' }}>{value}</p>
      <p style={{ fontSize: '0.75rem', color: 'var(--main-text-secondary)' }}>{label}</p>
    </div>
  );
}
