'use client';

import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { RetroSelect } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroSelect';
import { MatchHistoryViewModel, MatchResultFilter, MatchTypeFilter } from '@/src/presentation/presenters/match-history/MatchHistoryPresenter';
import { MatchHistoryPresenterActions } from '@/src/presentation/presenters/match-history/useMatchHistoryPresenter';

interface RetroMatchHistoryContentProps {
  viewModel: MatchHistoryViewModel;
  actions: MatchHistoryPresenterActions;
}

/**
 * RetroMatchHistoryContent - Windows 98 / IE5 style match history page
 */
export function RetroMatchHistoryContent({ viewModel, actions }: RetroMatchHistoryContentProps) {
  const { filteredMatches, stats, typeFilter, resultFilter } = viewModel;

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'ranked', label: 'Ranked' },
    { value: 'casual', label: 'Casual' },
    { value: 'training', label: 'Training' },
  ];

  const resultOptions = [
    { value: 'all', label: 'All Results' },
    { value: 'win', label: 'Wins Only' },
    { value: 'loss', label: 'Losses Only' },
    { value: 'draw', label: 'Draws Only' },
  ];

  return (
    <div className="retro-home-content">
      {/* Header Banner */}
      <div className="retro-welcome-banner">
        <div className="retro-welcome-title">
          📊 Match History
        </div>
        <div className="retro-welcome-subtitle">
          {stats.wins}W - {stats.losses}L | {stats.winRate}% Win Rate
        </div>
      </div>

      {/* Statistics */}
      <RetroGroupBox title="📈 Battle Statistics">
        <table className="retro-table w-full">
          <tbody>
            <tr>
              <td>Total Matches:</td>
              <td><strong>{stats.totalMatches}</strong></td>
              <td>Win Rate:</td>
              <td><strong>{stats.winRate}%</strong></td>
            </tr>
            <tr>
              <td style={{ color: 'green' }}>Wins:</td>
              <td style={{ color: 'green' }}><strong>{stats.wins}</strong></td>
              <td style={{ color: 'red' }}>Losses:</td>
              <td style={{ color: 'red' }}><strong>{stats.losses}</strong></td>
            </tr>
            <tr>
              <td>Current Streak:</td>
              <td><strong>{stats.currentStreak}🔥</strong></td>
              <td>Best Streak:</td>
              <td><strong>{stats.longestWinStreak}⭐</strong></td>
            </tr>
            <tr>
              <td>Total Damage:</td>
              <td><strong>{stats.totalDamageDealt.toLocaleString()}</strong></td>
              <td>Avg Duration:</td>
              <td><strong>{stats.avgMatchDuration}s</strong></td>
            </tr>
          </tbody>
        </table>
      </RetroGroupBox>

      {/* Filters */}
      <RetroGroupBox title="🔍 Filter Matches" className="mt-4">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ width: '150px' }}>
            <RetroSelect
              label="Match Type:"
              options={typeOptions}
              value={typeFilter}
              onChange={(e) => actions.setTypeFilter(e.target.value as MatchTypeFilter)}
            />
          </div>
          <div style={{ width: '150px' }}>
            <RetroSelect
              label="Result:"
              options={resultOptions}
              value={resultFilter}
              onChange={(e) => actions.setResultFilter(e.target.value as MatchResultFilter)}
            />
          </div>
          <RetroButton
            onClick={() => {
              actions.setTypeFilter('all');
              actions.setResultFilter('all');
            }}
          >
            Clear Filters
          </RetroButton>
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px' }}>
          Showing {filteredMatches.length} of {stats.totalMatches} matches
        </div>
      </RetroGroupBox>

      {/* Match Table */}
      <RetroGroupBox title="📋 Match Records" className="mt-4">
        {filteredMatches.length > 0 ? (
          <table className="retro-table w-full">
            <thead>
              <tr>
                <th style={{ width: '70px' }}>Result</th>
                <th>Opponent</th>
                <th style={{ width: '80px' }}>Type</th>
                <th style={{ width: '100px' }}>Stage</th>
                <th style={{ width: '70px' }}>Damage</th>
                <th style={{ width: '50px' }}>Combo</th>
                <th style={{ width: '60px' }}>Duration</th>
                <th style={{ width: '90px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.map((match) => (
                <tr key={match.id}>
                  <td>
                    <span
                      className="retro-rarity-badge"
                      style={{
                        background:
                          match.result === 'win'
                            ? '#22c55e'
                            : match.result === 'loss'
                            ? '#ef4444'
                            : '#eab308',
                      }}
                    >
                      {match.result === 'win' ? '🏆 WIN' : 
                       match.result === 'loss' ? '💔 LOSS' : '🤝 DRAW'}
                    </span>
                  </td>
                  <td>{match.opponentName}</td>
                  <td style={{ textTransform: 'capitalize' }}>{match.type}</td>
                  <td style={{ textTransform: 'capitalize' }}>{match.stage}</td>
                  <td>{match.stats.damageDealt.toLocaleString()}</td>
                  <td>{match.stats.highestCombo}</td>
                  <td>{match.stats.duration}s</td>
                  <td>{new Date(match.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📭</div>
            <p>No matches found. Try adjusting your filters or play some matches!</p>
          </div>
        )}
      </RetroGroupBox>

      {/* Win/Loss Chart (ASCII style) */}
      <RetroGroupBox title="📊 Win/Loss Chart" className="mt-4">
        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
          <div>
            Wins  [{Array(Math.round(stats.winRate / 5)).fill('█').join('')}{Array(20 - Math.round(stats.winRate / 5)).fill('░').join('')}] {stats.wins}
          </div>
          <div>
            Losses [{Array(Math.round((100 - stats.winRate) / 5)).fill('█').join('')}{Array(20 - Math.round((100 - stats.winRate) / 5)).fill('░').join('')}] {stats.losses}
          </div>
        </div>
      </RetroGroupBox>

      {/* Footer */}
      <hr className="retro-hr" />
      <div className="retro-footer-text text-center">
        Match records are stored locally | Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
