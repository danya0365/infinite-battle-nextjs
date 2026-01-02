/**
 * RetroAchievementContent
 * Windows 98 / IE5 style achievement gallery
 */

'use client';

import {
    AchievementCategory,
    AchievementFilters,
    AchievementStats,
    AchievementWithProgress,
} from '@/src/application/repositories/IAchievementRepository';
import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { RetroModal } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroModal';
import { AchievementPresenter } from '@/src/presentation/presenters/achievement/AchievementPresenter';
import Link from 'next/link';
import { useState } from 'react';

interface RetroAchievementContentProps {
  achievements: AchievementWithProgress[];
  stats: AchievementStats;
  recentUnlocks: AchievementWithProgress[];
  currentFilter: AchievementFilters;
  presenter: AchievementPresenter;
  filterByCategory: (category: AchievementCategory | null) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export default function RetroAchievementContent({
  achievements,
  stats,
  recentUnlocks,
  presenter,
  filterByCategory,
  clearFilters,
}: RetroAchievementContentProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementWithProgress | null>(null);
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | null>(null);

  const categories: AchievementCategory[] = ['battle', 'collection', 'social', 'mastery', 'special'];

  const handleCategoryFilter = (category: AchievementCategory | null) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

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
        <span>🏆 Achievements Gallery</span>
        <Link href="/">
          <RetroButton>← Back</RetroButton>
        </Link>
      </div>

      {/* Stats Bar */}
      <RetroGroupBox label="📊 Statistics">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          padding: '8px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <strong>{stats.unlockedCount}</strong>
            <div style={{ fontSize: '10px' }}>Unlocked</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong>{stats.totalAchievements}</strong>
            <div style={{ fontSize: '10px' }}>Total</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong>{stats.earnedPoints}</strong>
            <div style={{ fontSize: '10px' }}>Points</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong>{stats.completionPercent}%</strong>
            <div style={{ fontSize: '10px' }}>Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          margin: '0 8px 8px',
          border: '2px inset #808080',
          padding: '2px',
        }}>
          <div style={{
            width: `${stats.completionPercent}%`,
            height: '16px',
            background: 'linear-gradient(180deg, #0000ff 0%, #000080 100%)',
          }} />
        </div>
      </RetroGroupBox>

      {/* Category Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #808080' }}>
        <button
          onClick={() => handleCategoryFilter(null)}
          style={{
            padding: '4px 12px',
            background: !activeCategory ? '#d4d0c8' : '#c0c0c0',
            border: '2px outset #d4d0c8',
            borderBottom: !activeCategory ? 'none' : '2px outset #d4d0c8',
            cursor: 'pointer',
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
            fontSize: '11px',
            fontWeight: !activeCategory ? 'bold' : 'normal',
          }}
        >
          All ({stats.totalAchievements})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryFilter(cat)}
            style={{
              padding: '4px 12px',
              background: activeCategory === cat ? '#d4d0c8' : '#c0c0c0',
              border: '2px outset #d4d0c8',
              borderBottom: activeCategory === cat ? 'none' : '2px outset #d4d0c8',
              cursor: 'pointer',
              fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
              fontSize: '11px',
              fontWeight: activeCategory === cat ? 'bold' : 'normal',
            }}
          >
            {presenter.getCategoryIcon(cat)} {presenter.getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Achievement List */}
      <div style={{
        flex: 1,
        border: '2px inset #808080',
        background: 'white',
        overflow: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '4px',
          padding: '8px',
        }}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                background: achievement.isUnlocked ? '#ffffcc' : '#f0f0f0',
                border: '1px solid #808080',
                cursor: 'pointer',
                opacity: achievement.isUnlocked ? 1 : 0.7,
              }}
            >
              <span style={{
                fontSize: '24px',
                filter: achievement.isUnlocked ? 'none' : 'grayscale(1)',
              }}>
                {achievement.isUnlocked ? achievement.icon : '🔒'}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {achievement.name}
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>
                  {achievement.isUnlocked ? '✓ Unlocked' : `${achievement.progressPercent}%`}
                </div>
              </div>
              <div style={{
                padding: '2px 6px',
                background: presenter.getRarityColor(achievement.rarity),
                color: 'white',
                fontSize: '9px',
                fontWeight: 'bold',
              }}>
                {achievement.points}
              </div>
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
        <span style={{ flex: 2 }}>Showing {achievements.length} achievements</span>
        <span style={{ flex: 1, borderLeft: '1px solid #808080', paddingLeft: '4px' }}>
          {stats.earnedPoints} / {stats.totalPoints} total points
        </span>
      </div>

      {/* Achievement Detail Modal */}
      <RetroModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title={selectedAchievement?.name || 'Achievement'}
      >
        {selectedAchievement && (
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '48px',
                filter: selectedAchievement.isUnlocked ? 'none' : 'grayscale(1)',
              }}>
                {selectedAchievement.icon}
              </span>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {selectedAchievement.name}
                </p>
                <p style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  marginTop: '4px',
                  background: presenter.getRarityColor(selectedAchievement.rarity),
                  color: 'white',
                  fontSize: '10px',
                }}>
                  {presenter.getRarityLabel(selectedAchievement.rarity)} • {selectedAchievement.points} pts
                </p>
              </div>
            </div>

            <p style={{ marginTop: '12px', fontSize: '12px' }}>
              {selectedAchievement.description}
            </p>

            <RetroGroupBox label="Progress" style={{ marginTop: '12px' }}>
              <div style={{ padding: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>{presenter.formatProgress(selectedAchievement.userProgress, selectedAchievement.maxProgress)}</span>
                  <span>{selectedAchievement.progressPercent}%</span>
                </div>
                <div style={{ border: '2px inset #808080', padding: '2px' }}>
                  <div style={{
                    width: `${selectedAchievement.progressPercent}%`,
                    height: '12px',
                    background: presenter.getRarityColor(selectedAchievement.rarity),
                  }} />
                </div>
              </div>
            </RetroGroupBox>

            {selectedAchievement.reward && (
              <RetroGroupBox label="Reward" style={{ marginTop: '8px' }}>
                <div style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {presenter.getRewardLabel(selectedAchievement.reward)}
                </div>
              </RetroGroupBox>
            )}

            {selectedAchievement.isUnlocked && selectedAchievement.unlockedAt && (
              <p style={{ marginTop: '12px', fontSize: '11px', color: '#008000' }}>
                ✓ Unlocked: {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
              </p>
            )}

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <RetroButton onClick={() => setSelectedAchievement(null)}>Close</RetroButton>
            </div>
          </div>
        )}
      </RetroModal>
    </div>
  );
}
