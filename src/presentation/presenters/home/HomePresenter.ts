/**
 * HomePresenter
 * Handles business logic for the home page
 */

export interface HomeStats {
  onlinePlayers: number;
  activeBattles: number;
  totalMatches: number;
}

export interface FeaturedCharacter {
  id: string;
  name: string;
  displayName: string;
  rarity: string;
  element: string;
  portrait: string;
  color: string;
}

export interface HomeViewModel {
  stats: HomeStats;
  featuredCharacters: FeaturedCharacter[];
  announcements: {
    id: string;
    title: string;
    description: string;
    type: 'event' | 'update' | 'news';
    createdAt: string;
  }[];
  isAuthenticated: boolean;
  userLevel?: number;
  userName?: string;
}

export class HomePresenter {
  /**
   * Get view model for the home page
   */
  async getViewModel(): Promise<HomeViewModel> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock data
    return {
      stats: {
        onlinePlayers: 1234,
        activeBattles: 456,
        totalMatches: 98765,
      },
      featuredCharacters: [
        {
          id: 'hero-01',
          name: 'kaito',
          displayName: 'Kaito - Warrior of Light',
          rarity: 'legendary',
          element: 'light',
          portrait: '/images/characters/kaito-portrait.png',
          color: '#FFD700',
        },
        {
          id: 'hero-02',
          name: 'ryuko',
          displayName: 'Ryuko - Shadow Ninja',
          rarity: 'epic',
          element: 'dark',
          portrait: '/images/characters/ryuko-portrait.png',
          color: '#4B0082',
        },
        {
          id: 'hero-04',
          name: 'blaze',
          displayName: 'Blaze - Flame Emperor',
          rarity: 'rare',
          element: 'fire',
          portrait: '/images/characters/blaze-portrait.png',
          color: '#FF4500',
        },
      ],
      announcements: [
        {
          id: 'ann-001',
          title: 'New Character Released!',
          description: 'Kaito Super Saiyan is now available in the character roster!',
          type: 'event',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'ann-002',
          title: 'Season 2 Update',
          description: 'New battle stages and rankings system coming soon.',
          type: 'update',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'ann-003',
          title: 'Maintenance Notice',
          description: 'Scheduled maintenance on January 5th, 2024.',
          type: 'news',
          createdAt: new Date().toISOString(),
        },
      ],
      isAuthenticated: true,
      userLevel: 25,
      userName: 'DragonMaster',
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: 'Infinite Battle - Home',
      description: 'Welcome to Infinite Battle. Experience epic card-based combat!',
    };
  }
}
