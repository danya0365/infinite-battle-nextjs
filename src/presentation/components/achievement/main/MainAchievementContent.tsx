/**
 * MainAchievementContent
 * Modern achievement gallery with glassmorphism and animations
 * Uses CSS classes for proper dark/light mode support
 */

'use client';

import {
    AchievementCategory,
    AchievementFilters,
    AchievementRarity,
    AchievementStats,
    AchievementWithProgress,
} from '@/src/application/repositories/IAchievementRepository';
import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MainModal } from '@/src/presentation/components/layouts/main/MainComponents/MainModal';
import { AchievementPresenter } from '@/src/presentation/presenters/achievement/AchievementPresenter';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

interface MainAchievementContentProps {
  achievements: AchievementWithProgress[];
  stats: AchievementStats;
  recentUnlocks: AchievementWithProgress[];
  currentFilter: AchievementFilters;
  presenter: AchievementPresenter;
  filterByCategory: (category: AchievementCategory | null) => Promise<void>;
  filterByRarity: (rarity: AchievementRarity | null) => Promise<void>;
  showUnlockedOnly: (value: boolean) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export default function MainAchievementContent({
  achievements,
  stats,
  recentUnlocks,
  currentFilter,
  presenter,
  filterByCategory,
  filterByRarity,
  showUnlockedOnly,
  clearFilters,
}: MainAchievementContentProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementWithProgress | null>(null);
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | null>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  const categories: AchievementCategory[] = ['battle', 'collection', 'social', 'mastery', 'special'];

  const handleCategoryFilter = (category: AchievementCategory | null) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

  return (
    <animated.div style={fadeIn} className="main-content">
      <div className="main-achievement-container">
        {/* Header */}
        <div className="main-achievement-header">
          <div>
            <h1 className="main-achievement-title">🏆 Achievements</h1>
            <p className="main-achievement-subtitle">
              {stats.unlockedCount} / {stats.totalAchievements} unlocked • {stats.earnedPoints} pts
            </p>
          </div>
          <Link href="/">
            <MainButton variant="ghost">← Back</MainButton>
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="main-achievement-progress">
          <div className="main-achievement-progress-header">
            <span className="main-achievement-progress-label">Overall Progress</span>
            <span className="main-achievement-progress-value">{stats.completionPercent}%</span>
          </div>
          <div className="main-achievement-progress-bar">
            <div 
              className="main-achievement-progress-fill"
              style={{ width: `${stats.completionPercent}%` }}
            />
          </div>

          {/* Stats Grid */}
          <div className="main-achievement-stats">
            {categories.map((cat) => (
              <div key={cat} className="main-achievement-stat">
                <span className="main-achievement-stat-icon">{presenter.getCategoryIcon(cat)}</span>
                <p className="main-achievement-stat-text">
                  {stats.byCategory[cat]?.unlocked || 0}/{stats.byCategory[cat]?.total || 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="main-achievement-tabs">
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`main-achievement-tab ${!activeCategory ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`main-achievement-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {presenter.getCategoryIcon(cat)} {presenter.getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="main-achievement-grid">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              presenter={presenter}
              onClick={() => setSelectedAchievement(achievement)}
            />
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      <MainModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title={selectedAchievement?.name || 'Achievement'}
      >
        {selectedAchievement && (
          <div className="main-achievement-modal">
            <div 
              className={`main-achievement-modal-icon ${!selectedAchievement.isUnlocked ? 'locked' : ''}`}
              style={{ background: presenter.getRarityGradient(selectedAchievement.rarity) }}
            >
              {selectedAchievement.icon}
            </div>

            <h2 className="main-achievement-modal-name">{selectedAchievement.name}</h2>
            <span 
              className="main-achievement-modal-rarity"
              style={{ background: presenter.getRarityGradient(selectedAchievement.rarity) }}
            >
              {presenter.getRarityLabel(selectedAchievement.rarity)}
            </span>

            <p className="main-achievement-modal-description">
              {selectedAchievement.description}
            </p>

            {/* Progress */}
            <div className="main-achievement-modal-progress">
              <div className="main-achievement-modal-progress-header">
                <span>Progress</span>
                <span>{presenter.formatProgress(selectedAchievement.userProgress, selectedAchievement.maxProgress)}</span>
              </div>
              <div className="main-achievement-modal-progress-bar">
                <div 
                  style={{
                    width: `${selectedAchievement.progressPercent}%`,
                    height: '100%',
                    background: presenter.getRarityGradient(selectedAchievement.rarity),
                  }}
                />
              </div>
            </div>

            {/* Reward */}
            {selectedAchievement.reward && (
              <div className="main-achievement-modal-reward">
                <p className="main-achievement-modal-reward-label">Reward</p>
                <p className="main-achievement-modal-reward-value">
                  {presenter.getRewardLabel(selectedAchievement.reward)}
                </p>
              </div>
            )}

            {selectedAchievement.isUnlocked && selectedAchievement.unlockedAt && (
              <p className="main-achievement-modal-unlocked">
                ✅ Unlocked on {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
              </p>
            )}

            <MainButton
              variant="ghost"
              onClick={() => setSelectedAchievement(null)}
              style={{ marginTop: '24px' }}
            >
              Close
            </MainButton>
          </div>
        )}
      </MainModal>
    </animated.div>
  );
}

// Achievement Card Component
function AchievementCard({
  achievement,
  presenter,
  onClick,
}: {
  achievement: AchievementWithProgress;
  presenter: AchievementPresenter;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`main-achievement-card ${!achievement.isUnlocked ? 'locked' : ''}`}
    >
      {/* Icon */}
      <div 
        className={`main-achievement-card-icon ${!achievement.isUnlocked ? 'locked' : ''}`}
        style={{
          background: achievement.isUnlocked 
            ? presenter.getRarityGradient(achievement.rarity) 
            : undefined,
        }}
      >
        {achievement.isUnlocked ? achievement.icon : '🔒'}
      </div>

      {/* Content */}
      <div className="main-achievement-card-content">
        <div className="main-achievement-card-header">
          <p className="main-achievement-card-name">{achievement.name}</p>
          {achievement.isUnlocked && <span className="main-achievement-card-check">✓</span>}
        </div>
        <p className="main-achievement-card-description">{achievement.description}</p>

        {/* Progress Bar */}
        {!achievement.isUnlocked && (
          <div className="main-achievement-card-progress">
            <div 
              className="main-achievement-card-progress-fill"
              style={{
                width: `${achievement.progressPercent}%`,
                background: presenter.getRarityColor(achievement.rarity),
              }}
            />
          </div>
        )}
      </div>

      {/* Points */}
      <div className="main-achievement-card-points">
        {achievement.points} pts
      </div>
    </button>
  );
}
