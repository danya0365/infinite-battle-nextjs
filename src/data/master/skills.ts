/**
 * Master Data: Skills
 * Contains all skill definitions with effects and animations
 */

export type SkillType = 'attack' | 'defense' | 'support' | 'ultimate';
export type SkillTarget = 'single' | 'all' | 'self' | 'ally';

export interface SkillMaster {
  id: string;
  name: string;
  displayName: string;
  type: SkillType;
  target: SkillTarget;
  energyCost: number;
  cooldown: number; // in turns
  power: number; // damage multiplier or heal amount
  effects: SkillEffect[];
  animation: string;
  icon: string;
  color: string;
  description: string;
}

export interface SkillEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'dot' | 'shield';
  stat?: 'attack' | 'defense' | 'speed' | 'energy';
  value: number; // percentage or flat amount
  duration?: number; // in turns
}

export const SKILLS: SkillMaster[] = [
  // Light Skills
  {
    id: 'skill-light-burst',
    name: 'light-burst',
    displayName: 'Light Burst',
    type: 'attack',
    target: 'single',
    energyCost: 30,
    cooldown: 2,
    power: 250,
    effects: [
      { type: 'damage', value: 250 },
      { type: 'buff', stat: 'attack', value: 10, duration: 2 },
    ],
    animation: 'light-burst-anim',
    icon: '/icons/skills/light-burst.png',
    color: '#FFD700',
    description: 'A concentrated burst of light energy that damages the enemy.',
  },
  {
    id: 'skill-solar-flare',
    name: 'solar-flare',
    displayName: 'Solar Flare',
    type: 'support',
    target: 'all',
    energyCost: 20,
    cooldown: 3,
    power: 0,
    effects: [
      { type: 'debuff', stat: 'attack', value: -20, duration: 2 },
    ],
    animation: 'solar-flare-anim',
    icon: '/icons/skills/solar-flare.png',
    color: '#FFD700',
    description: 'Blinds all enemies, reducing their attack power.',
  },
  {
    id: 'skill-final-flash',
    name: 'final-flash',
    displayName: 'Final Flash',
    type: 'ultimate',
    target: 'single',
    energyCost: 80,
    cooldown: 5,
    power: 600,
    effects: [
      { type: 'damage', value: 600 },
    ],
    animation: 'final-flash-anim',
    icon: '/icons/skills/final-flash.png',
    color: '#FFFF00',
    description: 'The ultimate light attack. Unleashes all power in a devastating beam.',
  },
  // Dark Skills
  {
    id: 'skill-shadow-strike',
    name: 'shadow-strike',
    displayName: 'Shadow Strike',
    type: 'attack',
    target: 'single',
    energyCost: 25,
    cooldown: 2,
    power: 200,
    effects: [
      { type: 'damage', value: 200 },
      { type: 'debuff', stat: 'defense', value: -15, duration: 2 },
    ],
    animation: 'shadow-strike-anim',
    icon: '/icons/skills/shadow-strike.png',
    color: '#4B0082',
    description: 'A strike from the shadows that weakens enemy defense.',
  },
  {
    id: 'skill-vanish',
    name: 'vanish',
    displayName: 'Vanish',
    type: 'defense',
    target: 'self',
    energyCost: 35,
    cooldown: 4,
    power: 0,
    effects: [
      { type: 'buff', stat: 'speed', value: 50, duration: 2 },
      { type: 'shield', value: 30 },
    ],
    animation: 'vanish-anim',
    icon: '/icons/skills/vanish.png',
    color: '#4B0082',
    description: 'Disappear into the shadows, increasing evasion and creating a shield.',
  },
  // Earth Skills
  {
    id: 'skill-earth-wall',
    name: 'earth-wall',
    displayName: 'Earth Wall',
    type: 'defense',
    target: 'self',
    energyCost: 30,
    cooldown: 3,
    power: 0,
    effects: [
      { type: 'buff', stat: 'defense', value: 50, duration: 3 },
      { type: 'shield', value: 50 },
    ],
    animation: 'earth-wall-anim',
    icon: '/icons/skills/earth-wall.png',
    color: '#8B4513',
    description: 'Creates a massive earth barrier for protection.',
  },
  {
    id: 'skill-quake',
    name: 'quake',
    displayName: 'Earthquake',
    type: 'attack',
    target: 'all',
    energyCost: 50,
    cooldown: 4,
    power: 180,
    effects: [
      { type: 'damage', value: 180 },
      { type: 'debuff', stat: 'speed', value: -20, duration: 2 },
    ],
    animation: 'quake-anim',
    icon: '/icons/skills/quake.png',
    color: '#8B4513',
    description: 'Shakes the earth, damaging all enemies and slowing them.',
  },
  // Fire Skills
  {
    id: 'skill-inferno',
    name: 'inferno',
    displayName: 'Inferno',
    type: 'attack',
    target: 'single',
    energyCost: 40,
    cooldown: 3,
    power: 280,
    effects: [
      { type: 'damage', value: 280 },
      { type: 'dot', value: 50, duration: 3 },
    ],
    animation: 'inferno-anim',
    icon: '/icons/skills/inferno.png',
    color: '#FF4500',
    description: 'Engulfs the enemy in flames that continue to burn.',
  },
  {
    id: 'skill-fire-breath',
    name: 'fire-breath',
    displayName: 'Fire Breath',
    type: 'attack',
    target: 'all',
    energyCost: 35,
    cooldown: 3,
    power: 150,
    effects: [
      { type: 'damage', value: 150 },
    ],
    animation: 'fire-breath-anim',
    icon: '/icons/skills/fire-breath.png',
    color: '#FF4500',
    description: 'Breathes a cone of fire that damages all enemies.',
  },
  // Water Skills
  {
    id: 'skill-tidal-wave',
    name: 'tidal-wave',
    displayName: 'Tidal Wave',
    type: 'attack',
    target: 'all',
    energyCost: 45,
    cooldown: 4,
    power: 200,
    effects: [
      { type: 'damage', value: 200 },
    ],
    animation: 'tidal-wave-anim',
    icon: '/icons/skills/tidal-wave.png',
    color: '#00BFFF',
    description: 'Summons a massive wave that crashes into all enemies.',
  },
  {
    id: 'skill-healing-rain',
    name: 'healing-rain',
    displayName: 'Healing Rain',
    type: 'support',
    target: 'ally',
    energyCost: 40,
    cooldown: 4,
    power: 150,
    effects: [
      { type: 'heal', value: 150 },
    ],
    animation: 'healing-rain-anim',
    icon: '/icons/skills/healing-rain.png',
    color: '#00BFFF',
    description: 'A gentle rain that heals all allies over time.',
  },
  // Wind Skills
  {
    id: 'skill-gale-force',
    name: 'gale-force',
    displayName: 'Gale Force',
    type: 'attack',
    target: 'single',
    energyCost: 20,
    cooldown: 1,
    power: 120,
    effects: [
      { type: 'damage', value: 120 },
      { type: 'buff', stat: 'speed', value: 15, duration: 2 },
    ],
    animation: 'gale-force-anim',
    icon: '/icons/skills/gale-force.png',
    color: '#98FB98',
    description: 'A quick wind attack that increases own speed.',
  },
  {
    id: 'skill-air-slash',
    name: 'air-slash',
    displayName: 'Air Slash',
    type: 'attack',
    target: 'single',
    energyCost: 30,
    cooldown: 2,
    power: 180,
    effects: [
      { type: 'damage', value: 180 },
    ],
    animation: 'air-slash-anim',
    icon: '/icons/skills/air-slash.png',
    color: '#98FB98',
    description: 'A sharp blade of compressed air.',
  },
];

export const getSkillById = (id: string): SkillMaster | undefined => {
  return SKILLS.find((skill) => skill.id === id);
};

export const getSkillsByType = (type: SkillType): SkillMaster[] => {
  return SKILLS.filter((skill) => skill.type === type);
};
