'use client';

import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MatchHistoryViewModel, MatchResultFilter, MatchTypeFilter } from '@/src/presentation/presenters/match-history/MatchHistoryPresenter';
import { MatchHistoryPresenterActions } from '@/src/presentation/presenters/match-history/useMatchHistoryPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface MainMatchHistoryContentProps {
  viewModel: MatchHistoryViewModel;
  actions: MatchHistoryPresenterActions;
}

/**
 * MainMatchHistoryContent - Modern premium match history page design
 */
export function MainMatchHistoryContent({ viewModel, actions }: MainMatchHistoryContentProps) {
  const [mounted, setMounted] = useState(false);
  const { filteredMatches, stats, typeFilter, resultFilter } = viewModel;

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
  const statsTrail = useTrail(6, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' },
    delay: 100,
    config: { tension: 200, friction: 20 },
  });

  const typeFilters: MatchTypeFilter[] = ['all', 'ranked', 'casual', 'training'];
  const resultFilters: MatchResultFilter[] = ['all', 'win', 'loss', 'draw'];

  const statsData = [
    { label: 'Total Matches', value: stats.totalMatches.toString(), icon: '🎮', color: 'from-blue-400 to-indigo-500' },
    { label: 'Win Rate', value: `${stats.winRate}%`, icon: '📈', color: 'from-green-400 to-emerald-500' },
    { label: 'Current Streak', value: stats.currentStreak.toString(), icon: '🔥', color: 'from-orange-400 to-red-500' },
    { label: 'Best Streak', value: stats.longestWinStreak.toString(), icon: '⭐', color: 'from-yellow-400 to-amber-500' },
    { label: 'Damage Dealt', value: stats.totalDamageDealt.toLocaleString(), icon: '💥', color: 'from-red-400 to-pink-500' },
    { label: 'Avg Duration', value: `${stats.avgMatchDuration}s`, icon: '⏱️', color: 'from-purple-400 to-violet-500' },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      {/* Header */}
      <animated.div style={headerSpring} className="mb-6">
        <h1 className="text-3xl font-bold main-gradient-text mb-1">
          📊 Match History
        </h1>
        <p className="text-white/60">
          {stats.wins}W - {stats.losses}L ({stats.winRate}% win rate)
        </p>
      </animated.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <animated.div
            key={stat.label}
            style={statsTrail[index]}
            className="main-card"
          >
            <div className="text-center">
              <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <p className="text-white/60 text-xs">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </animated.div>
        ))}
      </div>

      {/* Filters */}
      <div className="main-card mb-6">
        <div className="flex flex-wrap gap-6">
          {/* Type Filter */}
          <div>
            <p className="text-white/60 text-sm mb-2">Match Type</p>
            <div className="flex gap-2">
              {typeFilters.map((type) => (
                <MainButton
                  key={type}
                  variant={typeFilter === type ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => actions.setTypeFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MainButton>
              ))}
            </div>
          </div>

          {/* Result Filter */}
          <div>
            <p className="text-white/60 text-sm mb-2">Result</p>
            <div className="flex gap-2">
              {resultFilters.map((result) => (
                <MainButton
                  key={result}
                  variant={resultFilter === result ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => actions.setResultFilter(result)}
                >
                  {result === 'win' ? '🏆 Win' : 
                   result === 'loss' ? '💔 Loss' :
                   result === 'draw' ? '🤝 Draw' : '🌐 All'}
                </MainButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match List */}
      <div className="main-card">
        <h2 className="text-xl font-bold text-white mb-4">
          Showing {filteredMatches.length} matches
        </h2>

        {filteredMatches.length > 0 ? (
          <div className="space-y-3">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className={`p-4 rounded-xl border transition-all hover:scale-[1.01] ${
                  match.result === 'win'
                    ? 'bg-green-500/10 border-green-500/30'
                    : match.result === 'loss'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`text-3xl ${
                      match.result === 'win' ? 'text-green-400' : 
                      match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {match.result === 'win' ? '🏆' : match.result === 'loss' ? '💔' : '🤝'}
                    </span>
                    <div>
                      <p className="text-white font-medium text-lg">
                        vs {match.opponentName}
                      </p>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span className="capitalize">{match.type}</span>
                        <span>•</span>
                        <span className="capitalize">{match.stage}</span>
                        <span>•</span>
                        <span>{match.stats.duration}s</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      match.result === 'win' ? 'text-green-400' : 
                      match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {match.result.toUpperCase()}
                    </p>
                    <p className="text-white/60 text-sm">
                      {new Date(match.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Match Stats */}
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-white/50 text-xs">Damage</p>
                    <p className="text-white font-medium">{match.stats.damageDealt.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Combo</p>
                    <p className="text-white font-medium">{match.stats.highestCombo}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Cards</p>
                    <p className="text-white font-medium">{match.stats.cardsUsed}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Vanish</p>
                    <p className="text-white font-medium">{match.stats.vanishesUsed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-white/60">Try adjusting your filters or play some matches!</p>
          </div>
        )}
      </div>
    </div>
  );
}
