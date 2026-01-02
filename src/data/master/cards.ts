/**
 * Master Data: Cards
 * Contains all battle cards used in combat
 */

export type CardType = 'strike' | 'blast' | 'special' | 'ultimate';
export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';

export interface CardMaster {
  id: string;
  name: string;
  displayName: string;
  type: CardType;
  color: CardColor;
  cost: number; // Energy cost
  power: number; // Damage multiplier
  speed: number; // Priority in battle
  description: string;
  icon: string;
  animation: string;
  comboInto?: string[]; // Card IDs that can combo into
  effects?: CardEffect[];
}

export interface CardEffect {
  type: 'damage' | 'ki_restore' | 'vanish_restore' | 'buff' | 'debuff';
  value: number;
  target?: 'self' | 'enemy';
}

export const CARDS: CardMaster[] = [
  // Strike Cards
  {
    id: 'card-punch',
    name: 'punch',
    displayName: 'Power Punch',
    type: 'strike',
    color: 'red',
    cost: 20,
    power: 100,
    speed: 5,
    description: 'A powerful punch that deals moderate damage.',
    icon: '/icons/cards/punch.png',
    animation: 'punch-anim',
    comboInto: ['card-kick', 'card-combo'],
    effects: [{ type: 'damage', value: 100 }],
  },
  {
    id: 'card-kick',
    name: 'kick',
    displayName: 'Rising Kick',
    type: 'strike',
    color: 'red',
    cost: 25,
    power: 120,
    speed: 4,
    description: 'An upward kick that launches the enemy.',
    icon: '/icons/cards/kick.png',
    animation: 'kick-anim',
    comboInto: ['card-punch', 'card-combo'],
    effects: [{ type: 'damage', value: 120 }],
  },
  {
    id: 'card-slash',
    name: 'slash',
    displayName: 'Shadow Slash',
    type: 'strike',
    color: 'purple',
    cost: 25,
    power: 130,
    speed: 6,
    description: 'A quick slash attack from the shadows.',
    icon: '/icons/cards/slash.png',
    animation: 'slash-anim',
    comboInto: ['card-throw'],
    effects: [{ type: 'damage', value: 130 }],
  },
  {
    id: 'card-hammer',
    name: 'hammer',
    displayName: 'Earth Hammer',
    type: 'strike',
    color: 'yellow',
    cost: 30,
    power: 150,
    speed: 3,
    description: 'A heavy hammer strike that shakes the ground.',
    icon: '/icons/cards/hammer.png',
    animation: 'hammer-anim',
    effects: [
      { type: 'damage', value: 150 },
      { type: 'debuff', value: -10, target: 'enemy' },
    ],
  },
  {
    id: 'card-fire-punch',
    name: 'fire-punch',
    displayName: 'Fire Punch',
    type: 'strike',
    color: 'red',
    cost: 25,
    power: 125,
    speed: 5,
    description: 'A blazing punch that burns the enemy.',
    icon: '/icons/cards/fire-punch.png',
    animation: 'fire-punch-anim',
    comboInto: ['card-explosion'],
    effects: [{ type: 'damage', value: 125 }],
  },
  {
    id: 'card-swift-strike',
    name: 'swift-strike',
    displayName: 'Swift Strike',
    type: 'strike',
    color: 'green',
    cost: 15,
    power: 80,
    speed: 8,
    description: 'A lightning-fast strike that hits first.',
    icon: '/icons/cards/swift-strike.png',
    animation: 'swift-strike-anim',
    comboInto: ['card-tornado'],
    effects: [
      { type: 'damage', value: 80 },
      { type: 'ki_restore', value: 10, target: 'self' },
    ],
  },
  // Blast Cards
  {
    id: 'card-blast',
    name: 'blast',
    displayName: 'Energy Blast',
    type: 'blast',
    color: 'blue',
    cost: 25,
    power: 110,
    speed: 4,
    description: 'A ranged energy attack.',
    icon: '/icons/cards/blast.png',
    animation: 'blast-anim',
    comboInto: ['card-energy-wave'],
    effects: [{ type: 'damage', value: 110 }],
  },
  {
    id: 'card-energy-wave',
    name: 'energy-wave',
    displayName: 'Energy Wave',
    type: 'blast',
    color: 'blue',
    cost: 35,
    power: 160,
    speed: 3,
    description: 'A powerful wave of energy.',
    icon: '/icons/cards/energy-wave.png',
    animation: 'energy-wave-anim',
    effects: [{ type: 'damage', value: 160 }],
  },
  {
    id: 'card-throw',
    name: 'throw',
    displayName: 'Shuriken Throw',
    type: 'blast',
    color: 'purple',
    cost: 20,
    power: 90,
    speed: 7,
    description: 'Throws multiple shurikens at the enemy.',
    icon: '/icons/cards/throw.png',
    animation: 'throw-anim',
    effects: [{ type: 'damage', value: 90 }],
  },
  {
    id: 'card-explosion',
    name: 'explosion',
    displayName: 'Fire Explosion',
    type: 'blast',
    color: 'red',
    cost: 40,
    power: 180,
    speed: 2,
    description: 'Creates a massive explosion of flames.',
    icon: '/icons/cards/explosion.png',
    animation: 'explosion-anim',
    effects: [{ type: 'damage', value: 180 }],
  },
  {
    id: 'card-heat-wave',
    name: 'heat-wave',
    displayName: 'Heat Wave',
    type: 'blast',
    color: 'red',
    cost: 30,
    power: 140,
    speed: 4,
    description: 'Releases a wave of intense heat.',
    icon: '/icons/cards/heat-wave.png',
    animation: 'heat-wave-anim',
    effects: [{ type: 'damage', value: 140 }],
  },
  {
    id: 'card-water-blast',
    name: 'water-blast',
    displayName: 'Water Blast',
    type: 'blast',
    color: 'blue',
    cost: 25,
    power: 115,
    speed: 5,
    description: 'A focused blast of water pressure.',
    icon: '/icons/cards/water-blast.png',
    animation: 'water-blast-anim',
    effects: [{ type: 'damage', value: 115 }],
  },
  {
    id: 'card-flood',
    name: 'flood',
    displayName: 'Flood',
    type: 'blast',
    color: 'blue',
    cost: 35,
    power: 150,
    speed: 3,
    description: 'Summons a flood to overwhelm the enemy.',
    icon: '/icons/cards/flood.png',
    animation: 'flood-anim',
    effects: [{ type: 'damage', value: 150 }],
  },
  {
    id: 'card-ice-shard',
    name: 'ice-shard',
    displayName: 'Ice Shard',
    type: 'blast',
    color: 'blue',
    cost: 20,
    power: 95,
    speed: 6,
    description: 'Sharp shards of ice pierce the enemy.',
    icon: '/icons/cards/ice-shard.png',
    animation: 'ice-shard-anim',
    effects: [{ type: 'damage', value: 95 }],
  },
  {
    id: 'card-tornado',
    name: 'tornado',
    displayName: 'Tornado',
    type: 'blast',
    color: 'green',
    cost: 30,
    power: 135,
    speed: 5,
    description: 'Creates a powerful tornado.',
    icon: '/icons/cards/tornado.png',
    animation: 'tornado-anim',
    effects: [{ type: 'damage', value: 135 }],
  },
  // Special Cards
  {
    id: 'card-combo',
    name: 'combo',
    displayName: 'Rush Combo',
    type: 'special',
    color: 'yellow',
    cost: 40,
    power: 200,
    speed: 3,
    description: 'A devastating combo attack.',
    icon: '/icons/cards/combo.png',
    animation: 'combo-anim',
    effects: [{ type: 'damage', value: 200 }],
  },
  {
    id: 'card-guard',
    name: 'guard',
    displayName: 'Iron Guard',
    type: 'special',
    color: 'yellow',
    cost: 15,
    power: 0,
    speed: 10,
    description: 'Take a defensive stance, reducing damage.',
    icon: '/icons/cards/guard.png',
    animation: 'guard-anim',
    effects: [{ type: 'buff', value: 50, target: 'self' }],
  },
  {
    id: 'card-counter',
    name: 'counter',
    displayName: 'Counter',
    type: 'special',
    color: 'yellow',
    cost: 25,
    power: 150,
    speed: 9,
    description: 'Counter an enemy attack with your own.',
    icon: '/icons/cards/counter.png',
    animation: 'counter-anim',
    effects: [{ type: 'damage', value: 150 }],
  },
  {
    id: 'card-dodge',
    name: 'dodge',
    displayName: 'Perfect Dodge',
    type: 'special',
    color: 'green',
    cost: 20,
    power: 0,
    speed: 10,
    description: 'Dodge any attack with perfect timing.',
    icon: '/icons/cards/dodge.png',
    animation: 'dodge-anim',
    effects: [{ type: 'vanish_restore', value: 50, target: 'self' }],
  },
];

export const getCardById = (id: string): CardMaster | undefined => {
  return CARDS.find((card) => card.id === id);
};

export const getCardsByType = (type: CardType): CardMaster[] => {
  return CARDS.filter((card) => card.type === type);
};

export const getCardsByColor = (color: CardColor): CardMaster[] => {
  return CARDS.filter((card) => card.color === color);
};
