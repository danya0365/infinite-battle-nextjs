/**
 * RetroBattleContent
 * Windows 98 / Internet Explorer 5 style battle UI
 * Features classic tables, 3D beveled buttons, and retro aesthetics
 */

'use client';

import { RetroButton } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroButton';
import { RetroGroupBox } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroForm';
import { RetroModal } from '@/src/presentation/components/layouts/retro/RetroComponents/RetroModal';
import { BattleViewModel, PlayerViewModel } from '@/src/presentation/presenters/battle/BattlePresenter';
import Link from 'next/link';
import { useState } from 'react';

interface RetroBattleContentProps {
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

export default function RetroBattleContent({
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
}: RetroBattleContentProps) {
  const [showModeSelect, setShowModeSelect] = useState(!viewModel.battle);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showBattleLog, setShowBattleLog] = useState(false);

  // Handle battle result
  if (viewModel.battleResult !== 'ongoing' && !showResultModal) {
    setTimeout(() => setShowResultModal(true), 500);
  }

  // Mode Selection Screen
  if (showModeSelect) {
    return (
      <div className="retro-content-inner" style={{ padding: '16px' }}>
        <RetroGroupBox label="⚔️ Battle Arena - Select Mode">
          <div style={{ padding: '16px' }}>
            <p style={{ marginBottom: '16px', textAlign: 'center' }}>
              <b>Welcome to the Battle Arena!</b><br />
              Choose your battle mode to begin.
            </p>

            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              marginBottom: '16px',
            }}>
              <thead>
                <tr style={{ background: 'var(--retro-title-bar)' }}>
                  <th style={{ padding: '8px', border: '1px solid #888', color: 'white' }}>Mode</th>
                  <th style={{ padding: '8px', border: '1px solid #888', color: 'white' }}>Description</th>
                  <th style={{ padding: '8px', border: '1px solid #888', color: 'white' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {battleModes.map((mode) => (
                  <tr 
                    key={mode.id}
                    style={{ 
                      background: selectedMode === mode.id ? '#000080' : 'transparent',
                      color: selectedMode === mode.id ? 'white' : 'inherit',
                    }}
                  >
                    <td style={{ padding: '8px', border: '1px solid #888' }}>
                      {mode.icon} {mode.name}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #888' }}>
                      {mode.description}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #888', textAlign: 'center' }}>
                      <RetroButton
                        onClick={() => {
                          setSelectedMode(mode.id);
                          setShowModeSelect(false);
                          startBattle();
                        }}
                      >
                        Start
                      </RetroButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: 'center' }}>
              <Link href="/">
                <RetroButton>&lt;&lt; Back to Home</RetroButton>
              </Link>
            </div>
          </div>
        </RetroGroupBox>
      </div>
    );
  }

  return (
    <div className="retro-content-inner" style={{ 
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '8px',
    }}>
      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
        background: 'var(--retro-title-bar)',
        color: 'white',
        fontWeight: 'bold',
      }}>
        <span>Turn: {viewModel.currentTurn}</span>
        <span>
          Phase: {viewModel.phase.replace('_', ' ').toUpperCase()}
        </span>
        <span>
          Timer: {timer}s 
          <span style={{ 
            display: 'inline-block',
            width: '50px',
            height: '10px',
            background: '#c0c0c0',
            marginLeft: '8px',
            verticalAlign: 'middle',
          }}>
            <span style={{
              display: 'block',
              height: '100%',
              width: `${(timer / 15) * 100}%`,
              background: timer > 5 ? '#00aa00' : timer > 2 ? '#aaaa00' : '#aa0000',
            }} />
          </span>
        </span>
        <RetroButton onClick={() => setShowPauseMenu(true)}>
          ⏸️ Pause
        </RetroButton>
      </div>

      {/* Battle Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: '8px',
        minHeight: 0,
      }}>
        {/* Opponent Section */}
        {viewModel.opponent && (
          <RetroGroupBox label={`👹 ${viewModel.opponent.name}`}>
            <RetroCharacterDisplay player={viewModel.opponent} isOpponent={true} />
          </RetroGroupBox>
        )}

        {/* Stage */}
        {viewModel.stage && (
          <div style={{ 
            textAlign: 'center',
            padding: '4px',
            background: 'linear-gradient(90deg, transparent, var(--retro-title-bar), transparent)',
            color: 'white',
          }}>
            📍 Stage: <b>{viewModel.stage.displayName}</b>
          </div>
        )}

        {/* Player Section */}
        {viewModel.player && (
          <RetroGroupBox label="🦸 Your Fighter">
            <RetroCharacterDisplay 
              player={viewModel.player} 
              isOpponent={false}
              onSwitchCharacter={switchCharacter}
              onTransform={transform}
            />
          </RetroGroupBox>
        )}
      </div>

      {/* Action Buttons */}
      <RetroGroupBox label="⚡ Special Actions">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px',
          padding: '8px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <RetroButton 
              onClick={useVanish}
              disabled={(viewModel.player?.vanishGauge || 0) < 20}
            >
              Vanish ({viewModel.player?.vanishGauge || 0}%)
            </RetroButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <RetroButton 
              onClick={useRisingRush}
              disabled={!viewModel.player?.risingRushReady}
            >
              ⚡ Rising Rush {viewModel.player?.risingRushReady ? '(READY!)' : ''}
            </RetroButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <RetroButton onClick={() => setShowBattleLog(true)}>
              📜 Battle Log
            </RetroButton>
          </div>
        </div>
      </RetroGroupBox>

      {/* Card Hand */}
      <RetroGroupBox label="🃏 Your Cards">
        <div style={{ padding: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#d4d0c8' }}>
                <th style={{ padding: '4px', border: '1px solid #888', width: '30px' }}>Sel</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Card</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Type</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Cost</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Power</th>
              </tr>
            </thead>
            <tbody>
              {(viewModel.player?.hand || []).map((card) => {
                const isSelected = viewModel.selectedCards.includes(card.id);
                return (
                  <tr 
                    key={card.id}
                    style={{ 
                      background: isSelected ? '#000080' : 'transparent',
                      color: isSelected ? 'white' : 'inherit',
                      cursor: viewModel.canSelectCards ? 'pointer' : 'default',
                    }}
                    onClick={() => viewModel.canSelectCards && (isSelected ? deselectCard(card.id) : selectCard(card.id))}
                  >
                    <td style={{ padding: '4px', border: '1px solid #888', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => {}}
                        disabled={!viewModel.canSelectCards}
                      />
                    </td>
                    <td style={{ padding: '4px', border: '1px solid #888' }}>
                      {getCardTypeIcon(card.type)} {card.displayName}
                    </td>
                    <td style={{ padding: '4px', border: '1px solid #888', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '2px 6px',
                        background: getCardColor(card.color),
                        color: 'white',
                        fontSize: '10px',
                      }}>
                        {card.type.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '4px', border: '1px solid #888', textAlign: 'center' }}>
                      ⚡{card.cost}
                    </td>
                    <td style={{ padding: '4px', border: '1px solid #888', textAlign: 'center' }}>
                      💪{card.power}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {viewModel.selectedCards.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <RetroButton onClick={playSelectedCards}>
                ⚔️ ATTACK! ({viewModel.selectedCards.length} cards selected)
              </RetroButton>
            </div>
          )}
        </div>
      </RetroGroupBox>

      {/* Pause Menu Modal */}
      <RetroModal
        isOpen={showPauseMenu}
        onClose={() => setShowPauseMenu(false)}
        title="⏸️ Game Paused"
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ marginBottom: '16px' }}>Game is paused.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <RetroButton onClick={() => { setShowPauseMenu(false); resumeBattle(); }}>
              ▶️ Resume Game
            </RetroButton>
            <RetroButton onClick={() => { setShowPauseMenu(false); setShowModeSelect(true); }}>
              🔄 Change Mode
            </RetroButton>
            <Link href="/">
              <RetroButton onClick={endBattle}>
                🏠 Quit to Home
              </RetroButton>
            </Link>
          </div>
        </div>
      </RetroModal>

      {/* Battle Log Modal */}
      <RetroModal
        isOpen={showBattleLog}
        onClose={() => setShowBattleLog(false)}
        title="📜 Battle Log"
      >
        <div style={{ padding: '8px', maxHeight: '300px', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#d4d0c8' }}>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Turn</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Actor</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Action</th>
                <th style={{ padding: '4px', border: '1px solid #888' }}>Damage</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.battleLog.map((entry, index) => (
                <tr key={index}>
                  <td style={{ padding: '4px', border: '1px solid #888', textAlign: 'center' }}>
                    {entry.turn}
                  </td>
                  <td style={{ padding: '4px', border: '1px solid #888' }}>
                    {entry.actor === 'player' ? '🦸 You' : '👹 Enemy'}
                  </td>
                  <td style={{ padding: '4px', border: '1px solid #888' }}>
                    {entry.action}
                  </td>
                  <td style={{ 
                    padding: '4px', 
                    border: '1px solid #888', 
                    textAlign: 'center',
                    color: entry.damage ? '#c00' : 'inherit',
                  }}>
                    {entry.damage ? `-${entry.damage}` : '-'}
                  </td>
                </tr>
              ))}
              {viewModel.battleLog.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
                    No actions yet...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '8px', textAlign: 'center' }}>
          <RetroButton onClick={() => setShowBattleLog(false)}>Close</RetroButton>
        </div>
      </RetroModal>

      {/* Result Modal */}
      <RetroModal
        isOpen={showResultModal && viewModel.battleResult !== 'ongoing'}
        onClose={() => setShowResultModal(false)}
        title={
          viewModel.battleResult === 'victory' ? '🏆 VICTORY!' :
          viewModel.battleResult === 'defeat' ? '💀 DEFEAT' : '🤝 DRAW'
        }
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {viewModel.battleResult === 'victory' ? '🎉' :
             viewModel.battleResult === 'defeat' ? '😢' : '🤔'}
          </div>
          <h2 style={{ 
            color: viewModel.battleResult === 'victory' ? '#008800' : 
                   viewModel.battleResult === 'defeat' ? '#cc0000' : '#888800',
          }}>
            {viewModel.battleResult === 'victory' ? 'You Won!' :
             viewModel.battleResult === 'defeat' ? 'You Lost!' : "It's a Draw!"}
          </h2>
          <p style={{ marginTop: '8px' }}>
            Total Turns: {viewModel.currentTurn}<br />
            Total Actions: {viewModel.battleLog.length}
          </p>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
            <RetroButton onClick={() => { setShowResultModal(false); setShowModeSelect(true); }}>
              🔄 Play Again
            </RetroButton>
            <Link href="/match-history">
              <RetroButton>📊 View Stats</RetroButton>
            </Link>
          </div>
        </div>
      </RetroModal>
    </div>
  );
}

// Character Display Component
function RetroCharacterDisplay({
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
  
  if (!activeChar) return <p>No active character</p>;

  return (
    <div style={{ padding: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '4px', width: '100px', fontWeight: 'bold' }}>Character:</td>
            <td style={{ padding: '4px' }}>
              {activeChar.character?.displayName || 'Unknown'}
              {activeChar.canTransform && !isOpponent && (
                <RetroButton 
                  onClick={onTransform}
                  style={{ marginLeft: '8px', fontSize: '10px', padding: '2px 6px' }}
                >
                  ⬆️ Transform
                </RetroButton>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px', fontWeight: 'bold', color: '#c00' }}>HP:</td>
            <td style={{ padding: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  flex: 1,
                  height: '16px',
                  background: '#c0c0c0',
                  border: '2px inset #808080',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${activeChar.hpPercentage}%`,
                    background: activeChar.hpPercentage > 50 ? '#00aa00' :
                                activeChar.hpPercentage > 25 ? '#aaaa00' : '#aa0000',
                  }} />
                </div>
                <span style={{ minWidth: '120px' }}>
                  {activeChar.currentHp.toLocaleString()} / {activeChar.maxHp.toLocaleString()}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px', fontWeight: 'bold', color: '#00c' }}>KI:</td>
            <td style={{ padding: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  flex: 1,
                  height: '12px',
                  background: '#c0c0c0',
                  border: '2px inset #808080',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${activeChar.energyPercentage}%`,
                    background: '#0000aa',
                  }} />
                </div>
                <span style={{ minWidth: '80px' }}>
                  {activeChar.currentEnergy} / {activeChar.maxEnergy}
                </span>
              </div>
            </td>
          </tr>
          {(activeChar.buffs.length > 0 || activeChar.debuffs.length > 0) && (
            <tr>
              <td style={{ padding: '4px', fontWeight: 'bold' }}>Status:</td>
              <td style={{ padding: '4px' }}>
                {activeChar.buffs.map((buff, i) => (
                  <span key={`buff-${i}`} style={{
                    display: 'inline-block',
                    padding: '2px 6px',
                    background: '#00aa00',
                    color: 'white',
                    marginRight: '4px',
                    fontSize: '10px',
                  }}>
                    ⬆️ {buff.type} +{buff.value}% ({buff.turnsRemaining}t)
                  </span>
                ))}
                {activeChar.debuffs.map((debuff, i) => (
                  <span key={`debuff-${i}`} style={{
                    display: 'inline-block',
                    padding: '2px 6px',
                    background: '#aa0000',
                    color: 'white',
                    marginRight: '4px',
                    fontSize: '10px',
                  }}>
                    ⬇️ {debuff.type} {debuff.value}% ({debuff.turnsRemaining}t)
                  </span>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Character Switcher */}
      {!isOpponent && player.characters.length > 1 && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #888' }}>
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Switch:</span>
          {player.characters.filter(c => !c.isActive).map((char) => (
            <RetroButton
              key={char.characterId}
              onClick={() => onSwitchCharacter?.(char.characterId)}
              disabled={char.currentHp <= 0}
              style={{ 
                marginRight: '4px',
                opacity: char.currentHp > 0 ? 1 : 0.5,
              }}
            >
              🔄 {char.character?.name || 'Unknown'}
            </RetroButton>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper functions
function getCardTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    strike: '👊',
    blast: '💥',
    special: '⭐',
    ultimate: '🔥',
  };
  return icons[type] || '🃏';
}

function getCardColor(color: string): string {
  const colors: Record<string, string> = {
    red: '#cc0000',
    blue: '#0000cc',
    green: '#00aa00',
    yellow: '#aa8800',
    purple: '#880088',
  };
  return colors[color] || '#888888';
}
