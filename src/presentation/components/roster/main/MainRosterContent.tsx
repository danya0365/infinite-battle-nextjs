'use client';

import { CharacterMaster } from '@/src/data/master/characters';
import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MainInput } from '@/src/presentation/components/layouts/main/MainComponents/MainInput';
import { MainModal } from '@/src/presentation/components/layouts/main/MainComponents/MainModal';
import { ElementFilter, RarityFilter, RosterViewModel } from '@/src/presentation/presenters/roster/RosterPresenter';
import { RosterPresenterActions } from '@/src/presentation/presenters/roster/useRosterPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface MainRosterContentProps {
  viewModel: RosterViewModel;
  actions: RosterPresenterActions;
}

const elementIcons: Record<string, string> = {
  light: '💫',
  dark: '🌑',
  fire: '🔥',
  water: '💧',
  earth: '🌍',
  wind: '🌪️',
};

const elementColors: Record<string, string> = {
  light: 'from-yellow-400 to-amber-500',
  dark: 'from-purple-600 to-indigo-700',
  fire: 'from-red-500 to-orange-500',
  water: 'from-blue-400 to-cyan-500',
  earth: 'from-amber-600 to-yellow-700',
  wind: 'from-green-400 to-emerald-500',
};

const rarityColors: Record<string, string> = {
  legendary: 'border-yellow-400 shadow-yellow-400/30',
  epic: 'border-purple-400 shadow-purple-400/30',
  rare: 'border-blue-400 shadow-blue-400/30',
  common: 'border-gray-400 shadow-gray-400/30',
};

/**
 * MainRosterContent - Modern premium roster page design
 */
export function MainRosterContent({ viewModel, actions }: MainRosterContentProps) {
  const [mounted, setMounted] = useState(false);
  const [localSearch, setLocalSearch] = useState(viewModel.searchQuery);
  const { filteredCharacters, selectedCharacter, elementFilter, rarityFilter, totalCount } = viewModel;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, actions]);

  // Header animation
  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(-20px)' },
    config: { tension: 200, friction: 20 },
  });

  // Cards animation
  const cardsTrail = useTrail(filteredCharacters.length, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.9)' },
    delay: 100,
    config: { tension: 200, friction: 20 },
  });

  const elements: ElementFilter[] = ['all', 'light', 'dark', 'fire', 'water', 'earth', 'wind'];
  const rarities: RarityFilter[] = ['all', 'legendary', 'epic', 'rare', 'common'];

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8">
      {/* Header */}
      <animated.div style={headerSpring} className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold main-gradient-text mb-1">
              👥 Character Roster
            </h1>
            <p className="text-white/60">
              {filteredCharacters.length} of {totalCount} characters
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-64">
            <MainInput
              placeholder="Search characters..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>
      </animated.div>

      {/* Filters */}
      <div className="main-card mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Element Filter */}
          <div>
            <p className="text-white/60 text-sm mb-2">Element</p>
            <div className="flex flex-wrap gap-2">
              {elements.map((element) => (
                <MainButton
                  key={element}
                  variant={elementFilter === element ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => actions.setElementFilter(element)}
                >
                  {element === 'all' ? '🌐' : elementIcons[element]} {element.charAt(0).toUpperCase() + element.slice(1)}
                </MainButton>
              ))}
            </div>
          </div>

          {/* Rarity Filter */}
          <div>
            <p className="text-white/60 text-sm mb-2">Rarity</p>
            <div className="flex flex-wrap gap-2">
              {rarities.map((rarity) => (
                <MainButton
                  key={rarity}
                  variant={rarityFilter === rarity ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => actions.setRarityFilter(rarity)}
                >
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </MainButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCharacters.map((character, index) => (
            <animated.div
              key={character.id}
              style={cardsTrail[index]}
            >
              <CharacterCard
                character={character}
                onClick={() => actions.selectCharacter(character)}
              />
            </animated.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No characters found</h3>
          <p className="text-white/60 mb-4">Try adjusting your filters or search query.</p>
          <MainButton
            variant="ghost"
            onClick={() => {
              actions.setElementFilter('all');
              actions.setRarityFilter('all');
              actions.setSearchQuery('');
              setLocalSearch('');
            }}
          >
            Clear Filters
          </MainButton>
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <MainModal
          isOpen={!!selectedCharacter}
          onClose={() => actions.selectCharacter(null)}
          title={selectedCharacter.displayName}
          size="lg"
        >
          <CharacterDetail character={selectedCharacter} />
        </MainModal>
      )}
    </div>
  );
}

/**
 * Character Card Component
 */
function CharacterCard({
  character,
  onClick,
}: {
  character: CharacterMaster;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`main-card main-hover-scale cursor-pointer overflow-hidden w-full text-left border-2 ${rarityColors[character.rarity]}`}
    >
      {/* Character Image Placeholder */}
      <div
        className={`h-32 w-full rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br ${elementColors[character.element]}`}
      >
        <span className="text-5xl">{elementIcons[character.element]}</span>
      </div>

      {/* Info */}
      <h3 className="text-white font-bold truncate">{character.displayName}</h3>
      <div className="flex items-center justify-between mt-2">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            character.rarity === 'legendary'
              ? 'bg-yellow-500/30 text-yellow-400'
              : character.rarity === 'epic'
              ? 'bg-purple-500/30 text-purple-400'
              : character.rarity === 'rare'
              ? 'bg-blue-500/30 text-blue-400'
              : 'bg-gray-500/30 text-gray-400'
          }`}
        >
          {character.rarity.toUpperCase()}
        </span>
        <span className="text-white/50 text-xs capitalize">{character.element}</span>
      </div>
    </button>
  );
}

/**
 * Character Detail Component
 */
function CharacterDetail({ character }: { character: CharacterMaster }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className={`w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br ${elementColors[character.element]}`}
        >
          <span className="text-4xl">{elementIcons[character.element]}</span>
        </div>
        <div>
          <p className="text-white/60 capitalize">{character.element} Element</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                character.rarity === 'legendary'
                  ? 'bg-yellow-500/30 text-yellow-400'
                  : character.rarity === 'epic'
                  ? 'bg-purple-500/30 text-purple-400'
                  : 'bg-blue-500/30 text-blue-400'
              }`}
            >
              {character.rarity.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-white font-bold mb-2">Description</h4>
        <p className="text-white/70">{character.description}</p>
      </div>

      {/* Stats */}
      <div>
        <h4 className="text-white font-bold mb-3">Base Stats</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'HP', value: character.stats.hp, color: 'bg-green-500' },
            { label: 'ATK', value: character.stats.attack, color: 'bg-red-500' },
            { label: 'DEF', value: character.stats.defense, color: 'bg-blue-500' },
            { label: 'SPD', value: character.stats.speed, color: 'bg-yellow-500' },
            { label: 'KI', value: character.stats.ki, color: 'bg-purple-500' },
            { label: 'CRT', value: character.stats.critRate, color: 'bg-orange-500' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">{stat.label}</span>
                <span className="text-white font-medium">{stat.value}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stat.color} rounded-full transition-all`}
                  style={{ width: `${Math.min(stat.value / 200 * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-white font-bold mb-3">Skills</h4>
        <div className="space-y-2">
          {character.skills.map((skillId) => (
            <div
              key={skillId}
              className="p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <p className="text-white capitalize">{skillId.replace(/-/g, ' ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
