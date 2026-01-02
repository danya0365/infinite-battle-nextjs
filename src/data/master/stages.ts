/**
 * Master Data: Stages
 * Contains all battle stage definitions
 */

export interface StageMaster {
  id: string;
  name: string;
  displayName: string;
  description: string;
  background: string;
  music: string;
  ambientColor: string;
  lightingIntensity: number;
  effects: StageEffect[];
  unlockCondition?: {
    type: 'level' | 'wins' | 'character' | 'none';
    value?: number | string;
  };
}

export interface StageEffect {
  type: 'particle' | 'weather' | 'destruction' | 'aura';
  intensity: number;
  color?: string;
}

export const STAGES: StageMaster[] = [
  {
    id: 'stage-planet-namek',
    name: 'planet-namek',
    displayName: 'Planet Namek',
    description: 'The home planet of the Namekians. Green skies and endless plains.',
    background: '/images/stages/namek.jpg',
    music: '/audio/stages/namek.mp3',
    ambientColor: '#90EE90',
    lightingIntensity: 1.2,
    effects: [
      { type: 'particle', intensity: 0.3, color: '#90EE90' },
    ],
    unlockCondition: { type: 'none' },
  },
  {
    id: 'stage-hyperbolic',
    name: 'hyperbolic-time-chamber',
    displayName: 'Hyperbolic Time Chamber',
    description: 'A dimension where time flows differently. Pure white endless space.',
    background: '/images/stages/hyperbolic.jpg',
    music: '/audio/stages/hyperbolic.mp3',
    ambientColor: '#FFFFFF',
    lightingIntensity: 1.5,
    effects: [
      { type: 'particle', intensity: 0.1, color: '#FFFFFF' },
    ],
    unlockCondition: { type: 'level', value: 5 },
  },
  {
    id: 'stage-destroyed-city',
    name: 'destroyed-city',
    displayName: 'Destroyed City',
    description: 'A once-thriving city, now in ruins from battle.',
    background: '/images/stages/destroyed-city.jpg',
    music: '/audio/stages/destroyed-city.mp3',
    ambientColor: '#8B4513',
    lightingIntensity: 0.8,
    effects: [
      { type: 'destruction', intensity: 0.7 },
      { type: 'particle', intensity: 0.5, color: '#696969' },
    ],
    unlockCondition: { type: 'wins', value: 10 },
  },
  {
    id: 'stage-volcano',
    name: 'volcano',
    displayName: 'Volcanic Arena',
    description: 'A dangerous arena surrounded by molten lava.',
    background: '/images/stages/volcano.jpg',
    music: '/audio/stages/volcano.mp3',
    ambientColor: '#FF4500',
    lightingIntensity: 1.0,
    effects: [
      { type: 'particle', intensity: 0.6, color: '#FF4500' },
      { type: 'weather', intensity: 0.4, color: '#FF6347' },
    ],
    unlockCondition: { type: 'character', value: 'hero-04' },
  },
  {
    id: 'stage-ocean',
    name: 'ocean',
    displayName: 'Ocean Platform',
    description: 'A floating platform above endless water.',
    background: '/images/stages/ocean.jpg',
    music: '/audio/stages/ocean.mp3',
    ambientColor: '#00BFFF',
    lightingIntensity: 1.1,
    effects: [
      { type: 'particle', intensity: 0.4, color: '#00BFFF' },
      { type: 'weather', intensity: 0.3, color: '#87CEEB' },
    ],
    unlockCondition: { type: 'character', value: 'hero-05' },
  },
  {
    id: 'stage-tournament',
    name: 'tournament',
    displayName: 'World Tournament Arena',
    description: 'The legendary tournament arena where champions are born.',
    background: '/images/stages/tournament.jpg',
    music: '/audio/stages/tournament.mp3',
    ambientColor: '#FFD700',
    lightingIntensity: 1.3,
    effects: [
      { type: 'aura', intensity: 0.5, color: '#FFD700' },
    ],
    unlockCondition: { type: 'level', value: 10 },
  },
  {
    id: 'stage-void',
    name: 'void',
    displayName: 'The Void',
    description: 'A dimension of pure darkness. Only the strongest can survive.',
    background: '/images/stages/void.jpg',
    music: '/audio/stages/void.mp3',
    ambientColor: '#4B0082',
    lightingIntensity: 0.5,
    effects: [
      { type: 'particle', intensity: 0.7, color: '#4B0082' },
      { type: 'aura', intensity: 0.8, color: '#9400D3' },
    ],
    unlockCondition: { type: 'wins', value: 50 },
  },
  {
    id: 'stage-sky',
    name: 'sky',
    displayName: 'Sky Arena',
    description: 'High above the clouds, where wind warriors thrive.',
    background: '/images/stages/sky.jpg',
    music: '/audio/stages/sky.mp3',
    ambientColor: '#98FB98',
    lightingIntensity: 1.4,
    effects: [
      { type: 'weather', intensity: 0.6, color: '#FFFFFF' },
      { type: 'particle', intensity: 0.3, color: '#98FB98' },
    ],
    unlockCondition: { type: 'character', value: 'hero-06' },
  },
];

export const getStageById = (id: string): StageMaster | undefined => {
  return STAGES.find((stage) => stage.id === id);
};

export const getUnlockedStages = (level: number, wins: number, characters: string[]): StageMaster[] => {
  return STAGES.filter((stage) => {
    if (!stage.unlockCondition || stage.unlockCondition.type === 'none') return true;
    
    switch (stage.unlockCondition.type) {
      case 'level':
        return level >= (stage.unlockCondition.value as number);
      case 'wins':
        return wins >= (stage.unlockCondition.value as number);
      case 'character':
        return characters.includes(stage.unlockCondition.value as string);
      default:
        return true;
    }
  });
};
