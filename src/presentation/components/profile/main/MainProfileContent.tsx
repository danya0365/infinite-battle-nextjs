'use client';

import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { ProfileViewModel } from '@/src/presentation/presenters/profile/ProfilePresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MainProfileContentProps {
  viewModel: ProfileViewModel;
  onSwitchProfile: (profileId: string) => Promise<void>;
}

/**
 * MainProfileContent - Modern premium profile page design
 */
export function MainProfileContent({ viewModel, onSwitchProfile }: MainProfileContentProps) {
  const [mounted, setMounted] = useState(false);
  const { currentProfile, user, stats, recentMatches, profiles } = viewModel;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Header animation
  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(-20px)' },
    config: { tension: 200, friction: 20 },
  });

  // Stats animation
  const statsTrail = useTrail(4, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  if (!currentProfile || !user) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center main-card p-8">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-white mb-2">No Profile Found</h2>
          <p className="text-white/60 mb-6">Please create a profile to continue.</p>
          <MainButton variant="primary">Create Profile</MainButton>
        </div>
      </div>
    );
  }

  const statsData = [
    { label: 'Total Matches', value: stats.totalMatches.toString(), icon: '🎮', color: 'from-blue-400 to-indigo-500' },
    { label: 'Win Rate', value: `${stats.winRate}%`, icon: '📈', color: 'from-green-400 to-emerald-500' },
    { label: 'Avg Damage', value: stats.avgDamageDealt.toLocaleString(), icon: '💥', color: 'from-red-400 to-orange-500' },
    { label: 'Best Combo', value: stats.highestCombo.toString(), icon: '🔥', color: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      {/* Profile Header */}
      <animated.div style={headerSpring} className="mb-8">
        <div className="main-card">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-2xl">
              <span className="text-5xl md:text-6xl">
                {currentProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {currentProfile.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                  Level {currentProfile.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium capitalize">
                  {currentProfile.rank}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                  {currentProfile.rankPoints} RP
                </span>
              </div>
              <div className="flex justify-center md:justify-start gap-2">
                <MainButton variant="primary" size="sm">
                  ✏️ Edit Profile
                </MainButton>
                <MainButton variant="secondary" size="sm">
                  ⚙️ Settings
                </MainButton>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-green-400">
                {stats.wins}W - {stats.losses}L
              </div>
              <div className="text-white/60 text-sm">
                Win Rate: {stats.winRate}%
              </div>
            </div>
          </div>
        </div>
      </animated.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <animated.div
            key={stat.label}
            style={statsTrail[index]}
            className="main-card main-hover-lift"
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-white/60 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </animated.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Matches */}
        <div className="lg:col-span-2">
          <div className="main-card">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📜</span>
              <span>Recent Matches</span>
            </h2>
            {recentMatches.length > 0 ? (
              <div className="space-y-3">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 rounded-xl border ${
                      match.result === 'win'
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {match.result === 'win' ? '🏆' : '💔'}
                        </span>
                        <div>
                          <p className="text-white font-medium">
                            vs {match.opponentName}
                          </p>
                          <p className="text-white/60 text-sm capitalize">
                            {match.type} • {match.stage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {match.result.toUpperCase()}
                        </p>
                        <p className="text-white/60 text-sm">
                          {new Date(match.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/60">
                <p>No matches yet. Start battling!</p>
              </div>
            )}
            <div className="mt-4 text-center">
              <Link href="/match-history">
                <MainButton variant="ghost">
                  View All Matches →
                </MainButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="main-card mb-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🔗</span>
              <span>Quick Links</span>
            </h2>
            <div className="space-y-2">
              <Link href="/battle">
                <MainButton variant="ghost" className="w-full justify-start">
                  ⚔️ Start Battle
                </MainButton>
              </Link>
              <Link href="/roster">
                <MainButton variant="ghost" className="w-full justify-start">
                  👥 Character Roster
                </MainButton>
              </Link>
              <Link href="/match-history">
                <MainButton variant="ghost" className="w-full justify-start">
                  📊 Full Statistics
                </MainButton>
              </Link>
            </div>
          </div>

          {/* Profile Switcher */}
          {profiles.length > 1 && (
            <div className="main-card">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔄</span>
                <span>Switch Profile</span>
              </h2>
              <div className="space-y-2">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => onSwitchProfile(profile.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      profile.id === currentProfile.id
                        ? 'bg-indigo-500/30 border border-indigo-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <p className="text-white font-medium">{profile.name}</p>
                    <p className="text-white/60 text-sm">Level {profile.level}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
