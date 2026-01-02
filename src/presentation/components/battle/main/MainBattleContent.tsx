/**
 * MainBattleContent
 * Modern, premium battle UI with glassmorphism and animations
 * Features card-based combat, HP/Ki bars, and battle controls
 */

'use client';

import { CardMaster } from '@/src/data/master/cards';
import { MainButton } from '@/src/presentation/components/layouts/main/MainComponents/MainButton';
import { MainModal } from '@/src/presentation/components/layouts/main/MainComponents/MainModal';
import { BattleViewModel, PlayerViewModel } from '@/src/presentation/presenters/battle/BattlePresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useState } from 'react';

interface MainBattleContentProps {
  viewModel: BattleViewModel;
  selectCard: (cardId: string) => void;
  deselectCard: (cardId: string) => void;
  playSelectedCards: () => void;
  useVanish: () => void;
  useRisingRush: () => void;
  switchCharacter: (characterId: string) => void;
  transform: () => void;
  startBattle: () => void;
  pauseBattle: () => void;
  resumeBattle: () => void;
  endBattle: () => void;
  battleModes: { id: string; name: string; description: string; icon: string }[];
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  timer: number;
}

export default function MainBattleContent({
  viewModel,
  selectCard,
  deselectCard,
  playSelectedCards,
  useVanish,
  useRisingRush,
  switchCharacter,
  transform,
  startBattle,
  pauseBattle,
  resumeBattle,
  endBattle,
  battleModes,
  selectedMode,
  setSelectedMode,
  timer,
}: MainBattleContentProps) {
  const [showModeSelect, setShowModeSelect] = useState(!viewModel.battle);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // Main content animation
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  // Card trail animation
  const handCards = viewModel.player?.hand || [];
  const cardTrail = useTrail(handCards.length, {
    from: { opacity: 0, transform: 'translateY(50px) rotateX(-20deg)' },
    to: { opacity: 1, transform: 'translateY(0) rotateX(0deg)' },
    config: { tension: 300, friction: 25 },
  });

  // Timer animation
  const timerSpring = useSpring({
    width: `${(timer / 15) * 100}%`,
    backgroundColor: timer > 5 ? '#22c55e' : timer > 2 ? '#eab308' : '#ef4444',
    config: { duration: 1000 },
  });

  // Handle battle result
  if (viewModel.battleResult !== 'ongoing' && !showResultModal) {
    setTimeout(() => setShowResultModal(true), 500);
  }

  // Mode Selection Screen
  if (showModeSelect) {
    return (
      <animated.div style={fadeIn} className="main-content">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '32px',
          gap: '24px',
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
          }}>
            ⚔️ Battle Arena
          </h1>
          
          <p style={{ color: 'var(--main-text-secondary)', fontSize: '1.1rem', textAlign: 'center' }}>
            Choose your battle mode
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '800px',
          }}>
            {battleModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedMode(mode.id);
                  setShowModeSelect(false);
                  startBattle();
                }}
                className="main-card main-glass"
                style={{
                  padding: '24px',
                  border: selectedMode === mode.id ? '2px solid var(--main-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'var(--main-glass-bg)',
                }}
              >
                <span style={{ fontSize: '48px' }}>{mode.icon}</span>
                <h3 style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {mode.name}
                </h3>
                <p style={{ marginTop: '8px', color: 'var(--main-text-secondary)', fontSize: '0.875rem' }}>
                  {mode.description}
                </p>
              </button>
            ))}
          </div>

          <Link href="/">
            <MainButton variant="ghost">← Back to Home</MainButton>
          </Link>
        </div>
      </animated.div>
    );
  }

  return (
    <animated.div style={fadeIn} className="main-content">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: viewModel.stage 
          ? `linear-gradient(180deg, ${viewModel.stage.ambientColor}22 0%, transparent 50%)`
          : 'transparent',
      }}>
        {/* Top Bar - Turn Counter & Timer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: 'var(--main-glass-bg)',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ 
              padding: '4px 12px', 
              background: 'var(--main-primary)', 
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}>
              Turn {viewModel.currentTurn}
            </span>
            <span style={{ color: 'var(--main-text-secondary)', fontSize: '0.875rem' }}>
              {viewModel.phase.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div style={{ flex: 1, maxWidth: '300px', margin: '0 16px' }}>
            <div style={{
              height: '8px',
              background: 'var(--color-border)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <animated.div style={{
                height: '100%',
                borderRadius: '4px',
                ...timerSpring,
              }} />
            </div>
            <div style={{ 
              textAlign: 'center', 
              fontSize: '0.75rem', 
              marginTop: '4px',
              color: timer <= 5 ? '#ef4444' : 'var(--main-text-secondary)',
              fontWeight: timer <= 5 ? 'bold' : 'normal',
            }}>
              {timer}s
            </div>
          </div>

          <button
            onClick={() => setShowPauseMenu(true)}
            style={{
              padding: '8px 16px',
              background: 'var(--main-glass-bg)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--main-text)',
              fontSize: '1.25rem',
            }}
          >
            ⏸️
          </button>
        </div>

        {/* Battle Arena - Characters */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px',
          minHeight: 0,
        }}>
          {/* Opponent Section */}
          {viewModel.opponent && (
            <CharacterSection 
              player={viewModel.opponent} 
              isOpponent={true}
            />
          )}

          {/* Stage Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px',
          }}>
            {viewModel.stage && (
              <div style={{
                padding: '8px 24px',
                background: 'var(--main-glass-bg)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: `1px solid ${viewModel.stage.ambientColor}44`,
              }}>
                <span style={{ 
                  color: viewModel.stage.ambientColor,
                  fontWeight: 'bold',
                }}>
                  📍 {viewModel.stage.displayName}
                </span>
              </div>
            )}
          </div>

          {/* Player Section */}
          {viewModel.player && (
            <CharacterSection 
              player={viewModel.player} 
              isOpponent={false}
              onSwitchCharacter={switchCharacter}
              onTransform={transform}
            />
          )}
        </div>

        {/* Bottom Section - Cards & Actions */}
        <div style={{
          background: 'var(--main-glass-bg)',
          backdropFilter: 'blur(20px)',
          padding: '16px',
          borderTop: '1px solid var(--main-border)',
        }}>
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <ActionButton 
              label="Vanish"
              value={viewModel.player?.vanishGauge || 0}
              maxValue={100}
              color="#a855f7"
              onClick={useVanish}
              disabled={(viewModel.player?.vanishGauge || 0) < 20}
            />
            <ActionButton 
              label="Rising Rush"
              value={viewModel.player?.risingRushReady ? 100 : 0}
              maxValue={100}
              color="#f59e0b"
              onClick={useRisingRush}
              disabled={!viewModel.player?.risingRushReady}
              icon="⚡"
            />
          </div>

          {/* Card Hand */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            {cardTrail.map((style, index) => {
              const card = handCards[index];
              if (!card) return null;
              
              const isSelected = viewModel.selectedCards.includes(card.id);
              
              return (
                <animated.div key={card.id} style={style}>
                  <BattleCard 
                    card={card}
                    isSelected={isSelected}
                    onClick={() => isSelected ? deselectCard(card.id) : selectCard(card.id)}
                    disabled={!viewModel.canSelectCards}
                  />
                </animated.div>
              );
            })}
          </div>

          {/* Play Button */}
          {viewModel.selectedCards.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <MainButton 
                variant="primary"
                onClick={playSelectedCards}
                style={{
                  padding: '12px 48px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                }}
              >
                ⚔️ Attack! ({viewModel.selectedCards.length} cards)
              </MainButton>
            </div>
          )}
        </div>
      </div>

      {/* Pause Menu Modal */}
      <MainModal
        isOpen={showPauseMenu}
        onClose={() => setShowPauseMenu(false)}
        title="⏸️ Paused"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <MainButton variant="primary" onClick={() => { setShowPauseMenu(false); resumeBattle(); }}>
            ▶️ Resume Battle
          </MainButton>
          <MainButton variant="secondary" onClick={() => { setShowPauseMenu(false); setShowModeSelect(true); }}>
            🔄 Change Mode
          </MainButton>
          <Link href="/" style={{ width: '100%' }}>
            <MainButton variant="ghost" style={{ width: '100%' }} onClick={endBattle}>
              🏠 Quit to Home
            </MainButton>
          </Link>
        </div>
      </MainModal>

      {/* Result Modal */}
      <MainModal
        isOpen={showResultModal && viewModel.battleResult !== 'ongoing'}
        onClose={() => setShowResultModal(false)}
        title={
          viewModel.battleResult === 'victory' ? '🏆 Victory!' :
          viewModel.battleResult === 'defeat' ? '💀 Defeat' : '🤝 Draw'
        }
      >
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>
            {viewModel.battleResult === 'victory' ? '🎉' :
             viewModel.battleResult === 'defeat' ? '😢' : '🤔'}
          </div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            color: viewModel.battleResult === 'victory' ? '#22c55e' : 
                   viewModel.battleResult === 'defeat' ? '#ef4444' : '#eab308',
          }}>
            {viewModel.battleResult === 'victory' ? 'You Won!' :
             viewModel.battleResult === 'defeat' ? 'You Lost' : "It's a Draw"}
          </h2>
          <p style={{ color: 'var(--main-text-secondary)', marginTop: '8px' }}>
            Turns: {viewModel.currentTurn} | Actions: {viewModel.battleLog.length}
          </p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
            <MainButton variant="primary" onClick={() => { setShowResultModal(false); setShowModeSelect(true); }}>
              🔄 Play Again
            </MainButton>
            <Link href="/match-history">
              <MainButton variant="secondary">📊 View Stats</MainButton>
            </Link>
          </div>
        </div>
      </MainModal>
    </animated.div>
  );
}

// Character Section Component
function CharacterSection({ 
  player, 
  isOpponent,
  onSwitchCharacter,
  onTransform,
}: { 
  player: PlayerViewModel; 
  isOpponent: boolean;
  onSwitchCharacter?: (id: string) => void;
  onTransform?: () => void;
}) {
  const activeChar = player.activeCharacter;
  
  if (!activeChar) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isOpponent ? 'row' : 'row-reverse',
      alignItems: 'center',
      gap: '16px',
    }}>
      {/* Character Portrait */}
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, ${activeChar.character?.color || '#666'}44, ${activeChar.character?.color || '#666'}22)`,
        border: `2px solid ${activeChar.character?.color || '#666'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        position: 'relative',
      }}>
        {isOpponent ? '👹' : '🦸'}
        {activeChar.canTransform && !isOpponent && (
          <button
            onClick={onTransform}
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ⬆️
          </button>
        )}
      </div>

      {/* Character Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '4px',
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {activeChar.character?.displayName || 'Unknown'}
          </span>
          <span style={{ color: 'var(--main-text-secondary)', fontSize: '0.875rem' }}>
            {isOpponent ? player.name : 'You'}
          </span>
        </div>

        {/* HP Bar */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
            <span style={{ color: '#ef4444' }}>HP</span>
            <span>{activeChar.currentHp.toLocaleString()} / {activeChar.maxHp.toLocaleString()}</span>
          </div>
          <div style={{
            height: '12px',
            background: 'var(--color-border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${activeChar.hpPercentage}%`,
              background: activeChar.hpPercentage > 50 ? 'linear-gradient(90deg, #22c55e, #4ade80)' :
                          activeChar.hpPercentage > 25 ? 'linear-gradient(90deg, #eab308, #facc15)' :
                          'linear-gradient(90deg, #ef4444, #f87171)',
              transition: 'width 0.5s ease',
              borderRadius: '6px',
            }} />
          </div>
        </div>

        {/* Ki/Energy Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
            <span style={{ color: '#3b82f6' }}>KI</span>
            <span>{activeChar.currentEnergy} / {activeChar.maxEnergy}</span>
          </div>
          <div style={{
            height: '8px',
            background: 'var(--color-border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${activeChar.energyPercentage}%`,
              background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
              transition: 'width 0.3s ease',
              borderRadius: '4px',
            }} />
          </div>
        </div>

        {/* Buffs/Debuffs */}
        {(activeChar.buffs.length > 0 || activeChar.debuffs.length > 0) && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
            {activeChar.buffs.map((buff, i) => (
              <span key={`buff-${i}`} style={{
                padding: '2px 8px',
                background: '#22c55e33',
                border: '1px solid #22c55e',
                borderRadius: '4px',
                fontSize: '0.625rem',
                color: '#22c55e',
              }}>
                ⬆️ {buff.type} +{buff.value}% ({buff.turnsRemaining})
              </span>
            ))}
            {activeChar.debuffs.map((debuff, i) => (
              <span key={`debuff-${i}`} style={{
                padding: '2px 8px',
                background: '#ef444433',
                border: '1px solid #ef4444',
                borderRadius: '4px',
                fontSize: '0.625rem',
                color: '#ef4444',
              }}>
                ⬇️ {debuff.type} {debuff.value}% ({debuff.turnsRemaining})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Character Switcher (Player only) */}
      {!isOpponent && player.characters.length > 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {player.characters.filter(c => !c.isActive).map((char) => (
            <button
              key={char.characterId}
              onClick={() => onSwitchCharacter?.(char.characterId)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: `${char.character?.color || '#666'}33`,
                border: `1px solid ${char.character?.color || '#666'}`,
                cursor: 'pointer',
                fontSize: '1.25rem',
                opacity: char.currentHp > 0 ? 1 : 0.3,
              }}
              disabled={char.currentHp <= 0}
            >
              🔄
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Action Button Component
function ActionButton({
  label,
  value,
  maxValue,
  color,
  onClick,
  disabled,
  icon,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        background: disabled ? 'var(--main-glass-bg)' : `${color}22`,
        border: `2px solid ${disabled ? '#555' : color}`,
        borderRadius: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        minWidth: '100px',
      }}
    >
      <div style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold',
        color: disabled ? '#888' : color,
      }}>
        {icon || '⚡'} {Math.round((value / maxValue) * 100)}%
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--main-text-secondary)' }}>
        {label}
      </div>
    </button>
  );
}

// Battle Card Component
function BattleCard({
  card,
  isSelected,
  onClick,
  disabled,
}: {
  card: CardMaster;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const cardColors: Record<string, string> = {
    red: 'linear-gradient(135deg, #ef4444, #dc2626)',
    blue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    green: 'linear-gradient(135deg, #22c55e, #16a34a)',
    yellow: 'linear-gradient(135deg, #eab308, #ca8a04)',
    purple: 'linear-gradient(135deg, #a855f7, #9333ea)',
  };

  const typeIcons: Record<string, string> = {
    strike: '👊',
    blast: '💥',
    special: '⭐',
    ultimate: '🔥',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '80px',
        height: '110px',
        borderRadius: '12px',
        background: cardColors[card.color] || cardColors.blue,
        border: isSelected ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: isSelected ? 'translateY(-10px) scale(1.05)' : 'translateY(0)',
        boxShadow: isSelected 
          ? '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)' 
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{typeIcons[card.type]}</span>
      <span style={{ 
        fontSize: '0.625rem', 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        lineHeight: 1.2,
      }}>
        {card.displayName}
      </span>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: '0.625rem',
        color: 'rgba(255,255,255,0.9)',
      }}>
        <span>⚡{card.cost}</span>
        <span>💪{card.power}</span>
      </div>
    </button>
  );
}
