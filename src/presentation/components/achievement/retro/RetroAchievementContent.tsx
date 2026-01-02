/**
 * RetroAchievementContent
 * Windows 98 / IE5 style achievement gallery
 * Uses CSS classes for proper dark/light mode support
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
    <div className="retro-content-inner retro-achievement-container">
      {/* Title Bar */}
      <div className="retro-achievement-titlebar">
        <span>🏆 Achievements Gallery</span>
        <Link href="/">
          <RetroButton>← Back</RetroButton>
        </Link>
      </div>

      {/* Stats Bar */}
      <RetroGroupBox label="📊 Statistics">
        <div className="retro-achievement-stats">
          <div className="retro-achievement-stat">
            <strong>{stats.unlockedCount}</strong>
            <div className="retro-achievement-stat-label">Unlocked</div>
          </div>
          <div className="retro-achievement-stat">
            <strong>{stats.totalAchievements}</strong>
            <div className="retro-achievement-stat-label">Total</div>
          </div>
          <div className="retro-achievement-stat">
            <strong>{stats.earnedPoints}</strong>
            <div className="retro-achievement-stat-label">Points</div>
          </div>
          <div className="retro-achievement-stat">
            <strong>{stats.completionPercent}%</strong>
            <div className="retro-achievement-stat-label">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="retro-achievement-progress">
          <div 
            className="retro-achievement-progress-fill"
            style={{ width: `${stats.completionPercent}%` }}
          />
        </div>
      </RetroGroupBox>

      {/* Category Tabs */}
      <div className="retro-achievement-tabs">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`retro-achievement-tab ${!activeCategory ? 'active' : ''}`}
        >
          All ({stats.totalAchievements})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryFilter(cat)}
            className={`retro-achievement-tab ${activeCategory === cat ? 'active' : ''}`}
          >
            {presenter.getCategoryIcon(cat)} {presenter.getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Achievement List */}
      <div className="retro-achievement-list">
        <div className="retro-achievement-grid">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className={`retro-achievement-item ${achievement.isUnlocked ? 'unlocked' : ''}`}
            >
              <span className={`retro-achievement-item-icon ${!achievement.isUnlocked ? 'locked' : ''}`}>
                {achievement.isUnlocked ? achievement.icon : '🔒'}
              </span>
              <div className="retro-achievement-item-content">
                <div className="retro-achievement-item-name">
                  {achievement.name}
                </div>
                <div className="retro-achievement-item-status">
                  {achievement.isUnlocked ? '✓ Unlocked' : `${achievement.progressPercent}%`}
                </div>
              </div>
              <div 
                className="retro-achievement-item-points"
                style={{ background: presenter.getRarityColor(achievement.rarity) }}
              >
                {achievement.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-achievement-statusbar">
        <span className="retro-achievement-statusbar-section">
          Showing {achievements.length} achievements
        </span>
        <span className="retro-achievement-statusbar-section">
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
          <div className="retro-achievement-modal">
            <div className="retro-achievement-modal-header">
              <span className={`retro-achievement-modal-icon ${!selectedAchievement.isUnlocked ? 'locked' : ''}`}>
                {selectedAchievement.icon}
              </span>
              <div className="retro-achievement-modal-info">
                <p className="retro-achievement-modal-name">
                  {selectedAchievement.name}
                </p>
                <span 
                  className="retro-achievement-modal-rarity"
                  style={{ background: presenter.getRarityColor(selectedAchievement.rarity) }}
                >
                  {presenter.getRarityLabel(selectedAchievement.rarity)} • {selectedAchievement.points} pts
                </span>
              </div>
            </div>

            <p className="retro-achievement-modal-description">
              {selectedAchievement.description}
            </p>

            <RetroGroupBox label="Progress" style={{ marginTop: '12px' }}>
              <div style={{ padding: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>{presenter.formatProgress(selectedAchievement.userProgress, selectedAchievement.maxProgress)}</span>
                  <span>{selectedAchievement.progressPercent}%</span>
                </div>
                <div className="retro-achievement-progress">
                  <div 
                    className="retro-achievement-progress-fill"
                    style={{ 
                      width: `${selectedAchievement.progressPercent}%`,
                      height: '12px',
                      background: presenter.getRarityColor(selectedAchievement.rarity),
                    }}
                  />
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
              <p className="retro-achievement-modal-unlocked">
                ✓ Unlocked: {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
              </p>
            )}

            <div className="retro-achievement-modal-footer">
              <RetroButton onClick={() => setSelectedAchievement(null)}>Close</RetroButton>
            </div>
          </div>
        )}
      </RetroModal>
    </div>
  );
}
