/**
 * Master Data: Characters
 * Contains all character definitions with stats and abilities
 */

export interface CharacterMaster {
  id: string;
  name: string;
  displayName: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  element: 'fire' | 'water' | 'earth' | 'wind' | 'light' | 'dark';
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    energy: number;
  };
  skills: string[]; // Skill IDs
  cards: string[]; // Card IDs
  portrait: string;
  fullArt: string;
  color: string;
  description: string;
  transformations?: string[]; // Character IDs for transformations
}

export const CHARACTERS: CharacterMaster[] = [
  {
    id: 'hero-01',
    name: 'kaito',
    displayName: 'Kaito - Warrior of Light',
    rarity: 'legendary',
    element: 'light',
    baseStats: {
      hp: 10000,
      attack: 2500,
      defense: 1800,
      speed: 95,
      energy: 100,
    },
    skills: ['skill-light-burst', 'skill-solar-flare'],
    cards: ['card-punch', 'card-kick', 'card-blast'],
    portrait: '/images/characters/kaito-portrait.png',
    fullArt: '/images/characters/kaito-full.png',
    color: '#FFD700',
    description: 'The legendary warrior blessed by the light. He fights to protect the innocent.',
    transformations: ['hero-01-ssj'],
  },
  {
    id: 'hero-01-ssj',
    name: 'kaito-ssj',
    displayName: 'Kaito - Super Saiyan',
    rarity: 'legendary',
    element: 'light',
    baseStats: {
      hp: 12000,
      attack: 3500,
      defense: 2200,
      speed: 110,
      energy: 120,
    },
    skills: ['skill-light-burst', 'skill-solar-flare', 'skill-final-flash'],
    cards: ['card-punch', 'card-kick', 'card-blast', 'card-energy-wave'],
    portrait: '/images/characters/kaito-ssj-portrait.png',
    fullArt: '/images/characters/kaito-ssj-full.png',
    color: '#FFFF00',
    description: 'Kaito at his full power. The golden aura burns with determination.',
  },
  {
    id: 'hero-02',
    name: 'ryuko',
    displayName: 'Ryuko - Shadow Ninja',
    rarity: 'epic',
    element: 'dark',
    baseStats: {
      hp: 7500,
      attack: 2200,
      defense: 1400,
      speed: 120,
      energy: 90,
    },
    skills: ['skill-shadow-strike', 'skill-vanish'],
    cards: ['card-slash', 'card-throw', 'card-combo'],
    portrait: '/images/characters/ryuko-portrait.png',
    fullArt: '/images/characters/ryuko-full.png',
    color: '#4B0082',
    description: 'A master of shadows who strikes from the darkness.',
  },
  {
    id: 'hero-03',
    name: 'terra',
    displayName: 'Terra - Earth Guardian',
    rarity: 'epic',
    element: 'earth',
    baseStats: {
      hp: 12000,
      attack: 1800,
      defense: 2500,
      speed: 70,
      energy: 100,
    },
    skills: ['skill-earth-wall', 'skill-quake'],
    cards: ['card-hammer', 'card-guard', 'card-counter'],
    portrait: '/images/characters/terra-portrait.png',
    fullArt: '/images/characters/terra-full.png',
    color: '#8B4513',
    description: 'The unshakable defender. No attack can break through his defense.',
  },
  {
    id: 'hero-04',
    name: 'blaze',
    displayName: 'Blaze - Flame Emperor',
    rarity: 'rare',
    element: 'fire',
    baseStats: {
      hp: 8000,
      attack: 2800,
      defense: 1200,
      speed: 100,
      energy: 85,
    },
    skills: ['skill-inferno', 'skill-fire-breath'],
    cards: ['card-fire-punch', 'card-explosion', 'card-heat-wave'],
    portrait: '/images/characters/blaze-portrait.png',
    fullArt: '/images/characters/blaze-full.png',
    color: '#FF4500',
    description: 'The master of fire who burns everything in his path.',
  },
  {
    id: 'hero-05',
    name: 'aqua',
    displayName: 'Aqua - Wave Master',
    rarity: 'rare',
    element: 'water',
    baseStats: {
      hp: 9000,
      attack: 2000,
      defense: 1600,
      speed: 90,
      energy: 95,
    },
    skills: ['skill-tidal-wave', 'skill-healing-rain'],
    cards: ['card-water-blast', 'card-flood', 'card-ice-shard'],
    portrait: '/images/characters/aqua-portrait.png',
    fullArt: '/images/characters/aqua-full.png',
    color: '#00BFFF',
    description: 'The calm before the storm. She controls the very seas.',
  },
  {
    id: 'hero-06',
    name: 'zephyr',
    displayName: 'Zephyr - Wind Dancer',
    rarity: 'common',
    element: 'wind',
    baseStats: {
      hp: 6500,
      attack: 1800,
      defense: 1200,
      speed: 130,
      energy: 80,
    },
    skills: ['skill-gale-force', 'skill-air-slash'],
    cards: ['card-swift-strike', 'card-tornado', 'card-dodge'],
    portrait: '/images/characters/zephyr-portrait.png',
    fullArt: '/images/characters/zephyr-full.png',
    color: '#98FB98',
    description: 'Swift as the wind, she dances through battle untouched.',
  },
];

export const getCharacterById = (id: string): CharacterMaster | undefined => {
  return CHARACTERS.find((char) => char.id === id);
};

export const getCharactersByElement = (element: CharacterMaster['element']): CharacterMaster[] => {
  return CHARACTERS.filter((char) => char.element === element);
};

export const getCharactersByRarity = (rarity: CharacterMaster['rarity']): CharacterMaster[] => {
  return CHARACTERS.filter((char) => char.rarity === rarity);
};
