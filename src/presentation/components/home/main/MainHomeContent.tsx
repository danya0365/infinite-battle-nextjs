'use client';

import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MainHomeContentProps {
  viewModel: HomeViewModel;
}

/**
 * MainHomeContent - Modern premium home page design
 */
export function MainHomeContent({ viewModel }: MainHomeContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hero section animation
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' },
    config: { tension: 200, friction: 20 },
  });

  // Stats animation
  const statsTrail = useTrail(3, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  // Featured characters animation
  const charactersTrail = useTrail(viewModel.featuredCharacters.length, {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'translateX(0)' : 'translateX(-20px)' },
    delay: 400,
    config: { tension: 200, friction: 20 },
  });

  const stats = [
    { label: 'Players Online', value: viewModel.stats.onlinePlayers.toLocaleString(), icon: '👥', color: 'from-green-400 to-emerald-500' },
    { label: 'Active Battles', value: viewModel.stats.activeBattles.toLocaleString(), icon: '⚔️', color: 'from-red-400 to-orange-500' },
    { label: 'Total Matches', value: viewModel.stats.totalMatches.toLocaleString(), icon: '🏆', color: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      {/* Hero Section */}
      <animated.div style={heroSpring} className="text-center mb-8 md:mb-12">
        <div className="main-animate-float inline-block mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl main-animate-glow">
            <span className="text-5xl md:text-6xl">⚔️</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold main-gradient-text mb-4">
          Infinite Battle
        </h1>
        <p className="text-white/70 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Experience epic card-based combat with stunning visuals and real-time multiplayer battles.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/battle">
            <MainButton variant="primary" size="lg">
              <span className="mr-2">⚡</span>
              Start Battle
            </MainButton>
          </Link>
          <Link href="/roster">
            <MainButton variant="secondary" size="lg">
              <span className="mr-2">👤</span>
              View Roster
            </MainButton>
          </Link>
        </div>
      </animated.div>

      {/* Welcome Message */}
      {viewModel.isAuthenticated && viewModel.userName && (
        <div className="main-card mb-8 text-center">
          <p className="text-white/80">
            Welcome back, <span className="text-indigo-400 font-bold">{viewModel.userName}</span>!
            <span className="ml-2 text-yellow-400">Level {viewModel.userLevel}</span>
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <animated.div
            key={stat.label}
            style={statsTrail[index]}
            className="main-card main-hover-lift"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </animated.div>
        ))}
      </div>

      {/* Featured Characters */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🌟</span>
          <span>Featured Characters</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewModel.featuredCharacters.map((character, index) => (
            <animated.div
              key={character.id}
              style={charactersTrail[index]}
            >
              <Link href={`/roster/${character.id}`}>
                <div 
                  className="main-card main-hover-scale cursor-pointer overflow-hidden"
                  style={{
                    borderTop: `3px solid ${character.color}`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${character.color}40, ${character.color}20)`,
                      }}
                    >
                      {character.element === 'light' ? '💫' : 
                       character.element === 'dark' ? '🌑' :
                       character.element === 'fire' ? '🔥' :
                       character.element === 'water' ? '💧' :
                       character.element === 'earth' ? '🌍' : '🌪️'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{character.displayName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ 
                            background: character.rarity === 'legendary' ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                                       character.rarity === 'epic' ? 'linear-gradient(135deg, #9333EA, #7C3AED)' :
                                       'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: 'white',
                          }}
                        >
                          {character.rarity.toUpperCase()}
                        </span>
                        <span className="text-white/50 text-xs capitalize">{character.element}</span>
                      </div>
                    </div>
                    <div className="text-white/40">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            </animated.div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📢</span>
          <span>Announcements</span>
        </h2>
        <div className="space-y-3">
          {viewModel.announcements.map((announcement) => (
            <div 
              key={announcement.id}
              className="main-card flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                announcement.type === 'event' ? 'bg-yellow-500/20 text-yellow-400' :
                announcement.type === 'update' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {announcement.type === 'event' ? '🎉' :
                 announcement.type === 'update' ? '🚀' : '📰'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{announcement.title}</h3>
                <p className="text-white/60 text-sm">{announcement.description}</p>
              </div>
              <span className="text-white/40 text-xs">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⚔️', label: 'Quick Match', href: '/battle/quick', color: 'from-red-500 to-orange-500' },
          { icon: '🏆', label: 'Ranked', href: '/battle/ranked', color: 'from-yellow-500 to-amber-500' },
          { icon: '👥', label: 'Multiplayer', href: '/battle/multiplayer', color: 'from-green-500 to-emerald-500' },
          { icon: '🎮', label: 'Practice', href: '/battle/practice', color: 'from-blue-500 to-indigo-500' },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <div className={`main-card main-hover-scale cursor-pointer text-center py-6 bg-gradient-to-br ${action.color} bg-opacity-10`}>
              <div className="text-4xl mb-2">{action.icon}</div>
              <p className="font-medium text-white">{action.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
