'use client';

import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { ProfileViewModel } from '@/src/presentation/presenters/profile/ProfilePresenter';
import Link from 'next/link';

interface RetroProfileContentProps {
  viewModel: ProfileViewModel;
  onSwitchProfile: (profileId: string) => Promise<void>;
}

/**
 * RetroProfileContent - Windows 98 / IE5 style profile page
 */
export function RetroProfileContent({ viewModel, onSwitchProfile }: RetroProfileContentProps) {
  const { currentProfile, user, stats, recentMatches, profiles } = viewModel;

  if (!currentProfile || !user) {
    return (
      <div className="retro-home-content">
        <div className="retro-card" style={{ maxWidth: '400px', margin: '100px auto' }}>
          <div className="text-center">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="retro-card-title">No Profile Found</h2>
            <p style={{ marginBottom: '16px' }}>Please create a profile to continue.</p>
            <RetroButton>Create Profile</RetroButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="retro-home-content">
      {/* Profile Header Banner */}
      <div className="retro-welcome-banner">
        <div className="retro-welcome-title">
          👤 Player Profile: {currentProfile.name}
        </div>
        <div className="retro-welcome-subtitle">
          Level {currentProfile.level} • {currentProfile.rank.toUpperCase()} Rank • {currentProfile.rankPoints} RP
        </div>
      </div>

      <div className="retro-home-columns">
        {/* Left Column */}
        <div className="retro-home-column-left">
          {/* Profile Info */}
          <RetroGroupBox title="Profile Information">
            <table className="retro-table w-full">
              <tbody>
                <tr>
                  <td className="w-1/2">Player Name:</td>
                  <td><strong>{currentProfile.name}</strong></td>
                </tr>
                <tr>
                  <td>Level:</td>
                  <td><strong>{currentProfile.level}</strong></td>
                </tr>
                <tr>
                  <td>Experience:</td>
                  <td>{currentProfile.experience.toLocaleString()} XP</td>
                </tr>
                <tr>
                  <td>Rank:</td>
                  <td style={{ textTransform: 'capitalize' }}><strong>{currentProfile.rank}</strong></td>
                </tr>
                <tr>
                  <td>Rank Points:</td>
                  <td>{currentProfile.rankPoints} RP</td>
                </tr>
                <tr>
                  <td>Created:</td>
                  <td>{new Date(currentProfile.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: '16px' }}>
              <RetroButton>✏️ Edit Profile</RetroButton>
            </div>
          </RetroGroupBox>

          {/* Profile Switcher */}
          {profiles.length > 1 && (
            <RetroGroupBox title="🔄 Switch Profile" className="mt-4">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => onSwitchProfile(profile.id)}
                    className={profile.id === currentProfile.id ? 'retro-btn retro-btn-default' : 'retro-btn'}
                    style={{ width: '100%', textAlign: 'left' }}
                  >
                    {profile.id === currentProfile.id ? '→ ' : '  '}
                    {profile.name} (Lv.{profile.level})
                  </button>
                ))}
              </div>
            </RetroGroupBox>
          )}
        </div>

        {/* Center Column */}
        <div className="retro-home-column-center">
          {/* Statistics */}
          <RetroGroupBox title="📊 Battle Statistics">
            <table className="retro-table w-full">
              <tbody>
                <tr>
                  <td className="w-1/2">Total Matches:</td>
                  <td><strong>{stats.totalMatches}</strong></td>
                </tr>
                <tr>
                  <td>Wins:</td>
                  <td style={{ color: 'green' }}><strong>{stats.wins}</strong></td>
                </tr>
                <tr>
                  <td>Losses:</td>
                  <td style={{ color: 'red' }}><strong>{stats.losses}</strong></td>
                </tr>
                <tr>
                  <td>Win Rate:</td>
                  <td><strong>{stats.winRate}%</strong></td>
                </tr>
                <tr>
                  <td>Average Damage:</td>
                  <td>{stats.avgDamageDealt.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Average Combo:</td>
                  <td>{stats.avgCombo}</td>
                </tr>
                <tr>
                  <td>Highest Combo:</td>
                  <td><strong>{stats.highestCombo}</strong></td>
                </tr>
              </tbody>
            </table>
          </RetroGroupBox>

          {/* Recent Matches */}
          <RetroGroupBox title="📜 Recent Matches" className="mt-4">
            {recentMatches.length > 0 ? (
              <table className="retro-table w-full">
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Opponent</th>
                    <th>Type</th>
                    <th>Stage</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match) => (
                    <tr key={match.id}>
                      <td>
                        <span
                          className="retro-rarity-badge"
                          style={{
                            background: match.result === 'win' ? '#22c55e' : '#ef4444',
                          }}
                        >
                          {match.result.toUpperCase()}
                        </span>
                      </td>
                      <td>{match.opponentName}</td>
                      <td style={{ textTransform: 'capitalize' }}>{match.type}</td>
                      <td style={{ textTransform: 'capitalize' }}>{match.stage}</td>
                      <td>{new Date(match.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                No matches yet. Start battling!
              </div>
            )}
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <Link href="/match-history">
                <RetroButton>View All Matches...</RetroButton>
              </Link>
            </div>
          </RetroGroupBox>
        </div>

        {/* Right Column */}
        <div className="retro-home-column-right">
          {/* Quick Links */}
          <RetroGroupBox title="Quick Links">
            <ul className="retro-link-list">
              <li><Link href="/battle" className="retro-link">⚔️ Start Battle</Link></li>
              <li><Link href="/roster" className="retro-link">👥 Character Roster</Link></li>
              <li><Link href="/match-history" className="retro-link">📊 Full Statistics</Link></li>
              <li><Link href="/settings" className="retro-link">⚙️ Settings</Link></li>
              <li><Link href="/" className="retro-link">🏠 Return Home</Link></li>
            </ul>
          </RetroGroupBox>

          {/* Account Info */}
          <RetroGroupBox title="Account Info" className="mt-4">
            <table className="retro-table w-full">
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td style={{ fontSize: '10px' }}>{user.email}</td>
                </tr>
                <tr>
                  <td>Profiles:</td>
                  <td>{profiles.length}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td style={{ color: 'green' }}>● Online</td>
                </tr>
              </tbody>
            </table>
          </RetroGroupBox>

          {/* Win/Loss Display */}
          <div
            className="retro-visitor-counter"
            style={{ marginTop: '16px' }}
          >
            <div className="retro-visitor-counter-label">Win/Loss Record</div>
            <div className="retro-visitor-counter-value">
              {stats.wins}W / {stats.losses}L
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <hr className="retro-hr" />
      <div className="retro-footer-text text-center">
        Last login: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
