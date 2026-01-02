'use client';

import { CharacterMaster } from '@/src/data/master/characters';
import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { RetroInput } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroInput';
import { RetroModal } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroModal';
import { RetroSelect } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroSelect';
import { ElementFilter, RarityFilter, RosterViewModel } from '@/src/presentation/presenters/roster/RosterPresenter';
import { RosterPresenterActions } from '@/src/presentation/presenters/roster/useRosterPresenter';
import { useEffect, useState } from 'react';

interface RetroRosterContentProps {
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

/**
 * RetroRosterContent - Windows 98 / IE5 style roster page
 */
export function RetroRosterContent({ viewModel, actions }: RetroRosterContentProps) {
  const [localSearch, setLocalSearch] = useState(viewModel.searchQuery);
  const { filteredCharacters, selectedCharacter, elementFilter, rarityFilter, totalCount } = viewModel;

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, actions]);

  const elementOptions = [
    { value: 'all', label: '🌐 All Elements' },
    { value: 'light', label: '💫 Light' },
    { value: 'dark', label: '🌑 Dark' },
    { value: 'fire', label: '🔥 Fire' },
    { value: 'water', label: '💧 Water' },
    { value: 'earth', label: '🌍 Earth' },
    { value: 'wind', label: '🌪️ Wind' },
  ];

  const rarityOptions = [
    { value: 'all', label: 'All Rarities' },
    { value: 'legendary', label: '⭐ Legendary' },
    { value: 'epic', label: '💜 Epic' },
    { value: 'rare', label: '💙 Rare' },
    { value: 'common', label: '⚪ Common' },
  ];

  return (
    <div className="retro-home-content">
      {/* Header Banner */}
      <div className="retro-welcome-banner">
        <div className="retro-welcome-title">
          👥 Character Roster
        </div>
        <div className="retro-welcome-subtitle">
          Browse and select your fighters
        </div>
      </div>

      {/* Filters */}
      <RetroGroupBox title="🔍 Search & Filter">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <RetroInput
              label="Search:"
              placeholder="Search characters..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <div style={{ width: '150px' }}>
            <RetroSelect
              label="Element:"
              options={elementOptions}
              value={elementFilter}
              onChange={(e) => actions.setElementFilter(e.target.value as ElementFilter)}
            />
          </div>
          <div style={{ width: '150px' }}>
            <RetroSelect
              label="Rarity:"
              options={rarityOptions}
              value={rarityFilter}
              onChange={(e) => actions.setRarityFilter(e.target.value as RarityFilter)}
            />
          </div>
          <RetroButton
            onClick={() => {
              actions.setElementFilter('all');
              actions.setRarityFilter('all');
              actions.setSearchQuery('');
              setLocalSearch('');
            }}
          >
            Clear
          </RetroButton>
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px' }}>
          Showing {filteredCharacters.length} of {totalCount} characters
        </div>
      </RetroGroupBox>

      {/* Character Table */}
      <RetroGroupBox title="📋 Character List" className="mt-4">
        {filteredCharacters.length > 0 ? (
          <table className="retro-table w-full">
            <thead>
              <tr>
                <th style={{ width: '30px' }}></th>
                <th>Name</th>
                <th style={{ width: '80px' }}>Element</th>
                <th style={{ width: '80px' }}>Rarity</th>
                <th style={{ width: '60px' }}>HP</th>
                <th style={{ width: '60px' }}>ATK</th>
                <th style={{ width: '60px' }}>DEF</th>
                <th style={{ width: '80px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharacters.map((character) => (
                <tr key={character.id}>
                  <td style={{ textAlign: 'center' }}>
                    {elementIcons[character.element]}
                  </td>
                  <td>{character.displayName}</td>
                  <td style={{ textTransform: 'capitalize' }}>{character.element}</td>
                  <td>
                    <span
                      className="retro-rarity-badge"
                      style={{
                        background:
                          character.rarity === 'legendary'
                            ? '#FFD700'
                            : character.rarity === 'epic'
                            ? '#9333EA'
                            : character.rarity === 'rare'
                            ? '#3B82F6'
                            : '#6B7280',
                      }}
                    >
                      {character.rarity.toUpperCase()}
                    </span>
                  </td>
                  <td>{character.stats.hp}</td>
                  <td>{character.stats.attack}</td>
                  <td>{character.stats.defense}</td>
                  <td>
                    <RetroButton onClick={() => actions.selectCharacter(character)}>
                      View
                    </RetroButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <p>No characters found. Try adjusting your filters.</p>
          </div>
        )}
      </RetroGroupBox>

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <RetroModal
          isOpen={!!selectedCharacter}
          onClose={() => actions.selectCharacter(null)}
          title={`Character Details: ${selectedCharacter.displayName}`}
          icon={elementIcons[selectedCharacter.element]}
          width={500}
          footer={
            <RetroButton onClick={() => actions.selectCharacter(null)}>
              Close
            </RetroButton>
          }
        >
          <RetroCharacterDetail character={selectedCharacter} />
        </RetroModal>
      )}

      {/* Footer */}
      <hr className="retro-hr" />
      <div className="retro-footer-text text-center">
        Total Characters: {totalCount} | Database Last Updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

/**
 * Retro Character Detail Component
 */
function RetroCharacterDetail({ character }: { character: CharacterMaster }) {
  return (
    <div>
      {/* Basic Info */}
      <table className="retro-table w-full" style={{ marginBottom: '16px' }}>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Name:</td>
            <td><strong>{character.displayName}</strong></td>
          </tr>
          <tr>
            <td>Element:</td>
            <td>{elementIcons[character.element]} {character.element}</td>
          </tr>
          <tr>
            <td>Rarity:</td>
            <td style={{ textTransform: 'uppercase' }}>{character.rarity}</td>
          </tr>
        </tbody>
      </table>

      {/* Description */}
      <RetroGroupBox title="Description">
        <p>{character.description}</p>
      </RetroGroupBox>

      {/* Stats */}
      <RetroGroupBox title="Base Stats" className="mt-4">
        <table className="retro-table w-full">
          <tbody>
            <tr>
              <td>HP:</td>
              <td><strong>{character.stats.hp}</strong></td>
              <td>Attack:</td>
              <td><strong>{character.stats.attack}</strong></td>
            </tr>
            <tr>
              <td>Defense:</td>
              <td><strong>{character.stats.defense}</strong></td>
              <td>Speed:</td>
              <td><strong>{character.stats.speed}</strong></td>
            </tr>
            <tr>
              <td>Ki:</td>
              <td><strong>{character.stats.ki}</strong></td>
              <td>Crit Rate:</td>
              <td><strong>{character.stats.critRate}%</strong></td>
            </tr>
          </tbody>
        </table>
      </RetroGroupBox>

      {/* Skills */}
      <RetroGroupBox title="Skills" className="mt-4">
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {character.skills.map((skillId) => (
            <li key={skillId} style={{ textTransform: 'capitalize' }}>
              {skillId.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      </RetroGroupBox>
    </div>
  );
}
