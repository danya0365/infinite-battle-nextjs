/**
 * MainAchievementContent
 * Modern achievement gallery with glassmorphism and animations
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
  const rarities: AchievementRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

  const handleCategoryFilter = (category: AchievementCategory | null) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

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
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🏆 Achievements
            </h1>
            <p style={{ color: 'var(--main-text-secondary)', marginTop: '4px' }}>
              {stats.unlockedCount} / {stats.totalAchievements} unlocked • {stats.earnedPoints} pts
            </p>
          </div>
          <Link href="/">
            <MainButton variant="ghost">← Back</MainButton>
          </Link>
        </div>

        {/* Progress Overview */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '16px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Overall Progress</span>
            <span style={{ color: '#a855f7', fontWeight: 'bold' }}>{stats.completionPercent}%</span>
          </div>
          <div style={{
            height: '12px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${stats.completionPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              borderRadius: '6px',
              transition: 'width 1s ease',
            }} />
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            marginTop: '16px',
          }}>
            {categories.map((cat) => (
              <div key={cat} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '20px' }}>{presenter.getCategoryIcon(cat)}</span>
                <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  {stats.byCategory[cat]?.unlocked || 0}/{stats.byCategory[cat]?.total || 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => handleCategoryFilter(null)}
            style={{
              padding: '8px 16px',
              background: !activeCategory ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'var(--main-glass-bg)',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              color: 'var(--main-text)',
              fontWeight: !activeCategory ? 'bold' : 'normal',
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              style={{
                padding: '8px 16px',
                background: activeCategory === cat ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'var(--main-glass-bg)',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                color: 'var(--main-text)',
                fontWeight: activeCategory === cat ? 'bold' : 'normal',
              }}
            >
              {presenter.getCategoryIcon(cat)} {presenter.getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          alignContent: 'start',
        }}>
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
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto',
              borderRadius: '50%',
              background: presenter.getRarityGradient(selectedAchievement.rarity),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              opacity: selectedAchievement.isUnlocked ? 1 : 0.5,
            }}>
              {selectedAchievement.icon}
            </div>

            <h2 style={{ marginTop: '16px' }}>{selectedAchievement.name}</h2>
            <p style={{
              display: 'inline-block',
              padding: '4px 12px',
              marginTop: '8px',
              background: presenter.getRarityGradient(selectedAchievement.rarity),
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {presenter.getRarityLabel(selectedAchievement.rarity)}
            </p>

            <p style={{ marginTop: '16px', color: 'var(--main-text-secondary)' }}>
              {selectedAchievement.description}
            </p>

            {/* Progress */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Progress</span>
                <span>{presenter.formatProgress(selectedAchievement.userProgress, selectedAchievement.maxProgress)}</span>
              </div>
              <div style={{
                height: '8px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${selectedAchievement.progressPercent}%`,
                  height: '100%',
                  background: presenter.getRarityGradient(selectedAchievement.rarity),
                }} />
              </div>
            </div>

            {/* Reward */}
            {selectedAchievement.reward && (
              <div style={{
                marginTop: '24px',
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
              }}>
                <p style={{ color: 'var(--main-text-secondary)', fontSize: '0.875rem' }}>Reward</p>
                <p style={{ fontWeight: 'bold', marginTop: '4px' }}>
                  {presenter.getRewardLabel(selectedAchievement.reward)}
                </p>
              </div>
            )}

            {selectedAchievement.isUnlocked && selectedAchievement.unlockedAt && (
              <p style={{ marginTop: '16px', fontSize: '0.875rem', color: 'var(--main-text-secondary)' }}>
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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        background: achievement.isUnlocked
          ? 'var(--main-glass-bg)'
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: `1px solid ${achievement.isUnlocked ? presenter.getRarityColor(achievement.rarity) + '40' : 'rgba(255,255,255,0.05)'}`,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        opacity: achievement.isUnlocked ? 1 : 0.6,
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: achievement.isUnlocked
          ? presenter.getRarityGradient(achievement.rarity)
          : 'rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        flexShrink: 0,
      }}>
        {achievement.isUnlocked ? achievement.icon : '🔒'}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {achievement.name}
          </p>
          {achievement.isUnlocked && <span style={{ color: '#10b981' }}>✓</span>}
        </div>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--main-text-secondary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {achievement.description}
        </p>

        {/* Progress Bar */}
        {!achievement.isUnlocked && (
          <div style={{
            marginTop: '8px',
            height: '4px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${achievement.progressPercent}%`,
              height: '100%',
              background: presenter.getRarityColor(achievement.rarity),
            }} />
          </div>
        )}
      </div>

      {/* Points */}
      <div style={{
        padding: '4px 8px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        flexShrink: 0,
      }}>
        {achievement.points} pts
      </div>
    </button>
  );
}
